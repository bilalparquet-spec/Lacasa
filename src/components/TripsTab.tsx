import React, { useState } from 'react';
import { useApp } from './AppContext';
import { useLanguage } from './LanguageContext';
import { Calendar, MapPin, Trash2, ArrowLeftRight, Sparkles, Receipt, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface TripsTabProps {
  onNavigateToExplore: () => void;
}

export const TripsTab: React.FC<TripsTabProps> = ({ onNavigateToExplore }) => {
  const { bookings, cancelBooking, setSelectedListing, listings } = useApp();
  const { t, language } = useLanguage();
  const [successCancelId, setSuccessCancelId] = useState<string | null>(null);

  const upcomingBookings = bookings.filter((b) => b.status === 'upcoming');
  const pastBookings = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  const handleCancelClick = (bookingId: string) => {
    cancelBooking(bookingId);
    setSuccessCancelId(bookingId);
    setTimeout(() => {
      setSuccessCancelId(null);
    }, 3000);
  };

  const handleViewListing = (listingId: string) => {
    const list = listings.find((l) => l.id === listingId);
    if (list) {
      setSelectedListing(list);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8" id="trips-tab-container">
      {/* Tab Header */}
      <div className="border-b border-gold-200/15 dark:border-zinc-805 pb-4">
        <h1 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-gold-100 flex items-center gap-2">
          <Calendar className="w-5.5 h-5.5 text-gold-500" />
          <span>{t('trips')}</span>
          <span className="text-xs font-bold bg-gold-50 text-gold-700 px-3 py-1 rounded-full border border-gold-200/35 dark:bg-gold-950/30 dark:text-gold-300">
            {upcomingBookings.length} {t('statusUpcoming')}
          </span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          رحلاتك السكنية والسياحية المحجوزة في الجزائر عبر تطبيق Lacasa
        </p>
      </div>

      {bookings.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 max-w-md mx-auto">
          <div className="w-20 h-20 bg-gold-50/50 dark:bg-gold-950/20 rounded-full flex items-center justify-center ring-8 ring-gold-50/20">
            <Calendar className="w-9 h-9 text-gold-400" />
          </div>
          <div className="space-y-2 px-4">
            <h3 className="text-base font-extrabold text-zinc-850 dark:text-gold-100">
              {t('noTrips')}
            </h3>
            <p className="text-xs text-zinc-400 font-medium leading-relaxed">
              حان الوقت المفضل للتخطيط لرحلتك القادمة واستكشاف شاليهات تيكجدا المغطاة بالثلوج أو فيلا زرالدة بمسبح مغلق رائع.
            </p>
          </div>
          <button
            onClick={onNavigateToExplore}
            className="gold-gradient-bg text-zinc-950 py-3.5 px-6 rounded-2xl font-black text-xs shadow-md shadow-gold-500/10 hover:shadow-gold-500/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            id="btn-trips-explore-now"
          >
            <Sparkles className="w-4 h-4 text-zinc-950" />
            <span>{t('exploreNow')}</span>
          </button>
        </div>
      ) : (
        /* Render Stays List */
        <div className="space-y-8">
          {/* Section 1: Upcoming booking trips */}
          {upcomingBookings.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-black text-zinc-900 dark:text-gold-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-gold-500 rounded-full animate-ping" />
                <span>{t('activeTrips')}</span>
              </h2>

              <div className="space-y-5">
                {upcomingBookings.map((booking) => (
                  <motion.div 
                    layout
                    key={booking.id}
                    className="bg-white dark:bg-zinc-900 rounded-3xl border border-gold-200/10 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden grid grid-cols-1 md:grid-cols-12"
                    id={`upcoming-booking-card-${booking.id}`}
                  >
                    {/* Stay Image */}
                    <div className="md:col-span-4 relative h-48 md:h-full bg-zinc-100">
                      <img 
                        src={booking.listingImage} 
                        alt={booking.listingTitle[language]}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3.5 right-3.5 bg-gold-500 text-zinc-950 font-black text-[10px] py-1 px-3 rounded-full shadow-md border border-gold-300/30 ltr:left-3.5 ltr:right-auto">
                        {t('statusUpcoming')}
                      </span>
                    </div>

                    {/* Stay Info metadata */}
                    <div className="md:col-span-8 p-5 md:p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 
                          onClick={() => handleViewListing(booking.listingId)}
                          className="font-black text-zinc-900 dark:text-gold-100 text-xs md:text-sm leading-snug hover:text-gold-600 transition-colors cursor-pointer line-clamp-2"
                        >
                          {booking.listingTitle[language]}
                        </h3>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-zinc-400 font-bold">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gold-500" />
                            <span>{booking.startDate} • {booking.endDate}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <ArrowLeftRight className="w-3.5 h-3.5 text-gold-500" />
                            <span>{booking.guestsCount} {t('guests')}</span>
                          </span>
                        </div>
                      </div>

                      {/* Payment receipt info */}
                      <div className="bg-gold-50/40 dark:bg-zinc-800/40 p-3.5 rounded-2xl flex items-center justify-between text-[11px] text-zinc-700 dark:text-zinc-350 border border-gold-200/5">
                        <div className="flex items-center gap-2">
                          <Receipt className="w-4 h-4 text-gold-500" />
                          <span className="font-bold">الميزانية الإجمالية المدفوعة:</span>
                        </div>
                        <span className="font-black text-gold-600 dark:text-gold-400">{booking.totalPrice.toLocaleString()} دج</span>
                      </div>

                      {/* Ticket controls */}
                      <div className="flex justify-between items-center pt-2">
                        <button
                          onClick={() => handleViewListing(booking.listingId)}
                          className="text-[10px] font-bold text-zinc-500 hover:text-gold-600 underline"
                        >
                          عرض تفاصيل السكن بالكامل
                        </button>

                        <button
                          onClick={() => handleCancelClick(booking.id)}
                          className="flex items-center gap-1.5 text-[10px] font-bold text-red-650 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100/30 py-2.5 px-4 rounded-xl dark:bg-red-950/20 dark:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{t('cancelBooking')}</span>
                        </button>
                      </div>

                      {successCancelId === booking.id && (
                        <p className="text-[10px] text-red-600 flex items-center gap-1.5 font-bold animate-pulse">
                          <AlertTriangle className="w-4 h-4" /> {t('bookingCancelled')}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Completed / Previous stay histories */}
          {pastBookings.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xs font-black text-zinc-500">
                {t('pastTrips')}
              </h2>

              <div className="space-y-3">
                {pastBookings.map((booking) => {
                  const isCancelled = booking.status === 'cancelled';
                  return (
                    <div 
                      key={booking.id}
                      className="bg-white/60 dark:bg-zinc-900/40 rounded-2xl p-4 flex items-center gap-4 border border-gold-200/5 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800/25 transition-all cursor-pointer"
                      onClick={() => handleViewListing(booking.listingId)}
                      id={`past-booking-card-${booking.id}`}
                    >
                      <img 
                        src={booking.listingImage} 
                        alt={booking.listingTitle[language]}
                        className="w-14 h-14 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-zinc-800 dark:text-zinc-250 truncate">
                          {booking.listingTitle[language]}
                        </h4>
                        <p className="text-[10px] text-zinc-400 font-bold mt-1">
                          {booking.startDate} • {booking.guestsCount} ضيوف
                        </p>
                      </div>

                      <div className="text-left shrink-0">
                        <span className={`inline-block text-[10px] font-black py-0.5 px-2.5 rounded-full ${
                          isCancelled 
                          ? 'bg-red-50 text-red-650 dark:bg-red-950/20 dark:text-red-400' 
                          : 'bg-gold-50 text-gold-700 dark:bg-zinc-800 dark:text-zinc-350'
                        }`}>
                          {isCancelled ? t('statusCancelled') : t('statusCompleted')}
                        </span>
                        <p className="text-[10px] font-extrabold text-zinc-500 mt-1">{booking.totalPrice.toLocaleString()} دج</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
