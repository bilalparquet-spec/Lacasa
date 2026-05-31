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
import { Compass, Heart, Calendar, MessageSquare, User, Compass as TravelIcon, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<'explore' | 'favorites' | 'trips' | 'messages' | 'profile'>('explore');
  const [darkMode, setDarkMode] = useState(false);
  const { selectedListing, setSelectedListing } = useApp();
  const { t, language } = useLanguage();

  // Dark mode class toggle helper
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

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
    { id: 'explore', label: t('explore'), icon: <Compass className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110" /> },
    { id: 'favorites', label: t('favorites'), icon: <Heart className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110" /> },
    { id: 'trips', label: t('trips'), icon: <Calendar className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110" /> },
    { id: 'messages', label: t('messages'), icon: <MessageSquare className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110" /> },
    { id: 'profile', label: t('profile'), icon: <User className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110" /> },
  ] as const;

  return (
    <div className={`min-h-screen bg-gold-50/20 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between transition-colors duration-300 pb-20 md:pb-24`}>
      
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gold-200/25 dark:border-zinc-850 px-4 md:px-8 py-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('explore')}>
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-750 bg-clip-text text-transparent transform hover:scale-[1.03] transition-transform">
              Lacasa
            </span>
            <span className="text-[10px] bg-gold-50 text-gold-600 dark:bg-gold-950/40 dark:text-gold-300 font-extrabold py-1 px-3.5 rounded-full border border-gold-200/40">
              {t('anywhere')}
            </span>
          </div>

          {/* Quick Controls in Navbar */}
          <div className="flex items-center gap-3">
            {/* Quick Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full hover:bg-gold-50 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-all cursor-pointer border border-gold-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm active:scale-90"
              title="تغيير المظهر"
              id="theme-toggle-btn"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5 text-gold-400" /> : <Moon className="w-4.5 h-4.5 text-zinc-700" />}
            </button>

            {/* Quick Profile Icon indicator */}
            <div 
              onClick={() => setActiveTab('profile')}
              className="hidden sm:flex items-center gap-2 bg-white/80 hover:bg-gold-50/55 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 p-1.5 pr-4 rounded-full cursor-pointer transition-all border border-gold-200/25 "
              id="quick-navbar-profile"
            >
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-350">حسابي</span>
              <div className="w-7 h-7 bg-gold-500 text-white flex items-center justify-center rounded-full text-xs font-bold shadow-md">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CORE WRAPPER SCENE */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-2">
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
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-lg border-t border-gold-200/20 dark:border-zinc-800 shadow-xl px-4 py-3 transition-all">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex flex-col items-center gap-1.5 py-1 px-3 rounded-2xl transition-all relative cursor-pointer active:scale-95 ${
                  isActive 
                  ? 'text-gold-600 dark:text-gold-400 font-black' 
                  : 'text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-350'
                }`}
                id={`btn-nav-tab-${item.id}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute -top-[13px] w-8 h-1 bg-gradient-to-r from-gold-400 to-gold-600 dark:from-gold-300 dark:to-gold-500 rounded-full"
                  />
                )}
                {item.icon}
                <span className="text-[10px] tracking-tight font-bold">{item.label}</span>
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
