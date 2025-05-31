
import { useState } from 'react';
import Header from '@/components/Header';
import CaseFeed from '@/components/CaseFeed';
import CaseUploadForm from '@/components/CaseUploadForm';
import UserProfile from '@/components/UserProfile';
import AuthFlow from '@/components/AuthFlow';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

const Index = () => {
  const [currentView, setCurrentView] = useState<'feed' | 'upload' | 'profile' | 'auth'>('feed');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'doctor' | 'student' | null>(null);
  const [userName, setUserName] = useState<string>('');

  const handleViewChange = (view: 'feed' | 'upload' | 'profile' | 'auth') => {
    setCurrentView(view);
  };

  const handleDemoLogin = (role: 'doctor' | 'student') => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(role === 'doctor' ? 'Dr. Sarah Johnson' : 'Alex Chen');
    setCurrentView('feed');
    console.log(`Logged in as demo ${role}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName('');
    setCurrentView('auth');
  };

  if (!isAuthenticated && currentView !== 'auth') {
    return <AuthFlow onDemoLogin={handleDemoLogin} />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar 
          currentView={currentView}
          onViewChange={handleViewChange}
          userRole={userRole}
        />
        
        <SidebarInset>
          <Header 
            isAuthenticated={isAuthenticated}
            userRole={userRole}
            userName={userName}
            onLogout={handleLogout}
          />
          
          <main className="flex-1">
            {currentView === 'feed' && <CaseFeed />}
            {currentView === 'upload' && userRole === 'doctor' && <CaseUploadForm />}
            {currentView === 'profile' && <UserProfile userRole={userRole} userName={userName} />}
            {currentView === 'auth' && <AuthFlow onDemoLogin={handleDemoLogin} />}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
