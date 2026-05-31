import { Listing, Message, UserProfile } from './types';

export const initialUserProfile: UserProfile = {
  name: 'أحمد بن علي',
  email: 'ahmed.benali@lacasa.dz',
  phone: '0550 12 34 56',
  joinedDate: 'ماي 2024',
  bio: 'عاشق للسفر واستكشاف جمال الجزائر من شاليهات جرجرة إلى شواطئ جيجل ورمال صحرائنا الخلابة.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  verified: true,
  wilaya: 'الجزائر العاصمة',
};

export const initialMessages: Message[] = [
  {
    id: 'm1',
    senderName: 'ياسين - مضيف شاليه تيكجدا',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    lastMessage: 'مرحباً أحمد، الشاليه جاهز لاستقبالكم في التاريخ المحدد. تفضل بالاتصال عند وصولك البهو.',
    time: '19:42',
    unread: true,
    conversation: [
      {
        id: 'msg1_1',
        sender: 'user',
        text: 'السلام عليكم أخي ياسين، هل التدفئة المركزية تعمل بشكل جيد في الشاليه؟ الجو بارد جداً هذه الأيام في تيكجدا.',
        time: '16:15',
      },
      {
        id: 'msg1_2',
        sender: 'host',
        text: 'وعليكم السلام ورحمة الله! نعم بكل تأكيد أخي أحمد، التدفئة المركزية تعمل وموقد الحطب التقليدي جاهز ومملوء بحطب البلوط الطبيعي لدفء رائع وسهرة مميزة.',
        time: '16:30',
      },
      {
        id: 'msg1_3',
        sender: 'user',
        text: 'رائع جداً! شكراً جزيلاً لك. سنصل إن شاء الله حوالي الساعة الرابعة مساءً.',
        time: '17:00',
      },
      {
        id: 'msg1_4',
        sender: 'host',
        text: 'مرحباً أحمد، الشاليه جاهز لاستقبالكم في التاريخ المحدد. تفضل بالاتصال عند وصولك البهو.',
        time: '19:42',
      },
    ],
  },
  {
    id: 'm2',
    senderName: 'فاطمة - فيلا زرالدة بمسبح خلفي',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    lastMessage: 'لقد استلمنا تأكيد حجز المسبح والفيلا ليوم الجمعة. نرجو احترام قواعد الهدوء.',
    time: 'أمس',
    unread: false,
    conversation: [
      {
        id: 'msg2_1',
        sender: 'user',
        text: 'مرحباً فاطمة، هل المسبح خاص ومحجوب تماماً عن الجيران؟',
        time: '10:00',
      },
      {
        id: 'msg2_2',
        sender: 'host',
        text: 'أهلاً بك. نعم، المسبح محمي بأسوار عالية وأشجار كثيفة توفر خصوصية تامة ومطلقة 100% للعائلات.',
        time: '10:12',
      },
      {
        id: 'msg2_3',
        sender: 'user',
        text: 'ممتاز، حجزنا الفيلا ليوم الجمعة كهدية عائلية.',
        time: '11:00',
      },
      {
        id: 'msg2_4',
        sender: 'host',
        text: 'لقد استلمنا تأكيد حجز المسبح والفيلا ليوم الجمعة. نرجو احترام قواعد الهدوء.',
        time: '11:30',
      },
    ],
  },
];

export const initialListings: Listing[] = [
  // 1. Recently Listed (المعروضة مؤخراً)
  {
    id: 'recently_1',
    category: 'recently_listed',
    title: {
      ar: 'شقة بنتهاوس فاخرة بإطلالة كاملة على خليج وهران',
      fr: 'Appartement Penthouse Luxueux Vue sur la Baie d’Oran',
      en: 'Luxury Penthouse Apartment with Oran Bay View',
      kab: 'ⴰⵅⴰⵎ ⵏ Luxury ⵎⴻⵍ-ⴷ ⵜⴰⴼⵜⵉⵙⵜ ⵏ ⵡⴻⵀⵔⴰⵏ'
    },
    description: {
      ar: 'شقة بنتهاوس عصرية مجهزة بأحدث الديكورات تقع في ناطحة سحاب حديثة في جبهة البحر بوهران. تحتوي على شرفة واسعة مطلة على البحر الأبيض المتوسط بأكمله وقلعة سانتا كروز الرائعة. مطبخ متكامل وتكييف مركزي ممتاز وتأمين على مدار الساعة.',
      fr: 'Spacieux penthouse moderne doté d’équipements haut de gamme situé sur le front de mer d’Oran. Terrasse panoramique incroyable sur la mer et le fort de Santa Cruz. Cuisine équipée, climatisation centrale et parking privé surveillé 24h/24.',
      en: 'Spacious and modern penthouse featuring upscale amenities located on the beautiful seafront of Oran. Incredible panoramic terrace overlooking the sea and the historical Santa Cruz fort. Fully equipped kitchen, central AC, and 24/7 security.',
      kab: 'ⴰⵅⴰⵎ ⴰⵎⴰⵢⵏⵓⵜ ⵖⴻⴼ ⵜⵉⴼⵜⵉⵙⵉⵏ ⵏ ⵡⴻⵀⵔⴰⵏ, ⵜⴰⴱⴻⵔⵏⴰ ⵜⴰⵎⴻⵇⵔⴰⵏⵜ, ⵍⵍⴰⵏⵜ ⵎⴰⵕⵕⴰ ⵜⵉⵖⴰⵡⵙⵉⵡⵉⵏ ⵏ ⵜⵓⴷⴻⵔⵜ.'
    },
    location: {
      ar: 'جبهة البحر، وهران',
      fr: 'Front de Mer, Oran',
      en: 'Seafront, Oran',
      kab: 'Front de Mer, ⵡⴻⵀⵔⴰⵏ'
    },
    wilaya: 'Oran',
    pricePerNight: 16500,
    rating: 4.88,
    reviewsCount: 12,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'كريم الموشي',
    hostImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    hostRating: 4.9,
    beds: 3,
    bathrooms: 2,
    guests: 6,
    features: {
      ar: ['إطلالة على البحر', 'واي فاي فائق السرعة', 'تكييف مركزي', 'شرفة بانورامية', 'موقف محمي داخل العمارة'],
      fr: ['Vue sur mer', 'Internet haut débit', 'Climatisation centrale', 'Terrasse panoramique', 'Parking sécurisé'],
      en: ['Sea view', 'High-speed Wi-Fi', 'Central air conditioning', 'Panoramic balcony', 'Secure parking gar'],
      kab: ['ⴰⵥⴻⵖ ⵖⴻⵔ ⵢⵉⵍ', 'Internet ⵉⵛⴻⵔⵔⴻⴷ', 'ⵜⴰⵚⴻⵎⵎⵓⴷⵜ ⵜⴰⵏⴻⵎⵎⴰⵙⵜ', 'ⵜⴰⴱⴻⵔⵏⴰ', 'ⴰⵎⴽⴰၼ် ⵏ ⵓⴽⴰⵔⵔⵓ']
    },
    reviews: [
      {
        id: 'r1_1',
        userName: 'سامي مراد',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '2026-05-12',
        comment: {
          ar: 'الإطلالة هنا لا تصدق! شرب القهوة في الصباح أمام بحر الباهية وهران هو أفضل تجربة عشتها في حياتي. صاحب الشقة محترم للغاية ومتعاون.',
          fr: 'Une vue exceptionnelle sur la baie d’Oran ! Le penthouse est propre, bien agencé et extrêmement confortable. Accueil chaleureux de Karim.',
          en: 'An unforgettable stay! Waking up to the panoramic view of Bahia was incredible. Karim was exceptionally welcoming and attentive.',
          kab: 'ⵜⴰⵣⴻⴳⵣⴰ ⵏ ⵢⵉⵍ ⵟⵟⴰⵇ ⵜⴻⵚⴱⴻⵃ ! ⴰⵅⴰⵎ ⵢⴻⵚⴼⴰ, ⵢⴻⵍⵀⴰ, ⴽⴰⵔⵉⵎ ⴷ ⴰⵎⴷⴰⵏ ⵢⴻⵍⵀⴰⵏ ⴰⵟⴰⵙ.'
        }
      },
      {
        id: 'r1_2',
        userName: 'مريم الجيلالي',
        userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '2026-05-24',
        comment: {
          ar: 'شقة ممتازة وراقية جداً، هدوء تام وقريبة من كل المطاعم السياحية في وهران. نوصي بها العائلات بشدة.',
          fr: 'Appartement propre et chic dans un quartier animé d’Oran. Très calme et sécurisé. Parfait pour les vacances en famille.',
          en: 'Elegant, modern apartment in a thriving part of Oran. Very quiet and incredibly secure. Highly recommended for family getaways.',
          kab: 'ⴰⵅⴰَم ⴷ ⵓⵛⴱⵉⵃ ⴷⴻⴳ ⵡⴻⵀⵔⴰⵏ. ⵢⴻⵚⴼⴰ, ⵢⴻⵍⵀⴰ ⵉ ⵜⵡⴰⵛⵓⵍⵉⵏ.'
        }
      }
    ]
  },
  {
    id: 'recently_2',
    category: 'recently_listed',
    title: {
      ar: 'منزل أثري تم ترميمه بعناية في قلب قصبة الجزائر العتيقة',
      fr: 'Maison Traditionnelle Rénovée au Coeur de la Casbah d’Alger',
      en: 'Restored Heritage Riad in the Heart of Algiers Casbah',
      kab: 'ⴰⵅⴰⵎ ⴰⵇⴱⵓⵔ ⵉⵜⵜⵓⵙⴻⴳⵎⴻⵏ ⴷⴻⴳ ⵓⵍ ⵏ ⵜⵇⴰⵚⴱⴰⵜ'
    },
    description: {
      ar: 'جرب العيش الحقيقي داخل أحد بيوت القصبة التاريخية. منزل عائلي أثري (وسط الدار) به فناء مفتوح مبني بالمرمر والرخام التقليدي ومزين ببلاط الزليج الأصيل. إطلالة علوية خلابة على البحر الأبيض المتوسط والأسطح المجاورة، على بعد خطوات من المساجد التاريخية والأسواق التقليدية.',
      fr: 'Vivez l’histoire d’Alger dans une superbe maison typique de la Casbah avec patio traditionnel en marbre et faïence zellige. Terrasse supérieure donnant sur la mer et les toits historiques d’El Bahdja, authentique et dépaysant.',
      en: 'Immerse yourself in history within a stunning traditional Casbah home, complete with an open marble patio and authentic zellige tiles. Upper terrace offers breathtaking views of the sea and old Algiers rooftops.',
      kab: 'ⴷⴷⴻⵔ ⵜⵓⴷⴻⵔⵜ ⵏ ⵣⵉⴽ ⴷⴻⴳ ⵓⵅⴰⵎ ⵏ ⵜⵇⴰⵚⴱⴰⵜ ⵙ ⵓⵙⴻⴳⵎⵉ ⵏ ⵣⴻⵍⵍⵉⵊ, ⵜⴰⴱⴻⵔⵏⴰ ⵖⴻⵔ ⵢⵉⵍ.'
    },
    location: {
      ar: 'قصبة الجزائر، العاصمة',
      fr: 'Casbah, Alger la Blanche',
      en: 'The Casbah, Algiers',
      kab: 'ⵜⴰⵇⴰⵚⴱⴰⵜ, ⵍⴻⵣⵣⴰⵢⴻⵔ'
    },
    wilaya: 'Alger',
    pricePerNight: 9500,
    rating: 4.95,
    reviewsCount: 8,
    images: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621217277153-611099ec1c76?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'عمي مصطفى',
    hostImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    beds: 4,
    bathrooms: 1,
    guests: 5,
    features: {
      ar: ['فناء داخلي مفتوح', 'تصميم معماري عثماني عتيق', 'إطلالة علوية على الميناء', 'شاي جزائري ترحبي مجاني', 'دليل جولات سياحية'],
      fr: ['Patio intérieur en Zellige', 'Architecture Ottomane', 'Vue sur le port d’Alger', 'Thé traditionnel offert', 'Guide Casbah certifié'],
      en: ['Zellige inside patio', 'Ottoman classic architecture', 'Port of Algiers view', 'Complimentary mint tea', 'Certified local guide'],
      kab: ['Patio ⵏ ⵣⴻⵍⵍⵉⵊ', 'ⵜⴰⵙⴻⴳⴷⴰ ⵜⴰⵄⵓⵜⵎⴰⵏⵜ', 'ⴰⵥⴻⵖ ⵖⴻⵔ ⵍⵎⵉⵔⴼⴰ', 'ⵍⴰⵜⴰⵢ ⵏ ⵍⴻⵣⵣⴰⵢⴻⵔ', 'ⴰガイド']
    },
    reviews: [
      {
        id: 'r2_1',
        userName: 'لينا السعيد',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '2026-04-30',
        comment: {
          ar: 'النوم في القصبة له طعم خاص وحكايات لا تنتهي. عمي مصطفى استقبلنا بالتمر واللبن والشاي الجزائري وعرفنا على تاريخ البيت التاريخي العريق.',
          fr: 'Séjour magique chez Ammi Mustapha. La maison est magnifique et authentique. Le thé à la menthe sur le toit au coucher du soleil est inoubliable.',
          en: 'A magical experience in the heart of old Algiers. Ammi Mustapha is an incredibly generous soul, welcoming us with classic treats and stories.',
          kab: 'ⵜⵓⴷⴻⵔⵜ ⴷⴻⴳ ⵜⵇⴰⵚⴱⴰⵜ ⵜⴻⵚⴱⴻⵃ . ⵄⴻⵎⵎⵉ ⵎⵓⵚⵟⴰⴼⴰ ⵢⴻⵜⵜⴰⴽ-ⴷ ⵍⴰⵜⴰⵢ ⴷ ⴷⴻⴳ ⵜⴰⴱⴻⵔⵏⴰ ⵖⴻⵔ ⵢⵉⵍ.'
        }
      }
    ]
  },

  // 2. Trending Properties (بيوت رائجة)
  {
    id: 'trending_1',
    category: 'trending',
    title: {
      ar: 'فيلا فخمة هادئة ذات طراز أندلسي مطلة على جزيرة تيبازة الأثرية',
      fr: 'Villa Andalouse Prestigieuse Vue Mer à Tipaza Ruines',
      en: 'Andalusia Villa with Ruins & Sea Views in Tipaza',
      kab: 'ⴰⵅⴰⵎ ⵏ ⵓⵛⴱⵉⵃ Andalouse ⵖⴻⵔ ⵜⵉⴼⵜⵉⵙⵉⵏ ⵏ ⵜⵉⴱⴰⵣⴰ'
    },
    description: {
      ar: 'فيلا مبنية بطريقة أنيقة مستوحاة من العمارة الأندلسية والمغاربية، تقع على جرف صخري ساحر يطل مباشرة على الآثار الرومانية وشواطئ تيبازة الزرقاء. تحتوي على حوض سباحة خاص، عريشة خشبية من الياسمين، فناء مغطى، وخميسة مائية تقليدية.',
      fr: 'Splendide villa d’architecte inspirée du style andalou mauresque, perchée sur les hauteurs de Tipaza. Jardin fleuri privé, piscine à débordement donnant sur la mer et les ruines romaines de Tipaza. Sécurité, quiétude et élégance.',
      en: 'Splendid villa inspired by Moorish Andalusian architecture, perched on the scenic heights of Tipaza. Features a private pool, lush flowery gardens, and unmatched views over historical ruins and the Mediterranean.',
      kab: 'ⵜⴰⴼⵉⵍⵍⴰⵜ Andalou ⴷⴻⴳ ⵜⵉⴱⴰⵣⴰ, ⵜⴰⴱⴻⵔⵏⴰ ⵜⴰⵎⴻⵇⵔⴰⵏⵜ, ⵍⵍⴰⵏ ⵉⵎⵙⵉⵔⵉⴳⵏ ⴷ ⵢⵉⵍ.'
    },
    location: {
      ar: 'شنوة، تيبازة',
      fr: 'Chenoua, Tipaza',
      en: 'Chenoua, Tipaza',
      kab: 'ⵛⴻⵏⵡⴰ, ⵜⵉⴱⴰⵣⴰ'
    },
    wilaya: 'Tipaza',
    pricePerNight: 24000,
    rating: 4.98,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'رياض بوساحة',
    hostImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
    beds: 5,
    bathrooms: 3,
    guests: 8,
    features: {
      ar: ['مسبح خاص مطلق الخصوصية', 'حديقة أندلسية شاسعة', 'إطلالة على جبل شنوة والأثار', 'شواية باربيكيو كاملة الأدوات', 'جلسة عربية خارجية'],
      fr: ['Piscine totalement privée', 'Vaste jardin andalou', 'Vue imprenable sur le mont Chenoua', 'Espace barbecue moderne', 'Salon traditionnel extérieur'],
      en: ['Completely private pool', 'Verdant Andalusian garden', 'Breathtaking mount Chenoua views', 'Fully equipped outdoor BBQ', 'Arabic outdoor lounge'],
      kab: ['ⵉⵎⵙⵉⵔⵉⴳⵏ', 'ⵜⵉⴼⴻⵔⵜ', 'ⴰⵥⴻⵖ ⵖⴻⵔ ⵛⴻⵏⵡⴰ', 'Barbecue', 'Salon ⵏ ⵣⵉⴽ']
    },
    reviews: [
      {
        id: 'r3_1',
        userName: 'عبد الرؤوف كشنر',
        userAvatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '2026-05-18',
        comment: {
          ar: 'من أجمل الفلل التي زرتها في حياتي. فخامة وأناقة تليق بعائلاتنا المحافظة، والموقع هادئ جداً بعيد عن ضوضاء المدن.',
          fr: 'Meilleure expérience Airbnb en Algérie. Les finitions andalouses sont d’une élégance rare et الرياض a été incroyablement arrangeant.',
          en: 'Unmatched beauty. The Andalusian details are sublime and the views are therapeutic. Riad was a fabulous, professional host.',
          kab: 'ⵜⴰⴼⵉⵍⵍⴰⵜ ⵢⴻⵍⵀⴰⵏ ⴽⵓⵍ ⵜⴰⵖⴰⵡⵙⴰ ⵜⴻⵚⴼⴰ, Riad ⴷ ⴰⵎⴷⴰⵏ ⵢⴻⵍⵀⴰⵏ.'
        }
      }
    ]
  },
  {
    id: 'trending_2',
    category: 'trending',
    title: {
      ar: 'منزل تقليدي أصيل في واحة غردية التاريخية بني يزقن',
      fr: 'Maison Traditionnelle dans l’Oasis de Beni Isguen M’zab',
      en: 'Historic Oasis Traditional House in Beni Isguen Ghardaia',
      kab: 'ⴰⵅⴰَم ⵏ ⵣⵉⴽ ⴷⴻⴳ ⵢⵉⵖⴻⵔ ⵏ ⴱⵏⵉ ⵢⴻⵣⴳⴻⵏ, ⵜⴰⵖⴻⵔⴷⴰⵢⵜ'
    },
    description: {
      ar: 'استمتع بتجربة الهدوء والسلام والصداقة للبيئة في أحد البيوت الطينية التقليدية المسقفة بجذوع النخل ببلدة بني يزقن المحصنة في وادي ميزاب بغرداية. يتميز المنزل بالبرودة الطبيعية صيفاً والدفء شتاءً، مع ساحة وسطى سماوية ومقتنيات يدوية الصنع.',
      fr: 'Dépaysant et écologique. Séjournez dans une authentique maison du M’zab en argile et bois de palmier à Beni Isguen, Ghardaïa. Fraîcheur naturelle optimale, puits de lumière intérieur et terrasse étoilée féérique le soir venu.',
      en: 'Ecological desert retreat. Live in an authentic Ghardaia valley clay-house made of palm-wood logs in the fortress of Beni Isguen. Natural thermal insulation, cozy central well of light, and stellar views of the night sky.',
      kab: 'ⴰⵅⴰَم ⵏ ⵣⵉⴽ ⴷⴻⴳ ⵜⵖⴻⵔⴷⴰⵢⵜ, ⵜⴰⴱⴻⵔⵏⴰ ⵖⴻⵔ ⵢⵉⵜⵔⴰⵏ, ⴰⵎⴽⴰၼ် ⵢⴻⵚⴼⴰⵏ.'
    },
    location: {
      ar: 'بني يزقن، غرداية',
      fr: 'Beni Isguen, Ghardaïa',
      en: 'Beni Isguen, Ghardaia',
      kab: 'ⴱⵏⵉ ⵢⴻⵣⴳⴻⵏ, ⵜⴰⵖⴻⵔⴷⴰⵢⵜ'
    },
    wilaya: 'Ghardaia',
    pricePerNight: 8000,
    rating: 4.91,
    reviewsCount: 16,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'سليمان بابا أحمد',
    hostImage: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=100&q=80',
    beds: 6,
    bathrooms: 2,
    guests: 10,
    features: {
      ar: ['بناء بيئي طبيعي', 'سطح لمشاهدة النجوم والتأمل', 'زيارة مرشد سياحي محلي للقصور الخمسة', 'تمر دجلة نور مجاني من واحتنا', 'سجاد ميزابي منسوج يدوياً'],
      fr: ['Matériaux naturels locaux d’isolation', 'Grande terrasse pour la nuit étoilée', 'Visite guidée des 5 ksours', 'Dattes Deglet Nour du jardin offertes', 'Tapis traditionnels tissés main'],
      en: ['Natural ecological build', 'Large stargazing rooftop terrace', 'Guided tour across the 5 local Ksours', 'Complimentary garden-fresh dates', 'Handcrafted local tribal rugs'],
      kab: ['ⴰⵅⴰⵎ ⵏ ⵍⵍⵉⵇ', 'ⵜⴰⴱⴻⵔⵏⴰ', 'ⵍⵉⵃⴰⵍⴰ ⵏ ⴽⵙⵓⵔ', 'ⵜⵉⵏⵉ  Deglet Nour', 'ⵜⵉⵍⵉⴼⵉⵏ ⵏ ⵣⵉⴽ']
    },
    reviews: [
      {
        id: 'r4_1',
        userName: 'خالد يوسفي',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '2026-03-20',
        comment: {
          ar: 'غرداية ساحرة وهذا البيت يعطيك شعور السلام والروحانيات والاندماج مع الطبيعة والكرم الميزابي الأصيل. بارك الله في عمي سليمان.',
          fr: 'M’zab est unique et merveilleuse. سليمان est extrêmement respectueux et connaît l’histoire de sa région par cœur. Incontournable !',
          en: 'A phenomenal escape from modern noise. Suleimane is a treasure-trove of historical stories. The dates and tea were wonderful.',
          kab: 'ⵜⴰⵖⴻⵔⴷⴰⵢⵜ  ⵜⴻⵚⴱⴻⵃ  ⴰⵟⴰⵙ, ⵙⵍⵉⵎⴰⵏ ⴷ ⴰⵎⴷⴰⵏ ⵢⴻⵍⵀⴰⵏ ⵙ ⵓⵙⵉⵔⴻⴷ.'
        }
      }
    ]
  },

  // 3. Special Hotels in Algiers Capital (فنادق مميزة في العاصمة)
  {
    id: 'hotel_1',
    category: 'algiers_hotels',
    title: {
      ar: 'أجنحة رويال حامة - فندق 5 نجوم مطل على حديقة التجارب التاريخية',
      fr: 'Suites Hotel de Prestige 5★ - Vue Jardin d’Essai d’El Hamma',
      en: 'Royal Hamma Luxury Suites 5★ - Botanical Garden View',
      kab: ' Royal Hamma 5★ - ⴰⵥⴻⵖ ⵖⴻⵔ ⵓⵔⵜⵉ ⵏ ⵍⵃⴰⵎⵎⴰ'
    },
    description: {
      ar: 'استمتع بالإقامة في قمة الفخامة الكلاسيكية في الجزائر العاصمة، أجنحة فندقية واسعة بإطلالة كاملة ومباشرة على حديقة التجارب الحامة الرائعة وخليج العاصمة. خدمات غرف متميزة على مدار الساعة، مركز رياضي متطور، ومطعم إيطالي وتقليدي فاخر بداخل الفندق.',
      fr: 'Profitez de suites magnifiques 5 étoiles offrant une vue idyllique sur le célèbre Jardin d’Essai d’El Hamma et la baie d’Alger. Service d’étage d’excellence 24h/24, espace de bien-être spa et restaurants gastronomiques.',
      en: 'Live in world-class opulence inside our majestic 5★ suites overlooking the lush, historic Botanical Garden of El Hamma and Algiers Bay. Inclusive of gourmet dining experiences and a premium wellness center.',
      kab: 'ⵉⵙⴰⵏⵙⴰⵢⵏ ⵏ Royal Hamma 5★, ⴰⵥⴻⵖ ⵖⴻⵔ ⵓⵔⵜⵉ ⵏ ⵎⴰⵕⵕⴰ ⵜⵉⴳⴻⵍⴷⵉⵡⵉⵏ, ⵍⵃⴰⵎⵎⴰ.'
    },
    location: {
      ar: 'الحامة، الجزائر العاصمة',
      fr: 'El Hamma, Alger Centre',
      en: 'El Hamma, Central Algiers',
      kab: 'ⵍⵃⴰⵎⵎⴰ, ⵍⴻⵣⵣⴰⵢⴻⵔ'
    },
    wilaya: 'Alger',
    pricePerNight: 29000,
    rating: 4.87,
    reviewsCount: 54,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4db85b?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'إدارة رويال لاكاسا العاصمة',
    hostImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80',
    beds: 2,
    bathrooms: 1,
    guests: 3,
    features: {
      ar: ['إطلالة حديقة التجارب الحامة', 'فطور الصباح بوفيه عالمي فاخر', 'مركز لياقة بدنية وسبا مدمج', 'مواقف سيارات محروسة ومحمية مجانية', 'استقبال المطار'],
      fr: ['Vue sur le mythique Jardin d’Essai', 'Petit-déjeuner buffet gastronomique', 'Spa et salle de fitness de pointe', 'Parking souterrain gardé gratuit', 'Navette aéroport VIP'],
      en: ['View of the botanical garden', 'Delectable international buffet breakfast', 'State-of-the-art spa and gym facilities', 'Free secure underground parking', 'Airport VIP shuttle'],
      kab: ['ⴰⵥⴻⵖ ⵖⴻⵔ ⵓⵔⵜⵉ', 'ⵉⵎⴻⴽⵍⵉ ⵏ ⵜⵚⴻⴱⵃⵉⵜ', 'Spa ⴷ Fitness', 'Parking ⵎⴻⴳ', 'Navettes']
    },
    reviews: [
      {
        id: 'r5_1',
        userName: 'كمال السبتي',
        userAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '2026-05-02',
        comment: {
          ar: 'من أفضل الفنادق في العاصمة بدون منازع. الغرفة مريحة جداً وهادئة، ونوافذها مطلة على خضرة حديقة الحامة الشاسعة كأنك في غابة ساحرة.',
          fr: 'Le service est impeccable, digne d’un grand palace. La vue sur le Jardin d’Essai d’El Hamma est spectaculaire.',
          en: 'Incredibly neat and highly professional customer support. Overlooking the legendary park felt like a dream.',
          kab: 'ⵉⵙⴰⵏⵙⴰⵢⵏ ⵢⴻⵍⵀⴰⵏ, ⴰⵥⴻⵖ ⵖⴻⵔ ⵓⵔⵜⵉ ⵏ ⵍⵃⴰⵎⵎⴰ, ⴽⵓⵍ ⵜⴰⵖⴰⵡⵙⴰ ⵜⴻⵚⴼⴰ.'
        }
      }
    ]
  },
  {
    id: 'hotel_2',
    category: 'algiers_hotels',
    title: {
      ar: 'شقة سكنية عائلية هادئة وفاخرة في حي حيدرة الراقي',
      fr: 'Appartement de Prestige Chic et Sécurisé à Hydra, Alger',
      en: 'Executive Chic & High-Security Apartment in Hydra, Algiers',
      kab: 'ⴰⵅⴰⵎ ⵏ ⵓⵛⴱⵉⵃ ⴷⴻⴳ ⵃⵉⴷⵔⴰ, ⵍⴻⵣⵣⴰⵢⴻⵔ'
    },
    description: {
      ar: 'شقة فخمة مؤثثة بأرقى تصاميم الأثاث الإيطالي، تقع في أرقى الشوارع السكنية والدبلوماسية بحي حيدرة بالعاصمة الجزائر. تحظى العمارة بتأمين كاميرات وحراسة ومرآب مخصص للسيارات، مزودة بإنترنت فائق السرعة وجاكوزي عائلي دافئ.',
      fr: 'Appartement résidentiel cossu avec mobilier italien raffiné situé dans le quartier diplomatique sécurisé d’Hydra, Alger. Idéal pour les professionnels, cadres et familles. Internet fibre haut débit, jacuzzi et garage sous-terrain.',
      en: 'Posh residential flat with high-end furnishings located in the highly secure, executive diplomatic avenue of Hydra, Algiers. High-speed fibre internet, cozy jacuzzi and private gated parking included.',
      kab: 'ⴰⵅⴰⵎ ⵏ Luxury ⴷⴻⴳ ⵃⵉⴷⵔⴰ, ⵍⴻⵣⵣⴰⵢⴻⵔ ⵜⴰⵎⴰⵏⴻⵖⵜ. ⴰⵎⴽⴰၼ် ⵏ ⵓⴽⴰⵔⵔⵓ ⴷ ⵢⵉⵏⵜⴻⵔⵏⴻⵜ'
    },
    location: {
      ar: 'حيدرة، الجزائر العاصمة',
      fr: 'Hydra, Alger Diplomatique',
      en: 'Hydra, Algiers Executive',
      kab: 'ⵃⵉⴷⵔⴰ, ⵍⴻⵣⵣⴰⵢⴻⵔ'
    },
    wilaya: 'Alger',
    pricePerNight: 19500,
    rating: 4.92,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'أمين دمرجي',
    hostImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80',
    beds: 3,
    bathrooms: 2,
    guests: 4,
    features: {
      ar: ['إنترنت ألياف بصرية سريعة فايبر', 'حمام جاكوزي دافئ مدمج', 'موقع وسط الحي الدبلوماسي الآمن', 'نظام تدفئة وتكييف مركزي ذكي', 'أمن على مدار الساعة بـ بواب'],
      fr: ['Fibre optique ultra rapide', 'Bain jacuzzi chauffant', 'Situation dans un quartier sécurisé', 'Climatisation réversible intelligente', 'Gardiennage et caméras 24/7'],
      en: ['Ultra-fast fiber optic Wi-Fi', 'Private hot tub jacuzzi', 'Safe diplomatic neighborhood', 'Smart heating & cooling system', '24/7 watchman on duty'],
      kab: ['Fibre optique', 'Jacuzzi', 'ⵃⵉⴷⵔⴰ ⵜⴰⵖⴻⵍⵍⵉⵙⵜ', 'ⵜⴰⵚⴻⵎⵎⵓⴷⵜ ⵜⴰⵏⴻⵎⵎⴰⵙⵜ', 'Security']
    },
    reviews: [
      {
        id: 'r6_1',
        userName: 'نسيم الشريف',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '2026-05-10',
        comment: {
          ar: 'المنطقة آمنة جداً ومحترمة، الأثاث مريح ومن الطراز الرفيع، وأخي أمين كان رائعاً في الموثوقية والدقة. أوصي بشدة لرجال الأعمال والبعثات.',
          fr: 'Séjour fantastique dans Hydra. Très discret, sécurisé et l’hôte est toujours disponible pour faciliter l’expérience.',
          en: 'Extremely clean and located in the safest zone in Algiers. Hydra is quiet and majestic, and Amin is a master of host hospitality.',
          kab: 'ⴰⵎⴽⴰⵏ ⵢⴻⵚⴼⴰ, ⵢⴻⵍⵀⴰ ⴰⵟⴰⵙ ⴷⴻⴳ ⵃⵉⴷⵔⴰ.'
        }
      }
    ]
  },

  // 4. Available this Summer (بيوت متاحة هذا الصيف)
  {
    id: 'summer_1',
    category: 'summer_houses',
    title: {
      ar: 'شاليه خشبي بنورامي شاطئي على رمال شواطئ جيجل الزرقاء',
      fr: 'Bungalow Panoramique les Pieds dans l’Eau à Jijel',
      en: 'Panoramic Beachfront Cabin on the Blue Shores of Jijel',
      kab: 'ⵛⵛⴰⵍⵉⵀⴰⵜ Panoramique ⵖⴻⴼ ⵜⵉⴼⵜⵉⵙⵉⵏ ⵏ ⵊⵉⵊⴻⵍ'
    },
    description: {
      ar: 'هل تبحث عن هروب صيفي مطلق؟ هذا الشاليه البنورامي يقع على بعد 5 خطوات فقط من الرمال الذهبية لشاطئ جيجل الخلاب. استيقظ على صوت أمواج البحر العذبة، وتناول فطورك على السطح البحري الشاسع المجهز، مع إمكانية توفير قوارب للصيد والتنزه بمغارات جيجل العجيبة.',
      fr: 'Une aventure estivale authentique. Bungalow chaleureux en bois à seulement 5 pas des eaux cristallines de Jijel (Ziama Mansouria). Terrasse panoramique privée vue mer, barbecue sous les étoiles et location de bateaux possible.',
      en: 'An absolute summer dream stay. Beautiful beachfront wooden cottage situated only 5 steps away from the golden sands of Ziama Mansouriah in Jijel. Soak up the warm Mediterranean sun on your private sea balcony.',
      kab: 'ⵛⵛⴰⵍⵉⵀⴰⵜ ⴷⴻⴳ ⵜⵉⴼⵜⵉⵙⵉⵏ ⵏ ⵊⵉⵊⴻⵍ, ⴰⵥⴻⵖ ⵖⴻⵔ ⵢⵉⵍ, ⵍⵍⴰⵏ ⵜⵉⵖⴰⵡⵙⵉⵡⵉⵏ ⵏ ⵓⵏⴻⴱⴷⵓ.'
    },
    location: {
      ar: 'زيامة منصورية، جيجل',
      fr: 'Ziama Mansouriah, Jijel',
      en: 'Ziama Mansouriah, Jijel',
      kab: 'ⵣⵉⴰⵎⴰ ⵎⴰⵏⵚⵓⵔⵉⴰ, ⵊⵉⵊⴻⵍ'
    },
    wilaya: 'Jijel',
    pricePerNight: 12000,
    rating: 4.89,
    reviewsCount: 22,
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1473116763269-25541579ff6f?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'عماد بن طاهر',
    hostImage: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=100&q=80',
    beds: 4,
    bathrooms: 1,
    guests: 5,
    features: {
      ar: ['موقع مباشر على الشاطئ (رجل في الماء)', 'شرفة مطلة وصوت الأمواج', 'مثالي لعشاق السباحة والصيد', 'معدات تخييم وسباحة وشواء', 'قريب من الكهوف والمغارات العجيبة'],
      fr: ['Accès direct à la plage (les pieds dans l’eau)', 'Terrasse privée bercée par le son des vagues', 'Idéal pour la natation et pêche', 'Équipements de plage et barbecue installés', 'À proximité des Grottes Merveilleuses de Jijel'],
      en: ['Direct beach access at your doorstep', 'Private balcony tuned to oceanic waves', 'Perfect for swimming & marine fishing', 'Included beach chairs & barbeque setup', 'Close to the famous Jijel caves'],
      kab: ['ⵖⴻⴼ ⵜⴼⵜⵉⵙⵜ ⵢⴻⵍⵍⴰⵏ', 'ⵜⴰⴱⴻⵔⵏⴰ ⵖⴻⵔ ⵢⵉⵍ', 'ⵉⵛⴻⵔⵔⴻⴷ ⵏ ⵓⵙⵉⵔⴻⴷ', 'Barbecue', 'ⵊⵉⵊⴻⵍ ⵜⴰⵎⴻⵇⵔⴰⵏⵜ']
    },
    reviews: [
      {
        id: 'r7_1',
        userName: 'سفيان العتر',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '2026-05-20',
        comment: {
          ar: 'شاليه بقمة الجمال والنظافة، والبحر تحته مباشرة كأنه ملكك الخاص. الأطفال استمتعوا للغاية وعماد مضيف كريم وخلوق.',
          fr: 'Jijel est splendide, et ce bungalow en bois est le meilleur moyen d’en apprécier le charme sauvage. Merci à Imad !',
          en: 'Absolute heaven on Earth. Literally 10 seconds of walking and you are swimming in paradise. Imad was ultra helpful.',
          kab: 'ⵊⵉⵊⴻⵍ ⵜⴻⵚⴱⴻⵃ, ⴰⵅⴰⵎ ⵢⴻⵍⵀⴰ ⴰⵟⴰⵙ ⵖⴻⵔ ⵢⵉⵍ.'
        }
      }
    ]
  },
  {
    id: 'summer_2',
    category: 'summer_houses',
    title: {
      ar: 'شقة واسعة على جرف بحري بإطلالة زرقاء ساحرة في العوانة جيجل',
      fr: 'Appartement de Plage Vue Panoramique à El Aouana, Jijel',
      en: 'Panoramic Cliffside Ocean Apartment in El Aouana, Jijel',
      kab: 'ⴰⵅⴰⵎ ⵏ ⵓⵏⴻⴱⴷⵓ ⴷⴻⴳ ⵍⵄⵡⴰⵏⴰ, ⵊⵉⵊⴻⵍ'
    },
    description: {
      ar: 'شقة عائلية آمنة في مجمع سكني سياحي يقع على مرتفع شاطئ العوانة المشهور بولاية جيجل. إطلالة غابة وجبل وساحل مجتمعين، هواء بارد ومنعش وشقة مهيأة بثلاث غرف نوم واسعة مكيفة بالكامل مع مواقف سيارات آمنة.',
      fr: 'Bel appartement familial climatisé situé sur les hauteurs côtières d’El Aouana, Jijel. Conjugue admirablement vue sur mer turquoise et forêts de chênes lièges. Sécurisé avec parking et plages d’El Aouana faciles d’accès.',
      en: 'Splendid executive family apartment looking down on the pristine coastal cliffs of El Aouana, Jijel. Fully air-conditioned, featuring three bedrooms, secured private car parking, and natural breeze.',
      kab: 'ⴰⵅⴰⵎ ⵏ ⵜⵡⴰⵛⵓⵍⵉⵏ ⴷⴻⴳ ⵍⵄⵡⴰⵏⴰ ⵊⵉⵊⴻⵍ , ⴰⵣⴻⴳⵣⴰ ⵏ ⵢⵉⵍ.'
    },
    location: {
      ar: 'العوانة، جيجل',
      fr: 'El Aouana, Jijel Sensation',
      en: 'El Aouana, Jijel',
      kab: 'ⵍⵄⵡⴰⵏⴰ, ⵊⵉⵊⴻⵍ'
    },
    wilaya: 'Jijel',
    pricePerNight: 9800,
    rating: 4.83,
    reviewsCount: 15,
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'جمال قادري',
    hostImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    beds: 5,
    bathrooms: 1,
    guests: 7,
    features: {
      ar: ['تكييف هواء ممتاز في كل غرف', 'موقف محمي مخصص للسيارات', 'إطلالة بانورامية بحرية وجبلية حية', 'مطبخ كبير متكامل بكامل اللوازم والأواني', 'قريب من جزيرة جافيا العذراء'],
      fr: ['Climatisation moderne complète', 'Espace parking gardé affecté', 'Vue mer et montagne imprenable', 'Cuisine entièrement équipée pour familles', 'À 5 minutes de l’île Cavallo'],
      en: ['Full modern air conditioning', 'Allocated gated parking space', 'Panoramic ocean & forest scenes', 'Large, fully-stocked family kitchen', 'Close to the scenic Cavallo Island'],
      kab: ['ⵜⴰⵚⴻⵎⵎⵓⴷⵜ', 'Parking', 'ⴰⵥⴻⵖ ⵖⴻⵔ ⵢⵉⵍ ⴷ ⵓⴷⵔⴰⵔ', 'ⵜⴰⵅⴰⵎⵜ ⵏ ⵓⵙⴻⵏⵡⵉ', ' Cavallo']
    },
    reviews: [
      {
        id: 'r8_1',
        userName: 'سامية بوطة',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        rating: 4,
        date: '2026-05-15',
        comment: {
          ar: 'الشقة واسعة ومجهزة بكل ما تحتاجه العائلة المطبخ رائع والإطلالة مهدئة للأعصاب في أي وقت. تعامل جمال راقٍ جداً.',
          fr: 'Appartement fantastique et spacieux. L’emplacement sur les hauteurs d’El Aouana est très frais et plaisant en été.',
          en: 'Extremely roomy and fully fitted for heavy family cooking. The ocean and forest views from the balcony were sublime.',
          kab: ' ⴰⵅⴰⵎ ⵢⴻⵍⵀⴰ ⴰⵟⴰⵙ : ⵍⵄⵡⴰⵏⴰ ⵊⵉⵊⴻⵍ.'
        }
      }
    ]
  },

  // 5. Chalets (شاليهات)
  {
    id: 'chalet_1',
    category: 'chalets',
    title: {
      ar: 'شاليه جبل البلوط السويسري الخشبي في أعالي الحديقة الوطنية تيكجدا',
      fr: 'Chalet Suisse en Bois de Chêne dans les Hauteurs de Tikjda',
      en: 'A-Frame Oakwood Forest Chalet in High Tikjda National Park',
      kab: 'ⵛⵛⴰⵍⵉⵀⴰⵜ ⵏ ⵜⵉⴽⵊⴷⴰ ⵙ ⵓⵙⵖⴰⵔ ⴷⴻⴳ ⵓⴷⵔⴰⵔ'
    },
    description: {
      ar: 'اهرب إلى أحضان غابات الأرز الأطلسي في جبال جرجرة بالتيكجدا. شاليه خشبي مبني بالبلوط بلمسة سويسرية ممتعة، يتميز بمدفأة حطب دافئة لليالي الشتاء الباردة، وشرفة مطلة على قمم الجبال الشاهقة المكسوة بالثلوج. تجربة استثنائية للاسترخاء.',
      fr: 'Chalet forestier douillet entièrement conçu en bois de cèdre et de chêne, niché à 1500m d’altitude au cœur du Parc National de Tikjda (Djurdjura). Cheminée au feu de bois traditionnelle, literie haut de gamme et terrasse sous la neige.',
      en: 'Cozy Aframe forest cabin crafted out of local cedar and oak wood, situated 1500m high in the spectacular Djurdjura National Park of Tikjda. Features a traditional logwood fireplace and sweeping snow mountain views.',
      kab: 'ⵛⵛⴰⵍⵉⵀⴰⵜ ⵏ ⵜⵉⴽⵊⴷⴰ ⴷⴻⴳ ⵓⴷⵔⴰⵔ ⵏ ⵊⴻⵔⵊⴻⵔ , ⵍⵍⴰⵏ ⵜⵉⵖⴰⵡⵙⵉⵡⵉⵏ ⵏ ⵜⵓⴷⴻⵔⵜ .'
    },
    location: {
      ar: 'تيكجدا، البويرة',
      fr: 'Tikjda Djurdjura, Bouira',
      en: 'Tikjda, Bouira',
      kab: 'ⵜⵉⴽⵊⴷⴰ, ⵜⵉⵣⵉ ⵡⵓⵣⵓ / ⴱⵓⵢⵔⴰ'
    },
    wilaya: 'Bouira',
    pricePerNight: 13500,
    rating: 4.96,
    reviewsCount: 45,
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'ياسين حداد',
    hostImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    beds: 3,
    bathrooms: 1,
    guests: 4,
    features: {
      ar: ['مدفأة حطب طبيعي دافئة', 'إطلالة ثلجية وجبلية بانورامية', 'شاحن سيارات وجلسات خشبية', 'معدات المشي في المسارات مجانية', 'شاي الأعشاب الجبلية الترحيبي'],
      fr: ['Cheminée de hêtre et chêne', 'Vue neige et mont Djurdjura', 'Coin de détente extérieur en bois', 'Raquettes et bâtons de rando offerts', 'Tisanes bio de montagne de bienvenue'],
      en: ['Traditional logwood fireplace', 'Panoramic snow & Djurdjura peaks view', 'Cozy outdoor fireside seating', 'Free hiking/snowshoes gear rental', 'Organic local mountain tea welcome kit'],
      kab: ['ⴽⴰⵏⵓⵏ ⵏ ⵜⵙⴻⴳⴷⴰ', 'ⴰⵥⴻⵖ ⵖⴻⵔ ⵜⵉⴽⵊⴷⴰ', 'ⵉⵇⵓⴷⴰⵔ ⵏ ⵓⴷⵔⴰⵔ', 'Raquettes', 'ⵍⴰⵜⴰⵢ ⵏ ⵓⴷⵔⴰⵔ']
    },
    reviews: [
      {
        id: 'r9_1',
        userName: 'فاتح بوغرين',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '2026-01-10',
        comment: {
          ar: 'الشاليه خيالي والثلج هطل بغزارة فوق الأسطح وموقد الحطب الدافئ جعل السهرة رائعة. ياسين شخص مميز ومضياف.',
          fr: 'Une nuit grandiose sous la neige de Tikjda. Le crépitement du feu de bois avec un thé à la menthe chaud est inoubliable !',
          en: 'Incredibly cozy. Sleeping in a genuine wood chalet in Djurdjura surrounded by snow and pine trees was breathtaking.',
          kab: 'ⵛⵛⴰⵍⵉⵀⴰⵜ ⵢⴻⵍⵀⴰ ⴰⵟⴰⵙ, ⵜⵉⴽⵊⴷⴰ, ⵢⴰⵙⵉⵏ ⴷ ⴰⵎⴷⴰⵏ ⵢⴻⵍⵀⴰ.'
        }
      }
    ]
  },

  // 6. Swimming Pools (مسابح)
  {
    id: 'pool_1',
    category: 'pools',
    title: {
      ar: 'فيلا وايت بالاس الفخمة - مسبح لا متناهي مغطى بالكامل وبخصوصية مطلقة',
      fr: 'Villa de Luxe "White Palace" - Piscine à débordement 100% Intime',
      en: 'Villa "White Palace" - 100% Fully Gated Private Infinity Pool',
      kab: 'ⵜⴰⴼⵉⵍⵍⴰⵜ "White Palace" - ⵉⵎⵙⵉⵔⵉⴳⵏ ⵢⴻⵍⵀⴰⵏ ⵙ ⵍⵉⵎⴰⵏ'
    },
    description: {
      ar: 'فيلا ألترا مودرن بيضاء مصممة بقمة الفخامة، تقع في حي الفلل الهادئ بزرالدة بعيداً عن صخب الجزائر. الميزة الكبرى هي حوض مسبح خارجي لا متناهي هائل ومحجوب تماماً عن الجيران بنسبة 100% لتستمتع العائلات بالراحة والحرية التامة. حديقة مهيأة وجلسة خارجية راقية وشواية حديثة.',
      fr: 'Sublime villa contemporaine haut de gamme située dans la banlieue calme de Zeralda, Alger. Offre une magnifique piscine à débordement à l’abri complet des regards (sans vis-à-vis) pour une intimité totale en famille. Terrasse lounge élégante.',
      en: 'Stunning premium modern villa located in the peaceful Zeralda neighborhood, Algiers. Boasts a massive infinity swimming pool designed with 100% absolute privacy with high fenced walls for local families.',
      kab: 'ⵜⴰⴼⵉⵍⵍⴰⵜ ⴷⴻⴳ ⵣⴻⵔⴰⵍⴷⴰ ⵙ ⵢⵉⵎⵙⵉⵔⵉⴳⵏ ⵢⴻⵍⵀⴰⵏ ⵙ ⵍⵉⵎⴰⵏ ⵉ ⵜⵡⴰⵛⵓⵍⵉⵏ.'
    },
    location: {
      ar: 'زرالدة، الجزائر العاصمة',
      fr: 'Zeralda, Alger Ouest',
      en: 'Zeralda, West Algiers',
      kab: 'ⵣⴻⵔⴰⵍⴷⴰ, ⵍⴻⵣⵣⴰⵢⴻﺮ'
    },
    wilaya: 'Alger',
    pricePerNight: 35000,
    rating: 4.97,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'فاطمة الزهراء',
    hostImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    beds: 6,
    bathrooms: 4,
    guests: 10,
    features: {
      ar: ['مسبح إنفينيتي لا متناهي', 'خصوصية عائلية تامة 100% (بدون مقابل)', 'حديقة عشبية مفروشة واسعة وجلسات', 'شاشة ذكية عملاقة ونظام صوت بوز', 'مطبخ عائلي أمريكي ضخم'],
      fr: ['Piscine à débordement (sans aucun vis-à-vis)', 'Absolue intimité familiale 100%', 'Vaste jardin paysager et salon de jardin', 'Smart TV cinéma et système audio Bose', 'Immense cuisine américaine ouverte'],
      en: ['Stunning outdoor infinity pool', '100% family privacy (No overlook)', 'Gated landscaped garden with lounges', 'Giant Smart TV & Bose audio sound system', 'Huge fully fitted American kitchen'],
      kab: ['ⵉⵎⵙⵉِرⵉⴳⵏ ⵢⴻⵚⴼⴰⵏ', 'ⵜⵓⴷⴻⵔⵜ ⵜⵓⵙⵍⵉⴳⵜ (ⵍⵉⵎⴰⵏ)', 'ⵜⵉⴼⴻⵔⵜ', 'Smart TV & Bose', 'Cuisine ⵜⴰⵎⴻⵇⵔⴰⵏⵜ']
    },
    reviews: [
      {
        id: 'r10_1',
        userName: 'جلول بن ضيف',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '2026-05-15',
        comment: {
          ar: 'الخصوصية هنا هي الأفضل! مسبح واسع ممتع للأولاد والأمور كلها مطابقة للأوصاف، وفاطمة مضيفة ممتازة وسريعة الرد.',
          fr: 'Incroyable séjour. Très bel endroit et surtout aucun vis-à-vis pour la piscine extérieure, ce qui est très rare sur Alger.',
          en: 'Exceptional. Highly private pool area, pristine water quality, and high security. Zeralda is calm, lovely experience!',
          kab: 'ⵉⵎⵙⵉⵔⵉⴳⵏ ⵢⴻⵍⵀⴰ ⴰⵟⴰⵙ ⵙ ⵍⵉⵎⴰⵏ ⵉ ⵜⵡⴰⵛⵓⵍⵉⵏ ⵏⵏⴻⵖ.'
        }
      }
    ]
  },

  // 7. Wedding Halls (قاعات حفلات)
  {
    id: 'hall_1',
    category: 'wedding_halls',
    title: {
      ar: 'قاعة الإمبراطورية الكبرى للأفراح والمؤتمرات - قصر الحفلات الأنيق بالقبة',
      fr: 'Majestic "Empire" Wedding Hall - Palais des Fêtes Chic Kouba',
      en: 'Imperial Palace Wedding & Grand Conference Hall Kouba',
      kab: 'ⵜⴰⵅⴰⵎⵜ ⵏ ⵜⵎⴻⵖⵔⵉⵡⵉⵏ "Empire" - Kouba'
    },
    description: {
      ar: 'هل تقيم حفل زفافك أو مناسبتك قريباً في الجزائر؟ قاعة الإمبراطورية الكبرى بحي القبة العريق توفر لكم قصراً من الفخامة يتسع لـ 500 ضيف. ديكورات شرقية ملكية فريدة وسلالم مرموتية خلابة، مجهزة بأحدث هندسة صوت وإضاءة ليزر، وجناح فاخر مخصص للعروس لتصفيف الشعر والاستراحة.',
      fr: 'Pour vos mariages, réceptions et événements exclusifs à Alger. La prestigieuse salle l’Empire à Kouba offre un cadre majestueux pouvant accueillir jusqu’à 500 convives. Design impérial oriental, lustre somptueux, sonorisation et loge royale privée pour la mariée.',
      en: 'Planning an premium wedding, event or executive gathering in Algiers? The prestigious Empire Hall in Kouba offers an imperial venue accommodating up to 500 guests with elegant lighting, stage decoration and VIP changing suites.',
      kab: 'ⵜⴰⵅⴰⵎⵜ ⵏ ⵜⵎⴻⵖⵔⵉⵡⵉⵏ "Empire" ⴷⴻⴳ  Kouba ⵉ ⵜⵎⴻⵖⵔⵉⵡⵉⵏ ⵏⵏⴻⴽ.'
    },
    location: {
      ar: 'القبة، الجزائر العاصمة',
      fr: 'Kouba, Alger Centre-Est',
      en: 'Kouba, Algiers',
      kab: 'ⵇⵓⴱⴰ, ⵍⴻⵣⵣⴰⵢⴻﺮ'
    },
    wilaya: 'Alger',
    pricePerNight: 85000,
    rating: 4.81,
    reviewsCount: 33,
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'إبراهيم غول',
    hostImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    beds: 1, // Honeymoon suite
    bathrooms: 4,
    guests: 500,
    features: {
      ar: ['سعة حتى 500 شخص كحد أقصى', 'ديكورات وممرات مرموتية وإضاءة ليزر ثلاثية', 'جناح مجهز بالكامل ومكيف لراحة العروس', 'فريق خدمة وتقديم شاي وحلويات محترف', 'موقف شاسع محروس ومخصص للسيارات'],
      fr: ['Capacité jusqu’à 500 convives', 'Décorations majestueuses et effets de lumière', 'Suite privée climatisée pour la mariée', 'Équipe de serveurs et accueil de gala', 'Grand parking fermé surveillé'],
      en: ['Accommodates up to 500 guests', 'Breathtaking imperial decor & laser effects', 'Private luxury bridal restroom suite', 'Full high-end server crew & reception team', 'Massive gated private parking space'],
      kab: ['500 ⵏ ⵢⵉⵎⴷⴰⵏⴻⵏ ⵎⴰⵅ', 'Décorations', 'ⵜⴰⵅⴰⵎⵜ ⵏ ⵜⵙⵍⵉⵜ', 'ⵉⵎⵙⴻⴷⴷⴻⵔⵜ', 'Parking']
    },
    reviews: [
      {
        id: 'r11_1',
        userName: 'سليم بن يونس',
        userAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '2026-04-12',
        comment: {
          ar: 'أقمنا حفل زفاف ولدنا في قاعة الإمبراطورية الكبرى، وكان التنظيم محترفاً للغاية والحلويات والقهوة قدمت ساخنة للجميع، بارك الله في خدمات القاعة.',
          fr: 'Magnifique salle de mariage ! Le gérant Ibrahim est très sérieux et à l’écoute. Les serveurs ont été très polis et soignés.',
          en: 'Held our daughter’s wedding ceremony here, absolutely stunning and well-managed staff. Ibrahim made the coordination stress-free.',
          kab: 'ⵜⴰⵅⴰⵎⵜ ⵏ ⵜⵎⴻⵖⵔⵉⵡⵉⵏ ⵜⴻⵚⴱⴻⵃ ⴰⵟⴰⵙ, Ibrahim ⴷ ⴰⵎⴷⴰⵏ ⵢⴻⵍⵀⴰ.'
        }
      }
    ]
  },

  // 8. Farms / Ranches (مزارع)
  {
    id: 'farm_1',
    category: 'farms',
    title: {
      ar: 'مزرعة الياسمين الريفية الهادئة والمجهزة بمسبح عائلي في المتيجة البليدة',
      fr: 'Ferme Rustique Sereine "Jasmin Cottage" avec Piscine active à Blida',
      en: 'Jasmine Countryside Ranch & Cottage with Family Pool Blida',
      kab: 'ⵜⵉⴼⴻⵔⵎⵉⵡⵉⵏ "Jasmin Cottage" - ⴱⵍⵉⴷⴰ'
    },
    description: {
      ar: 'استيقظ في ريف المتيجة الخلاب تحت ظلال أشجار البرتقال والليمون والزيتون. مزرعة الياسمين الريفية تجمع المعيشة الريفية البسيطة والخدمات العصرية الراقية. تحتوي المزرعة على كوخ ريفي مجهز بالكامل، حيوانات أليفة (طيور نادرة، أرانب، خيول)، فضاء جلوس عائلي خارجي، وحمام سباحة منعش ومحمي.',
      fr: 'Évadez-vous dans une ferme fruitière verdoyante sur la plaine de la Mitidja à Blida. Entouré d’orangers et d’oliviers, le cottage Jasmin dispose d’une piscine privative grillagée, d’un enclos d’animaux de ferme, et de terrasses fleuries apaisantes.',
      en: 'Flee to an orange-blossom orchard farm in the fertile fields of Mitidja, Blida. Jasmine Cottage features rustic stone living, a gated family pool, interactions with friendly farm animals, and endless surrounding greenery.',
      kab: 'ⵜⵉⴼⴻⵔⵎⵉⵡⵉⵏ "Jasmin Cottage" ⴷⴻⴳ ⴱⵍⵉⴷⴰ ⵙ ⵓⵙⵉⵔⴻⴷ ⴷ ⵢⵉⵎⵙⵉⵔⵉⴳⵏ.'
    },
    location: {
      ar: 'المتيجة، البليدة',
      fr: 'Plaine de la Mitidja, Blida',
      en: 'Mitidja Countryside, Blida',
      kab: 'ⵎⵉⵜⵉⵊⴰ, ⴱⵍⵉⴷⴰ'
    },
    wilaya: 'Blida',
    pricePerNight: 15000,
    rating: 4.93,
    reviewsCount: 30,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'عز الدين بوقرة',
    hostImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&q=80',
    beds: 4,
    bathrooms: 2,
    guests: 8,
    features: {
      ar: ['مسبح ريفي محاط بأشجار الليمون', 'أشجار برتقال ومشمش وزيتون لقطف الفاكهة', 'كوخ جبلي ريفي دافئ', 'ركوب خيول وإطعام أرانب مجاني للأطفال', 'حليب ومربى ريفي طازج في الصباح'],
      fr: ['Piscine de campagne cernée de citronniers', 'Verger bio (oranges, raisins) libres à cueillir', 'Cottage en pierre douillet et climatisé', 'Poneys et lapins accessibles aux enfants', 'Petit-déjeuner rustique terroir bio offert'],
      en: ['Rustic country pool lined with citrus trees', 'Organic orchard picking (Oranges, Figs, Olives)', 'Fully air-conditioned stone ranch house', 'Friendly horseback rides & rabbit feeding', 'Complimentary fresh organic breakfast eggs & milk'],
      kab: ['ⵉⵎⵙⵉⵔⵉⴳⵏ', 'ⵜⵉⵣⵣⴻⴳⵡⴰ', 'Cottage', 'ⵉⴷⵔⴰⵔⵏ ⴷ ⵉⵎⵓⴷⴰⵔⵏ', 'ⵉⵎⴻⴽⵍⵉ ⵏ ⵜⵚⴻⴱⵃⵉⵜ']
    },
    reviews: [
      {
        id: 'r12_1',
        userName: 'عبد الناصر طالبي',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '2026-05-22',
        comment: {
          ar: 'المزرعة جنة على الأرض، الهواء نقي جداً ورائحة زهر الليمون تملاً الأرجاء. عمي عز الدين استقبلنا كأننا عائلته وقدم لنا حليباً طازجاً مجاناً.',
          fr: 'Magnifique ferme au calme absolu. Parfait pour sevrer les enfants des tablettes et leur faire découvrir la vraie vie à Blida.',
          en: 'Absolute paradise in Blida. Air is sweet with citrus blossoms, pool is fresh and Suleimane is a gentleman of unmatched kindness.',
          kab: 'ⵜⵉⴼⴻⵔⵎⵉⵡⵉⵏ ⵜⴻⵚⴱⴻⵃ ⴰⵟⴰⵙ , ⵄⴻⵣⴷⵉⵏ ⴷ ⴰⵎⴷⴰⵏ ⵢⴻⵍⵀⴰ.'
        }
      }
    ]
  },
  {
    id: 'barcelona_room',
    category: 'recently_listed',
    title: {
      ar: 'غرفة في برشلونة',
      fr: 'Chambre chic à Barcelone',
      en: 'Chic Private Room in Barcelona',
      kab: 'ⵜⴰⵅⴰⵎⵜ ⴷⴻⴳ Barcelone'
    },
    description: {
      ar: 'غرفة خاصة هادئة ومشمسة في قلب حي غراسيا ببرشلونة، مجهزة بسرير مريح ومكتب عمل وإنترنت سريع، مثالية للمسافرين المنفردين.',
      fr: 'Chambre privée ensoleillée dans le quartier charmant de Gràcia. Proche du métro, avec lit confortable et coin bureau idéal.',
      en: 'Sunny private room in Barcelona’s trendy Gràcia district. Comfort bed, fast Wi-Fi, and workspace perfect for digital nomads.',
      kab: 'ⵜⴰⵅⴰⵎⵜ ⴷⴻⴳ Barcelone'
    },
    location: {
      ar: 'برشلونة',
      fr: 'Barcelone',
      en: 'Barcelona',
      kab: 'Barcelone'
    },
    wilaya: 'All',
    pricePerNight: 9500,
    rating: 4.94,
    reviewsCount: 148,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'María',
    hostImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    beds: 1,
    bathrooms: 1,
    guests: 2,
    features: {
      ar: ['واي فاي سريع', 'تكييف غاز', 'مكتب عمل', 'شرفة مشمسة'],
      fr: ['Wi-Fi Rapide', 'Climatisation', 'Espace de travail', 'Terrasse'],
      en: ['Fast Wi-Fi', 'Air Conditioning', 'Laptop Workspace', 'Balcony'],
      kab: ['Internet']
    },
    reviews: []
  },
  {
    id: 'hotel_este',
    category: 'recently_listed',
    title: {
      ar: 'Hotel Esté',
      fr: 'Hotel Esté / Spa Paris',
      en: 'Hotel Esté & Thermal Bath',
      kab: 'Hotel Esté'
    },
    description: {
      ar: 'فندق عصري فاخر يتميز بمسبح حراري وتصميم داخلي دافئ يوفر الخصوصية والراحة القصوى مع حمامات سبا فاخرة.',
      fr: 'Hôtel moderne avec piscine thermale intérieure, espace spa apaisant et chambres chaleureuses grand confort.',
      en: 'Premium boutique hotel featuring heated interior thermal waters, signature architecture and absolute serenity.',
      kab: 'Hotel Esté'
    },
    location: {
      ar: 'فندق',
      fr: 'Hôtel',
      en: 'Hotel',
      kab: 'Hotel'
    },
    wilaya: 'All',
    pricePerNight: 23000,
    rating: 4.82,
    reviewsCount: 92,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'Pierre',
    hostImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    beds: 2,
    bathrooms: 1,
    guests: 4,
    features: {
      ar: ['مسبح دافئ', 'خدمة غرف ٢٤ ساعة', 'جناح سبا متكامل', 'إفطار فرنسي فاخر'],
      fr: ['Piscine', 'Service de chambre', 'Espace Spa', 'Petit-déjeuner'],
      en: ['Heated Pool', '24/7 Room Service', 'Full Spa Suite', 'Exquisite Breakfast'],
      kab: ['Pool']
    },
    reviews: []
  },
  {
    id: 'hotel_sevigne',
    category: 'recently_listed',
    title: {
      ar: 'Hotel de Sevigne',
      fr: 'Hotel de Sévigné Paris',
      en: 'Hotel de Sévigné Boutique Rooms',
      kab: 'Hotel de Sevigne'
    },
    description: {
      ar: 'أجنحة بوتيكية مصممة على الطراز الكلاسيكي بألوان دافئة مريحة وإضاءة هادئة لتجربة إقامة مثالية وراقية.',
      fr: 'Suites parisiennes élégantes ornées de tons terracotta doux et de finitions minutieuses idéales pour un week-end romantique.',
      en: 'Classic boutique design suite boasting pastel warm colors, gentle custom lighting, and high-end room finishes.',
      kab: 'Hotel de Sevigne'
    },
    location: {
      ar: 'فندق',
      fr: 'Hôtel',
      en: 'Hotel',
      kab: 'Hotel'
    },
    wilaya: 'All',
    pricePerNight: 28000,
    rating: 4.83,
    reviewsCount: 65,
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    ],
    hostName: 'Jean',
    hostImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    beds: 2,
    bathrooms: 1,
    guests: 3,
    features: {
      ar: ['تصميم كلاسيكي', 'واي فاي سريع جداً', 'ميني بار متكامل', 'شاشة عرض ذكية'],
      fr: ['Design classique', 'Wi-Fi ultra rapide', 'Mini Bar', 'Écran connecté'],
      en: ['Classic interior', 'Ultra fast Wi-Fi', 'Luxury Mini-bar', 'Smart TV screen'],
      kab: ['TV']
    },
    reviews: []
  }
];
