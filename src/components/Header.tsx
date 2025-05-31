
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Plus, Search, LogOut } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface HeaderProps {
  isAuthenticated?: boolean;
  userRole?: 'doctor' | 'student' | null;
  userName?: string;
  onLogout?: () => void;
}

const Header = ({ isAuthenticated = false, userRole = null, userName = '', onLogout }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold text-medical-blue">MedCases</h1>
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2 max-w-md">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search cases, tags, or topics..."
              className="bg-transparent border-none outline-none flex-1 text-sm"
            />
          </div>
        </div>

        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {userRole === 'doctor' && (
                <Button className="bg-medical-blue hover:bg-medical-blue-dark">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Case
                </Button>
              )}
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.jpg" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {userName}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" className="text-medical-blue">
                Sign In
              </Button>
              <Button className="bg-medical-blue hover:bg-medical-blue-dark">
                Join Community
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
