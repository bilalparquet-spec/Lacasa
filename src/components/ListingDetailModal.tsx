import React, { useState } from 'react';
import { useApp } from './AppContext';
import { useLanguage } from './LanguageContext';
import { Listing } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Star, MapPin, Heart, Share2, Compass, Calendar, 
  Users, Coffee, ChevronLeft, ChevronRight, CheckCircle2, Send 
} from 'lucide-react';

interface ListingDetailModalProps {
  listing: Listing;
  onClose: () => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({ listing, onClose }) => {
  const { toggleFavorite, favorites, addBooking, addReviewToListing } = useApp();
  const { t, language } = useLanguage();
  const isFavorite = favorites.includes(listing.id);

  // States
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('2026-06-15');
  const [checkOut, setCheckOut] = useState('2026-06-20');
  const [guestCount, setGuestCount] = useState(2);
  const [isBooked, setIsBooked] = useState(false);
  
  // Custom review inputs
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % listing.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const calculateDays = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const days = calculateDays();
  const subtotal = days * listing.pricePerNight;
  const cleaningFee = Math.round(listing.pricePerNight * 0.12);
  const serviceFee = Math.round(listing.pricePerNight * 0.08);
  const total = subtotal + cleaningFee + serviceFee;

  const handleReserve = () => {
    addBooking(listing.id, checkIn, checkOut, guestCount);
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 2200);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    addReviewToListing(listing.id, 'أنت (مستكشف Lacasa)', reviewRating, reviewText);
    setReviewText('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  const handleShareClick = () => {
    const fullPath = `${window.location.origin}/listing/${listing.id}`;
    navigator.clipboard.writeText(fullPath);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-md p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 15 }}
        className="relative bg-white dark:bg-zinc-900 rounded-[32px] max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl scrollbar-thin border border-zinc-200/40 dark:border-zinc-800"
        id={`detail-modal-${listing.id}`}
      >
        {/* Share Copied Alert Indicator Overlay */}
        <AnimatePresence>
          {copiedLink && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-rose-950 text-rose-300 py-2.5 px-6 rounded-xl text-xs font-black shadow-lg border border-rose-500/25"
            >
              تم نسخ رابط السكن الذاتي للمشاركة بنجاح!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky Header Actions */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
          <button 
            onClick={onClose}
            className="pointer-events-auto bg-white/95 hover:bg-white text-zinc-900 p-2.5 rounded-full shadow-md transition-all flex items-center justify-center border border-zinc-200/50 cursor-pointer"
            id={`btn-close-detail-${listing.id}`}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2 pointer-events-auto">
            <button 
              onClick={() => toggleFavorite(listing.id)}
              className="bg-white/95 hover:bg-white text-rose-500 p-2.5 rounded-full shadow-md transition-all flex items-center justify-center border border-zinc-200/50 cursor-pointer"
              id={`btn-fav-detail-${listing.id}`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-zinc-500'}`} />
            </button>
            <button 
              onClick={handleShareClick}
              className="bg-white/95 hover:bg-white text-zinc-700 p-2.5 rounded-full shadow-md transition-all flex items-center justify-center border border-zinc-200/50 cursor-pointer"
              id={`btn-share-detail-${listing.id}`}
            >
              <Share2 className="w-5 h-5 text-rose-500" />
            </button>
          </div>
        </div>

        {/* Hero Image Slider */}
        <div className="relative h-64 md:h-[380px] w-full bg-zinc-100 overflow-hidden">
          <img 
            src={listing.images[currentImgIndex]} 
            alt={listing.title[language]}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-black/10 pointer-events-none" />
          
          {listing.images.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md z-10 transition-all text-zinc-800 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md z-10 transition-all text-zinc-800 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {listing.images.map((_, idx) => (
              <span 
                key={idx}
                className={`block h-1 rounded-full transition-all ${idx === currentImgIndex ? 'w-4 bg-rose-500' : 'w-1 bg-white/60'}`}
              />
            ))}
          </div>
        </div>

        {/* Content Layout */}
        <div className="p-5 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 text-right">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-300 border border-rose-100/50 px-3 py-1 rounded-full">
                  {t(listing.category)}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-rose-600">
                  <Star className="w-4 h-4 fill-rose-500 text-rose-500" />
                  {listing.rating} ({listing.reviewsCount} {t('reviews')})
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-snug">
                {listing.title[language]}
              </h1>
              <div className="flex items-center gap-1.5 mt-2.5 text-zinc-400 text-xs font-bold">
                <MapPin className="w-4 h-4 text-[#ff385c] shrink-0 animate-bounce" />
                <span>{listing.location[language]} • ولاية {listing.wilaya}</span>
              </div>
            </div>

            {/* Room / Stay Stats */}
            <div className="flex items-center gap-6 py-4 border-y border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-350 text-xs font-bold">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-zinc-50 rounded-lg dark:bg-zinc-800"><Users className="w-4 h-4 text-rose-500" /></div>
                <span>{listing.guests} {t('guestsMax')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-zinc-50 rounded-lg dark:bg-zinc-800"><Compass className="w-4 h-4 text-rose-500" /></div>
                <span>{listing.beds} {t('beds')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-zinc-50 rounded-lg dark:bg-zinc-800"><Coffee className="w-4 h-4 text-rose-500" /></div>
                <span>{listing.bathrooms} {t('bathrooms')}</span>
              </div>
            </div>

            {/* Host info */}
            <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-850 p-4 rounded-2xl border border-zinc-100/60 dark:border-zinc-800">
              <img 
                src={listing.hostImage} 
                alt={listing.hostName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-rose-400"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-extrabold text-xs text-zinc-900 dark:text-zinc-100">
                  {t('hostedBy')} {listing.hostName}
                </p>
                <p className="text-[10px] text-zinc-400 font-bold mt-1">
                  ★ {listing.hostRating || 4.9} • {t('hostSince')} 2021
                </p>
              </div>
            </div>

            {/* About stay */}
            <div className="space-y-2">
              <h2 className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                {t('aboutPlace')}
              </h2>
              <p className="text-zinc-650 dark:text-zinc-350 text-xs leading-relaxed whitespace-pre-line font-medium">
                {listing.description[language]}
              </p>
            </div>

            {/* What this place offers */}
            <div className="space-y-3">
              <h2 className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                {t('whatOffers')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {listing.features[language].map((feat, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HORIZONTAL SCROLL REVIEWS - (التعليقات بالسحب الأفقي) */}
            <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                  {t('reviews')} ({listing.reviews.length})
                </h2>
                <div className="flex items-center gap-1 text-xs font-bold text-rose-600">
                  <Star className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>{listing.rating}</span>
                </div>
              </div>

              {listing.reviews.length === 0 ? (
                <div className="text-center py-6 text-zinc-400 text-xs font-bold">
                  {t('noReviewsYet')}
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin max-w-full">
                  {listing.reviews.map((review) => (
                    <div 
                      key={review.id}
                      className="min-w-[280px] md:min-w-[320px] max-w-[340px] bg-zinc-50 dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 snap-start shrink-0 space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={review.userAvatar} 
                          alt={review.userName}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-zinc-800"
                          referrerPolicy="no-referrer"
                        />
                        <div className="overflow-hidden">
                          <h4 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-xs truncate">
                            {review.userName}
                          </h4>
                          <p className="text-zinc-405 text-[9px] font-medium">
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-rose-500">
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <Star 
                            key={starIdx} 
                            className={`w-3 h-3 ${starIdx < review.rating ? 'fill-rose-500 text-rose-500' : 'text-zinc-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-zinc-650 dark:text-zinc-350 text-[11px] font-bold leading-relaxed line-clamp-3">
                        {review.comment[language] || review.comment['ar']}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add feedback / review form */}
              <form onSubmit={handleSubmitReview} className="bg-zinc-50 dark:bg-zinc-850 p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800 space-y-3">
                <h3 className="font-black text-xs text-zinc-800 dark:text-zinc-200">
                  {t('addReview')}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-450 font-bold">التقييم:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setReviewRating(val)}
                        className="text-rose-500 cursor-pointer"
                      >
                        <Star className={`w-4 h-4 ${val <= reviewRating ? 'fill-rose-500 text-rose-500' : 'text-zinc-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={t('writeComment')}
                    className="flex-1 text-xs bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-rose-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#ff385c] hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-black cursor-pointer active:scale-95 flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t('send')}</span>
                  </button>
                </div>
                {reviewSuccess && (
                  <p className="text-[10px] text-rose-600 flex items-center gap-1 font-bold animate-pulse">
                    <CheckCircle2 className="w-4 h-4" /> تم نشر تعليقك بنجاح!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-3xl p-5 shadow-lg space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="text-xl font-black text-[#ff385c]">
                  {listing.pricePerNight.toLocaleString()} دج
                </span>
                <span className="text-zinc-400 text-xs font-bold">
                  / {t('perNight')}
                </span>
              </div>

              {/* Booking forms */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden text-xs">
                <div className="grid grid-cols-2 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="p-3 hover:bg-zinc-50 dark:hover:bg-zinc-850 cursor-pointer">
                    <label className="block text-[8px] font-black text-zinc-400">الدخول</label>
                    <input 
                      type="date" 
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent font-black mt-0.5 outline-none text-zinc-800 dark:text-zinc-100 cursor-pointer text-[11px]"
                    />
                  </div>
                  <div className="p-3 border-r border-zinc-200 dark:border-r-0 dark:border-l dark:border-zinc-855 hover:bg-zinc-50 dark:hover:bg-zinc-850 cursor-pointer">
                    <label className="block text-[8px] font-black text-zinc-400">الخروج</label>
                    <input 
                      type="date" 
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent font-black mt-0.5 outline-none text-zinc-800 dark:text-zinc-100 cursor-pointer text-[11px]"
                    />
                  </div>
                </div>
                <div className="p-3 hover:bg-zinc-50 dark:hover:bg-zinc-850 cursor-pointer">
                  <label className="block text-[8px] font-black text-zinc-400">{t('guests')}</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    className="w-full bg-transparent font-black mt-1 outline-none text-zinc-800 dark:text-zinc-100 cursor-pointer text-[11px]"
                  >
                    {Array.from({ length: listing.guests }).map((_, i) => (
                      <option key={i + 1} value={i + 1} className="text-zinc-800">
                        {i + 1} {t('guests')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing calculation summary */}
              <div className="space-y-3.5 text-xs font-bold text-right">
                <div className="flex justify-between text-zinc-500 font-medium">
                  <span className="underline font-bold">{listing.pricePerNight.toLocaleString()} دج x {days} ليالي</span>
                  <span>{subtotal.toLocaleString()} دج</span>
                </div>
                <div className="flex justify-between text-zinc-500 font-medium">
                  <span className="underline">تكاليف النظافة والصيانة</span>
                  <span>{cleaningFee.toLocaleString()} دج</span>
                </div>
                <div className="flex justify-between text-zinc-500 font-medium">
                  <span className="underline">رسوم خدمة Lacasa الجزائر</span>
                  <span>{serviceFee.toLocaleString()} دج</span>
                </div>
                <div className="h-px bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex justify-between text-xs font-black text-zinc-900 dark:text-zinc-100">
                  <span>{t('totalPrice')}</span>
                  <span>{total.toLocaleString()} دج</span>
                </div>
              </div>

              {/* Reserve action */}
              <button
                type="button"
                onClick={handleReserve}
                disabled={isBooked}
                className={`w-full py-3.5 rounded-2xl font-black text-xs text-white transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isBooked 
                  ? 'bg-rose-700 shadow-md' 
                  : 'bg-[#ff385c] hover:bg-rose-600 shadow-sm active:scale-95'
                }`}
                id={`btn-reserve-action-${listing.id}`}
              >
                {isBooked ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تم الحجز بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>{t('reserve')}</span>
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-zinc-400 font-bold leading-relaxed">
                ملحوظة الكراء: لن يتم سحب أي أموال حقيقية منك الآن. الحجز تجريبي بالمنصة.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
