import React, { useState } from 'react';
import { useApp } from './AppContext';
import { useLanguage } from './LanguageContext';
import { Listing } from '../types';
import { 
  Search, SlidersHorizontal, Star, MapPin, Heart, 
  Waves, Home, TreePine, Award, Flame, Sparkles, Building, Trees
} from 'lucide-react';
import { motion } from 'motion/react';

// Unified gold themes & Lucide icons for high luxury visual consistency
const categoryMap: Record<string, { tKey: string; icon: React.ReactNode }> = {
  recently_listed: { tKey: 'recently_listed', icon: <Sparkles className="w-5 h-5 text-gold-500" /> },
  trending: { tKey: 'trending', icon: <Flame className="w-5 h-5 text-gold-500" /> },
  algiers_hotels: { tKey: 'algiers_hotels', icon: <Building className="w-5 h-5 text-gold-500" /> },
  summer_houses: { tKey: 'summer_houses', icon: <Home className="w-5 h-5 text-gold-500" /> },
  chalets: { tKey: 'chalets', icon: <TreePine className="w-5 h-5 text-gold-500" /> },
  pools: { tKey: 'pools', icon: <Waves className="w-5 h-5 text-gold-500" /> },
  wedding_halls: { tKey: 'wedding_halls', icon: <Award className="w-5 h-5 text-gold-500" /> },
  farms: { tKey: 'farms', icon: <Trees className="w-5 h-5 text-gold-500" /> },
};

// Available Wilayas for dropdown filtration in Algeria
const ALGERIAN_WILAYAS = [
  { id: 'All', ar: 'كل الولايات', fr: 'Toutes les Wilayas', en: 'All Provinces' },
  { id: 'Alger', ar: 'الجزائر العاصمة', fr: 'Alger', en: 'Algiers' },
  { id: 'Oran', ar: 'وهران', fr: 'Oran', en: 'Oran' },
  { id: 'Jijel', ar: 'جيجل', fr: 'Jijel', en: 'Jijel' },
  { id: 'Ghardaia', ar: 'غرداية', fr: 'Ghardaïa', en: 'Ghardaia' },
  { id: 'Tipaza', ar: 'تيبازة', fr: 'Tipaza', en: 'Tipaza' },
  { id: 'Blida', ar: 'البليدة', fr: 'Blida', en: 'Blida' },
  { id: 'Bouira', ar: 'البويرة', fr: 'Bouira', en: 'Bouira' },
];

export const ExploreTab: React.FC = () => {
  const { listings, favorites, toggleFavorite, setSelectedListing, searchTerm, setSearchTerm, selectedWilaya, setSelectedWilaya } = useApp();
  const { t, language } = useLanguage();

  const [inputSearch, setInputSearch] = useState('');
  const [guestCountFilter, setGuestCountFilter] = useState<number | 'Any'>('Any');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(50000);
  
  // High fidelity UI/UX micro-interaction: skeleton loading trigger
  const [isLoading, setIsLoading] = useState(false);

  const triggerSkeletonRefresh = (action: () => void) => {
    setIsLoading(true);
    action();
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSkeletonRefresh(() => setSearchTerm(inputSearch));
  };

  const handleWilayaChange = (wilId: string) => {
    triggerSkeletonRefresh(() => setSelectedWilaya(wilId));
  };

  const handleGuestsChange = (val: string) => {
    triggerSkeletonRefresh(() => {
      setGuestCountFilter(val === 'Any' ? 'Any' : parseInt(val));
    });
  };

  const handlePriceChange = (val: number) => {
    triggerSkeletonRefresh(() => {
      setMaxPriceFilter(val);
    });
  };

  const getFilteredListings = (categoryName: string) => {
    return listings.filter((item) => {
      // 1. Matches Category
      if (item.category !== categoryName) return false;

      // 2. Matches Wilaya Select
      if (selectedWilaya !== 'All' && item.wilaya !== selectedWilaya) return false;

      // 3. Matches search input (by title or location)
      if (searchTerm) {
        const text = searchTerm.toLowerCase();
        const titleMatch = item.title[language]?.toLowerCase().includes(text);
        const locMatch = item.location[language]?.toLowerCase().includes(text);
        const wilMatch = item.wilaya.toLowerCase().includes(text);
        if (!titleMatch && !locMatch && !wilMatch) return false;
      }

      // 4. Guest check
      if (guestCountFilter !== 'Any' && item.guests < guestCountFilter) return false;

      // 5. Price check
      if (item.pricePerNight > maxPriceFilter) return false;

      return true;
    });
  };

  // Luxury high fidelity shimmer skeletons
  const SkeletonShelfLoader = () => (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
      {[1, 2, 3].map((index) => (
        <div 
          key={index}
          className="min-w-[280px] md:min-w-[320px] max-w-[340px] bg-white dark:bg-zinc-900 rounded-3xl p-4 border border-gold-200/10 space-y-4 shadow-sm"
        >
          <div className="aspect-[4/3] rounded-2xl skeleton-shimmer w-full" />
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-3 w-1/3 rounded-lg skeleton-shimmer" />
              <div className="h-3 w-12 rounded-lg skeleton-shimmer" />
            </div>
            <div className="h-5 w-5/6 rounded-lg skeleton-shimmer" />
            <div className="h-3 w-1/2 rounded-lg skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8 pb-10" id="explore-tab-container">
      {/* Dynamic Header & Search form */}
      <div className="bg-gradient-to-b from-gold-500/10 via-gold-500/0 py-8 px-4 md:py-12 md:px-8 rounded-b-[40px] border-b border-gold-100/35 dark:border-zinc-850">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-gold-100 tracking-tight flex flex-col sm:flex-row items-center justify-center gap-2">
              <span className="gold-gradient-text uppercase font-sans tracking-widest">LACASA</span>
              <span className="text-gold-500 font-medium text-lg leading-none py-1.5 px-4 bg-white dark:bg-zinc-900 rounded-full border border-gold-400/25 shadow-sm">الجزائر</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-450 text-xs md:text-sm font-medium">
              بوابة العقارات والإقامات الأكثر موثوقية وفخامة في الجزائر
            </p>
          </div>

          {/* Majestic Search Panel - Glassmorphism */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="glass-panel rounded-3xl p-3 md:p-4 shadow-xl border border-gold-400/15 dark:border-gold-500/10 grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center backdrop-blur-md"
          >
            {/* Input province/wilaya search */}
            <div className="md:col-span-4 relative flex items-center">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gold-500 w-4.5 h-4.5 ltr:left-3.5 ltr:right-auto" />
              <input
                type="text"
                placeholder={t('searchPlace')}
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                className="w-full text-xs font-bold bg-white dark:bg-zinc-850 text-zinc-800 dark:text-gold-100 pr-10 pl-4 py-3.5 rounded-2xl border border-gold-200/20 focus:border-gold-500/50 outline-none focus:ring-1 focus:ring-gold-500/30 ltr:pl-10 ltr:pr-4 placeholder:text-zinc-400"
              />
            </div>

            {/* Quick Wilaya Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedWilaya}
                onChange={(e) => handleWilayaChange(e.target.value)}
                className="w-full text-xs font-bold bg-white dark:bg-zinc-850 text-zinc-800 dark:text-gold-100 px-4 py-3.5 rounded-2xl border border-gold-200/25 focus:border-gold-500/50 outline-none cursor-pointer"
              >
                {ALGERIAN_WILAYAS.map((wil) => {
                  let label = wil.ar;
                  if (language === 'fr') label = wil.fr;
                  if (language === 'en') label = wil.en;
                  return (
                    <option key={wil.id} value={wil.id} className="text-zinc-800 dark:text-zinc-100 font-bold">
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Guests quick picker */}
            <div className="md:col-span-3">
              <select
                value={guestCountFilter}
                onChange={(e) => handleGuestsChange(e.target.value)}
                className="w-full text-xs font-bold bg-white dark:bg-zinc-850 text-zinc-800 dark:text-gold-100 px-4 py-3.5 rounded-2xl border border-gold-200/25 focus:border-gold-500/50 outline-none cursor-pointer"
              >
                <option value="Any">{t('guests')}: {t('anywhere')}</option>
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>+{num} {t('guests')}</option>
                ))}
              </select>
            </div>

            {/* Submit button - Luxury Gold */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full gold-gradient-bg text-zinc-950 text-xs font-black py-3.5 px-4 rounded-2xl shadow-md shadow-gold-500/10 hover:shadow-gold-500/20 hover:opacity-95 transition-all text-center focus:ring-1 focus:ring-gold-500 active:scale-95"
              >
                {t('searchBtn')}
              </button>
            </div>
          </form>

          {/* Quick extra sliding price slider filter */}
          <div className="bg-white/70 dark:bg-zinc-900/40 p-3.5 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between text-xs border border-gold-200/15">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gold-500" />
              <span className="font-bold text-zinc-700 dark:text-gold-300">{t('priceRange')}:</span>
              <span className="font-bold text-gold-600 dark:text-gold-400">أقل من {maxPriceFilter.toLocaleString()} دج / {t('perNight')}</span>
            </div>
            <input 
              type="range" 
              min={5000} 
              max={100000} 
              step={2000}
              value={maxPriceFilter}
              onChange={(e) => handlePriceChange(parseInt(e.target.value))}
              className="w-full sm:w-48 accent-gold-500 h-1 bg-gold-100 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* RENDER DYNAMIC SEGMENTS - MOBILE FIRST HORIZONTAL SLIDE */}
      <div className="space-y-10 max-w-7xl mx-auto px-4 md:px-8">
        {Object.entries(categoryMap).map(([catId, { tKey, icon }]) => {
          const categoryListings = getFilteredListings(catId);

          return (
            <div key={catId} className="space-y-4" id={`explore-category-${catId}`}>
              {/* Category Segment Header */}
              <div className="flex items-center justify-between border-b border-gold-200/15 dark:border-zinc-800 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-white dark:bg-zinc-905 rounded-xl border border-gold-200/20 shadow-xs shrink-0">
                    {icon}
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-black text-zinc-900 dark:text-gold-100">
                      {t(tKey)}
                    </h2>
                    <p className="text-[10px] md:text-xs font-medium text-zinc-400">
                      {categoryListings.length} عقارات مخدمة وفاخرة
                    </p>
                  </div>
                </div>

                <span className="text-[9px] tracking-wide font-black text-gold-600 dark:text-gold-300 bg-gold-50 dark:bg-gold-950/20 py-1 px-2.5 rounded-full border border-gold-200/30">
                  سحب أفقي • Swipe
                </span>
              </div>

              {/* Loader or Content */}
              {isLoading ? (
                <SkeletonShelfLoader />
              ) : categoryListings.length === 0 ? (
                <div className="bg-white/40 dark:bg-zinc-900/20 rounded-2xl py-12 text-center text-zinc-400 border border-dashed border-gold-200/15 text-xs font-bold">
                  لا توجد عقارات مطابقة للفلاتر المعينة حالياً
                </div>
              ) : (
                <div className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x no-scrollbar scroll-smooth">
                  {categoryListings.map((listing) => {
                    const isFav = favorites.includes(listing.id);

                    return (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.25 }}
                        key={listing.id}
                        onClick={() => setSelectedListing(listing)}
                        className="group min-w-[275px] md:min-w-[320px] max-w-[335px] bg-white dark:bg-zinc-900 rounded-3xl snap-start shrink-0 overflow-hidden border border-gold-250/10 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
                        id={`listing-card-${listing.id}`}
                      >
                        {/* Image area */}
                        <div className="relative aspect-[4/3] rounded-t-3xl overflow-hidden bg-zinc-100">
                          <img 
                            src={listing.images[0]} 
                            alt={listing.title[language]}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                          
                          {/* Bookmark */}
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(listing.id);
                            }}
                            className="absolute top-3 right-3 z-10 bg-white/95 text-gold-500 hover:scale-110 active:scale-95 p-2 rounded-full shadow-md transition-all border border-gold-200/20"
                          >
                            <Heart className={`w-4 h-4 ${isFav ? 'fill-gold-500 text-gold-500' : 'text-zinc-400'}`} />
                          </button>

                          {/* Price Tag Overlay */}
                          <div className="absolute bottom-3 right-3 z-10 bg-zinc-950/90 text-gold-300 font-extrabold text-[10px] md:text-xs py-1 px-3 rounded-lg backdrop-blur-md border border-gold-450/20 flex items-center">
                            {listing.pricePerNight.toLocaleString()} دج / <span className="font-normal opacity-70 text-[9px] ltr:ml-1 rtl:mr-1">{t('perNight')}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                          <div className="space-y-1">
                            {/* Rating and Region */}
                            <div className="flex items-center justify-between text-[10px] md:text-xs font-bold">
                              <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                                {listing.location[language]}
                              </span>
                              <span className="flex items-center gap-0.5 text-gold-600 dark:text-gold-400">
                                <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                                {listing.rating}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs md:text-sm leading-snug line-clamp-2 pt-1 transition-colors group-hover:text-gold-600">
                              {listing.title[language]}
                            </h3>
                          </div>

                          {/* Detail Badges */}
                          <div className="flex items-center gap-3 pt-2.5 border-t border-gold-100/10 text-[10px] text-zinc-400 font-bold">
                            <span>{listing.guests} ضيوف</span>
                            <span className="w-1 h-1 bg-gold-200 rounded-full" />
                            <span>{listing.beds} {t('beds')}</span>
                            <span className="w-1 h-1 bg-gold-200 rounded-full" />
                            <span>{listing.bathrooms} حمام</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
