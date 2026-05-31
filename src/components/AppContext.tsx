import React, { createContext, useContext, useState, useEffect } from 'react';
import { Listing, Booking, Message, UserProfile } from '../types';
import { initialListings, initialMessages, initialUserProfile } from '../data';

interface AppContextType {
  listings: Listing[];
  favorites: string[];
  bookings: Booking[];
  messages: Message[];
  userProfile: UserProfile;
  selectedListing: Listing | null;
  setSelectedListing: (listing: Listing | null) => void;
  toggleFavorite: (id: string) => void;
  addBooking: (listingId: string, startDate: string, endDate: string, guestsCount: number) => void;
  cancelBooking: (bookingId: string) => void;
  sendMessageToHost: (messageId: string, text: string) => void;
  updateUserProfile: (profile: UserProfile) => void;
  addReviewToListing: (listingId: string, userName: string, rating: number, comment: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedWilaya: string;
  setSelectedWilaya: (wilaya: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('lacasa_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('lacasa_bookings');
    if (saved) return JSON.parse(saved);
    // Initial completed or upcoming mock booking
    return [
      {
        id: 'b_mock',
        listingId: 'chalet_1',
        startDate: '2026-06-15',
        endDate: '2026-06-20',
        totalPrice: 67500,
        guestsCount: 2,
        status: 'upcoming',
        listingTitle: {
          ar: 'شاليه جبل البلوط السويسري الخشبي في أعالي الحديقة الوطنية تيكجدا',
          fr: 'Chalet Suisse en Bois de Chêne dans les Hauteurs de Tikjda',
          en: 'A-Frame Oakwood Forest Chalet in High Tikjda National Park',
          kab: 'ⵛⵛⴰⵍⵉⵀⴰⵜ ⵏ ⵜⵉⴽⵊⴷⴰ ⵙ ⵓⵙⵖⴰⵔ ⴷⴻⴳ ⵓⴷⵔⴰⵔ'
        },
        listingImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'b_mock_past',
        listingId: 'recently_2',
        startDate: '2026-04-10',
        endDate: '2026-04-12',
        totalPrice: 19000,
        guestsCount: 4,
        status: 'completed',
        listingTitle: {
          ar: 'منزل أثري تم ترميمه بعناية في قلب قصبة الجزائر العتيقة',
          fr: 'Maison Traditionnelle Rénovée au Coeur de la Casbah d’Alger',
          en: 'Restored Heritage Riad in the Heart of Algiers Casbah',
          kab: 'ⴰⵅⴰⵎ ⴰⵇⴱⵓر ⵉⵜⵜⵓⵙⴻⴳⵎⴻⵏ ⴷⴻⴳ ⵓⵍ ⵏ ⵜⵇⴰⵚⴱⴰⵜ'
        },
        listingImage: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
      }
    ];
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('lacasa_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('lacasa_profile');
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('lacasa_listings');
    return saved ? JSON.parse(saved) : initialListings;
  });

  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('All');

  useEffect(() => {
    localStorage.setItem('lacasa_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('lacasa_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('lacasa_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('lacasa_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('lacasa_listings', JSON.stringify(listings));
  }, [listings]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const addBooking = (listingId: string, startDate: string, endDate: string, guestsCount: number) => {
    const listing = listings.find((l) => l.id === listingId);
    if (!listing) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const totalPrice = days * listing.pricePerNight;

    const newBooking: Booking = {
      id: `b_${Date.now()}`,
      listingId,
      startDate,
      endDate,
      totalPrice,
      guestsCount,
      status: 'upcoming',
      listingTitle: listing.title,
      listingImage: listing.images[0],
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Automatically trigger a message conversation with the host
    const conversationId = `c_${Date.now()}`;
    const newConvoMessage: Message = {
      id: `m_${Date.now()}`,
      senderName: `${listing.hostName} - للـ ${listing.title.ar}`,
      senderAvatar: listing.hostImage,
      lastMessage: `مرحباً بك! تم تأكيد حجزك لدينا من تاريخ ${startDate} إلى ${endDate}. يسعدنا استقبالكم في الجزائر!`,
      time: 'الآن',
      unread: true,
      conversation: [
        {
          id: `${conversationId}_init`,
          sender: 'host',
          text: `مرحباً بك أخي الكريم! تم تأكيد حجزك بنجاح في عقارنا (${listing.title.ar}) لعدد ضيوف ${guestsCount} من ${startDate} إلى ${endDate}. كيف يمكنني مساعدتك بخصوص النقل أو تيسير الوصول؟`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]
    };

    setMessages((prev) => [newConvoMessage, ...prev]);
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b))
    );
  };

  const sendMessageToHost = (messageId: string, text: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === messageId) {
          const userMsg = {
            id: `msg_${Date.now()}`,
            sender: 'user' as const,
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };

          const hostResponses = [
            'سأكون سعيداً بمساعدتك في ذلك. هل تفضل الوصول باكراً؟',
            'الحمد لله، كل شيء يسير على ما يرام. سأتواصل معك عبر الهاتف قريباً.',
            'أهلاً بك أخي وسهلاً، شرفتنا بقدومك، بيتنا بيتك!',
            'تأكيد تام، الشالية دافئ والمسبح معقم والإنترنت فايبر ممتاز في انتظاركم.',
            'مرحباً! نعم بكل تأكيد، الخصوصية تامة والموقع هادئ جداً وآمن.'
          ];
          const randomResponse = hostResponses[Math.floor(Math.random() * hostResponses.length)];

          const hostMsg = {
            id: `msg_${Date.now() + 1}`,
            sender: 'host' as const,
            text: randomResponse,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };

          return {
            ...m,
            lastMessage: hostMsg.text,
            time: 'الآن',
            unread: false,
            conversation: [...m.conversation, userMsg, hostMsg],
          };
        }
        return m;
      })
    );
  };

  const updateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const addReviewToListing = (listingId: string, userName: string, rating: number, comment: string) => {
    setListings((prevListings) =>
      prevListings.map((listing) => {
        if (listing.id === listingId) {
          const newReview = {
            id: `rev_${Date.now()}`,
            userName,
            userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
            rating,
            date: new Date().toISOString().split('T')[0],
            comment: {
              ar: comment,
              fr: comment,
              en: comment,
              kab: comment,
            },
          };

          const updatedReviews = [newReview, ...listing.reviews];
          const averageRating = parseFloat(
            ((listing.rating * listing.reviewsCount + rating) / (listing.reviewsCount + 1)).toFixed(2)
          );

          return {
            ...listing,
            reviews: updatedReviews,
            reviewsCount: listing.reviewsCount + 1,
            rating: averageRating,
          };
        }
        return listing;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        listings,
        favorites,
        bookings,
        messages,
        userProfile,
        selectedListing,
        setSelectedListing,
        toggleFavorite,
        addBooking,
        cancelBooking,
        sendMessageToHost,
        updateUserProfile,
        addReviewToListing,
        searchTerm,
        setSearchTerm,
        selectedWilaya,
        setSelectedWilaya,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
