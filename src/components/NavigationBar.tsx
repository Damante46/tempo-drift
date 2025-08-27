import { Button } from '@/components/ui/button';
import { Home, Search, Library, User, Music } from 'lucide-react';
import { useState } from 'react';

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const NavigationBar = ({ activeTab, onTabChange }: NavigationBarProps) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-20 left-0 right-0 bg-glass backdrop-blur-glass border-t border-glass z-40 md:relative md:bottom-auto md:bg-card/30 md:border-none md:p-6">
      {/* Desktop Side Navigation */}
      <div className="hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-music-gradient rounded-lg flex items-center justify-center">
            <Music className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-xl bg-music-gradient bg-clip-text text-transparent">
            StreamFlow
          </span>
        </div>
        
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => onTabChange(tab.id)}
                className={`w-full justify-start gap-3 text-left ${
                  activeTab === tab.id 
                    ? 'bg-primary/20 text-primary hover:bg-primary/30' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-around p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                  activeTab === tab.id 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};