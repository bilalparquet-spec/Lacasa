import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { AppProvider, useApp } from './components/AppContext';
import { ExploreTab } from './components/ExploreTab';
import { FavoritesTab } from './components/FavoritesTab';
import { TripsTab } from './components/TripsTab';
import { MessagesTab } from './components/MessagesTab';
import { ProfileTab } from './components/ProfileTab';
import { ListingDetailModal } from './components/ListingDetailModal';

// Icons
import { Search, Heart, Calendar, MessageSquare, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TripsCustomIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Shape - now using currentColor stroke */}
      <path 
        d="M 51 15 L 25 34 L 25 80 L 63 80 L 63 68" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="square" 
        strokeLinejoin="miter" 
      />
      
      {/* Inner Right Wall - now using currentColor stroke */}
      <path 
        d="M 51.3 39 L 63 47.7 L 63 59.5" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="square" 
        strokeLinejoin="miter" 
      />

      {/* House Shape - now using currentColor stroke */}
      <path 
        d="M 35 43 L 61 24 L 73 42 L 73 65 L 35 65 Z" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="square" 
        strokeLinejoin="miter" 
      />

      {/* Chimney - now using currentColor stroke */}
      <line 
        x1="64.5" 
        y1="23" 
        x2="64.5" 
        y2="30.5" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="square" 
      />
    </svg>
  );
};

function DashboardLayout() {
  const [activeTab, setActiveTab ] = useState<'explore' | 'favorites' | 'trips' | 'messages' | 'profile'>('explore');
  const { selectedListing, setSelectedListing } = useApp();
  const { t } = useLanguage();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'explore':
        return <ExploreTab />;
      case 'favorites':
        return <FavoritesTab onNavigateToExplore={() => setActiveTab('explore')} />;
      case 'trips':
        return <TripsTab onNavigateToExplore={() => setActiveTab('explore')} />;
      case 'messages':
        return <MessagesTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <ExploreTab />;
    }
  };

  // Nav bottom item definitions
  const navItems = [
    { id: 'explore', label: t('explore'), icon: <Search className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110" /> },
    { id: 'favorites', label: t('favorites'), icon: <Heart className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110" /> },
    { id: 'trips', label: t('trips'), icon: <TripsCustomIcon className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110" /> },
    { id: 'messages', label: t('messages'), icon: <MessageSquare className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110" /> },
    { id: 'profile', label: t('profile'), icon: <User className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between pb-20 md:pb-24">
      
      {/* CORE WRAPPER SCENE */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FLOATING DETAILED STAY OVERLAY */}
      <AnimatePresence>
        {selectedListing && (
          <ListingDetailModal 
            listing={selectedListing} 
            onClose={() => setSelectedListing(null)} 
          />
        )}
      </AnimatePresence>

      {/* BOTTOM PHONE NAVIGATION BAR (ساقية التنقل السفلية) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-200/60 shadow-[0_-2px_15px_rgba(0,0,0,0.03)] px-3 py-2 transition-all" dir="rtl">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-2xl transition-all relative cursor-pointer active:scale-95 w-20 h-14 ${
                  isActive 
                  ? 'text-[#ff385c] font-black' 
                  : 'text-zinc-400 hover:text-zinc-650'
                }`}
                id={`btn-nav-tab-${item.id}`}
              >
                <div className="h-6 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-tight font-black leading-tight text-center whitespace-pre-line h-6 flex items-center justify-center">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <DashboardLayout />
      </AppProvider>
    </LanguageProvider>
  );
}
