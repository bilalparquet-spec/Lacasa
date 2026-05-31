import React from 'react';
import { useApp } from './AppContext';
import { useLanguage } from './LanguageContext';
import { Heart, Star, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface FavoritesTabProps {
  onNavigateToExplore: () => void;
}

export const FavoritesTab: React.FC<FavoritesTabProps> = ({ onNavigateToExplore }) => {
  const { listings, favorites, toggleFavorite, setSelectedListing } = useApp();
  const { t, language } = useLanguage();

  const favoriteListings = listings.filter((item) => favorites.includes(item.id));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6" id="favorites-tab-container">
      {/* Tab Header */}
      <div className="border-b border-gold-200/20 dark:border-zinc-800 pb-4">
        <h1 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-gold-100 flex items-center gap-2">
          <Heart className="w-5.5 h-5.5 text-gold-550 fill-gold-500 animate-pulse" />
          <span>{t('favorites')}</span>
          <span className="text-xs font-bold bg-gold-50 text-gold-700 px-3 py-1 rounded-full border border-gold-200/30 dark:bg-gold-950/30 dark:text-gold-300">
            {favoriteListings.length} {favoriteListings.length === 1 ? 'عقار مميز' : 'عقارات مميزة'}
          </span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          عقارات الكراء المفضلة لديك في الجزائر للرجوع إليها وحجزها في أي وقت
        </p>
      </div>

      {favoriteListings.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 max-w-md mx-auto">
          <div className="w-20 h-20 bg-gold-50/50 dark:bg-gold-950/20 rounded-full flex items-center justify-center ring-8 ring-gold-50/20">
            <Heart className="w-9 h-9 text-gold-400" />
          </div>
          <div className="space-y-2 px-4">
            <h3 className="text-base font-extrabold text-zinc-850 dark:text-gold-100">
              {t('noFavs')}
            </h3>
            <p className="text-xs text-zinc-400 font-medium lead-relaxed">
              عند تصفح المعروضات كالشاليهات والمسابح، انقر على أيقونة القلب لحفظها هنا من أجل الترتيب لرحلتك القادمة.
            </p>
          </div>
          <button
            onClick={onNavigateToExplore}
            className="gold-gradient-bg text-zinc-950 py-3.5 px-6 rounded-2xl font-black text-xs shadow-md shadow-gold-500/10 hover:shadow-gold-500/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            id="btn-favorites-explore-now"
          >
            <Sparkles className="w-4 h-4 text-zinc-950" />
            <span>{t('exploreNow')}</span>
          </button>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteListings.map((listing) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              key={listing.id}
              onClick={() => setSelectedListing(listing)}
              className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gold-200/10 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
              id={`fav-listing-card-${listing.id}`}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                <img 
                  src={listing.images[0]} 
                  alt={listing.title[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Remove from favorites */}
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(listing.id);
                  }}
                  className="absolute top-3.5 right-3.5 bg-white/95 text-gold-500 p-2 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all border border-gold-200/20 ltr:left-3.5 ltr:right-auto"
                >
                  <Heart className="w-4.5 h-4.5 fill-gold-500 text-gold-500" />
                </button>

                {/* Price Tag */}
                <div className="absolute bottom-3.5 right-3.5 bg-zinc-950/90 text-gold-300 font-extrabold text-[10px] md:text-xs py-1 px-3 rounded-lg backdrop-blur-md border border-gold-450/20 ltr:left-3.5 ltr:right-auto">
                  {listing.pricePerNight.toLocaleString()} دج / <span className="font-normal opacity-80 text-[10px]">{t('perNight')}</span>
                </div>
              </div>

              {/* Text metadata */}
              <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] md:text-xs font-bold">
                    <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                      <MapPin className="w-3.5 h-3.5 text-gold-500" />
                      {listing.location[language]}
                    </span>
                    <span className="flex items-center gap-0.5 text-gold-600 dark:text-gold-400">
                      <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                      {listing.rating}
                    </span>
                  </div>

                  <h3 className="font-bold text-zinc-905 dark:text-zinc-100 text-xs md:text-sm leading-snug line-clamp-2 pt-1 group-hover:text-gold-600 transition-colors">
                    {listing.title[language]}
                  </h3>
                </div>

                {/* Listing beds info */}
                <div className="flex items-center gap-3 pt-2.5 border-t border-gold-100/15 text-[10px] text-zinc-400 font-bold">
                  <span>{listing.guests} ضيوف</span>
                  <span className="w-1 h-1 bg-gold-200 rounded-full" />
                  <span>{listing.beds} {t('beds')}</span>
                  <span className="w-1 h-1 bg-gold-200 rounded-full" />
                  <span>{listing.bathrooms} حمامات</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
