
import { useState } from 'react';
import Header from '@/components/Header';
import CaseFeed from '@/components/CaseFeed';
import CaseUploadForm from '@/components/CaseUploadForm';
import UserProfile from '@/components/UserProfile';
import AuthFlow from '@/components/AuthFlow';

const Index = () => {
  const [currentView, setCurrentView] = useState<'feed' | 'upload' | 'profile' | 'auth'>('feed');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Demo purposes - in real app, this would come from authentication state
  const handleViewChange = (view: 'feed' | 'upload' | 'profile' | 'auth') => {
    setCurrentView(view);
  };

  if (!isAuthenticated && currentView !== 'auth') {
    return <AuthFlow />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Demo Navigation */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="flex gap-6 py-3">
            <button
              onClick={() => handleViewChange('feed')}
              className={`text-sm font-medium ${
                currentView === 'feed' ? 'text-medical-blue border-b-2 border-medical-blue' : 'text-gray-600'
              } pb-3`}
            >
              Case Feed
            </button>
            <button
              onClick={() => handleViewChange('upload')}
              className={`text-sm font-medium ${
                currentView === 'upload' ? 'text-medical-blue border-b-2 border-medical-blue' : 'text-gray-600'
              } pb-3`}
            >
              Upload Case
            </button>
            <button
              onClick={() => handleViewChange('profile')}
              className={`text-sm font-medium ${
                currentView === 'profile' ? 'text-medical-blue border-b-2 border-medical-blue' : 'text-gray-600'
              } pb-3`}
            >
              Profile
            </button>
            <button
              onClick={() => handleViewChange('auth')}
              className={`text-sm font-medium ${
                currentView === 'auth' ? 'text-medical-blue border-b-2 border-medical-blue' : 'text-gray-600'
              } pb-3`}
            >
              Auth Flow
            </button>
          </nav>
        </div>
      </div>

      <main>
        {currentView === 'feed' && <CaseFeed />}
        {currentView === 'upload' && <CaseUploadForm />}
        {currentView === 'profile' && <UserProfile />}
        {currentView === 'auth' && <AuthFlow />}
      </main>
    </div>
  );
};

export default Index;
