
import { Home, Upload, User, LogIn } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  currentView: 'feed' | 'upload' | 'profile' | 'auth';
  onViewChange: (view: 'feed' | 'upload' | 'profile' | 'auth') => void;
  userRole?: 'doctor' | 'student' | null;
}

export function AppSidebar({ currentView, onViewChange, userRole }: AppSidebarProps) {
  const navigationItems = [
    {
      title: 'Case Feed',
      url: 'feed',
      icon: Home,
      show: true,
    },
    {
      title: 'Upload Case',
      url: 'upload',
      icon: Upload,
      show: userRole === 'doctor',
    },
    {
      title: 'Profile',
      url: 'profile',
      icon: User,
      show: true,
    },
    {
      title: 'Auth Flow',
      url: 'auth',
      icon: LogIn,
      show: true,
    },
  ];

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-medical-blue">MedCases</h2>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems
                .filter(item => item.show)
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => onViewChange(item.url as any)}
                      isActive={currentView === item.url}
                      className="w-full justify-start"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
