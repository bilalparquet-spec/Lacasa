import React, { useState } from 'react';
import { useApp } from './AppContext';
import { useLanguage } from './LanguageContext';
import { languageNames } from '../translations';
import { UserProfile } from '../types';
import asiremLogo from '../assets/images/asirem_logo_1780199814542.png';
import { 
  User, Settings, HelpCircle, Shield, Share2, Scale, 
  LogOut, CheckCircle2, Copy, Globe, ChevronLeft, 
  ChevronRight, ArrowRight, ArrowLeft, Star, Award, Sparkles, AlertCircle,
  Bell, Hand, Key, FileText, ArrowLeftRight, X, Lock, CreditCard, Briefcase, UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Demo certified legal co-hosts in Algeria
const CO_HOSTS_LIST = [
  { id: 'ch1', name: 'يوسف مزايري', city: 'الجزائر العاصمة', rating: 4.9, bio: 'وكيل عقاري معتمد بخبرة 12 سنة ببلدية سيدي يحيى وحيدرة. إدارة تامة واستقبال السياح.', phone: '0551 11 22 33' },
  { id: 'ch2', name: 'أمين بلحسن', city: 'وهران جبهة البحر', rating: 4.8, bio: 'إدارة شقق فاخرة وإقامات فندقية بالباهية وهران الكبرى مع خدمة النظافة الفندقية الشاملة.', phone: '0560 44 55 66' },
  { id: 'ch3', name: 'كمال جاب الله', city: 'بجاية وتيزي وزو', rating: 4.95, bio: 'متخصص في كراء وإدارة الشاليهات الجبلية والغابية بمنطقة القبائل وتيكجدا.', phone: '0555 77 88 99' },
  { id: 'ch4', name: 'عبد الحميد الهادي', city: 'جيجل الطاهير', rating: 4.75, bio: 'تسيير وتأجير البنغالوهات الشاطئية الصيفية بجيجل وزيامة منصورية قانونياً وسياحياً.', phone: '0770 12 34 88' },
];

const AlgerianFAQs = [
  { q: 'ما هي وسائل الدفع المدعومة في الجزائر؟', a: 'ندعم حالياً الدفع اليدوي عند الاستلام، والتحويل عبر تطبيق بريدي موب (BaridiMob) لبريد الجزائر بالإضافة إلى حوالات CCP وحساب الدفع الذاتي.' },
  { q: 'كيف تلغى الحجوزات المستعجلة؟', a: 'يمكنك إلغاء أي حجز قادم مجاناً عبر تبويب "الرحلات" بالنقر على زر ملخص الإلغاء لاسترجاع عربونك كاملاً.' },
];

// Asirem Corp Logo SVG Component (crisp, vector-based, premium gold, transparent bg)
const AsiremLogoSVG: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 160 50" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M26 10 L14 38 H20 L22.5 32 H31.5 L34 38 H40 L28 10 H26 Z M23.5 28 L27 20 L30.5 28 H23.5 Z" 
        fill="#C5A85A" 
      />
      <path 
        d="M12 30 C 20 22, 32 22, 42 27 C 32 24, 20 25, 13.5 32 Z" 
        fill="#C5A85A" 
      />
      <text 
        x="47" 
        y="32" 
        fill="#C5A85A" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize="175%" 
        fontWeight="800"
        letterSpacing="-0.2"
      >
        Asirem <tspan fontWeight="400" fontSize="85%">CORP.</tspan>
      </text>
    </svg>
  );
};

export const ProfileTab: React.FC = () => {
  const { userProfile, updateUserProfile, bookings, favorites } = useApp();
  const { t, language, setLanguage } = useLanguage();

  const [activeSubView, setActiveSubView] = useState<string | null>(null);
  const [settingsSubSection, setSettingsSubSection] = useState<string | null>(null);
  const [showNotificationBanner, setShowNotificationBanner] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  // Form states
  const [profileForm, setProfileForm] = useState<UserProfile>({ ...userProfile });
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Privacy states
  const [cookieConsent, setCookieConsent] = useState(true);
  const [locationConsent, setLocationConsent] = useState(false);
  
  // Help state
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Non-blocking in-UI overlays (improves iframe user experience)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [requestedCoHostName, setRequestedCoHostName] = useState<string | null>(null);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profileForm);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`LACASA-HOST-REF-${profileForm.phone.replace(/\s+/g, '')}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleCoHostRequest = (name: string) => {
    setRequestedCoHostName(name);
    setTimeout(() => {
      setRequestedCoHostName(null);
    }, 4000);
  };

  // Render Subpages smoothly
  const renderSubView = () => {
    switch (activeSubView) {
      case 'settings':
        return (
          <div className="space-y-5 animate-fade-in" id="profile-subview-settings" dir="rtl">
            {/* 1. Header Row exactly matching Image 4 & 5 */}
            <div className="flex items-center justify-between pb-1">
              {/* Spacer on left for symmetry */}
              <div className="w-9 h-9 opacity-0 pointer-events-none" />

              {/* Centered/Right title if subsection is open */}
              {settingsSubSection && (
                <h3 className="text-[15px] font-black text-zinc-900">
                  {settingsSubSection === 'personal' && 'المعلومات الشخصية'}
                  {settingsSubSection === 'security' && 'تسجيل الدخول والأمان'}
                  {settingsSubSection === 'privacy' && 'الخصوصية'}
                  {settingsSubSection === 'notifications' && 'الإشعارات'}
                  {settingsSubSection === 'payments' && 'الدفعات'}
                  {settingsSubSection === 'translation' && 'الترجمة'}
                  {settingsSubSection === 'permissions' && 'أذونات الحجز'}
                  {settingsSubSection === 'business' && 'السفر من أجل العمل'}
                  {settingsSubSection === 'accessibility' && 'سهولة الوصول'}
                  {settingsSubSection === 'taxes' && 'الضرائب'}
                  {settingsSubSection === 'first_guest' && 'ضيفك الأول'}
                </h3>
              )}

              {/* Circular Back button exactly matching the images */}
              <button
                onClick={() => {
                  if (settingsSubSection) {
                    setSettingsSubSection(null);
                  } else {
                    setActiveSubView(null);
                  }
                }}
                className="w-10 h-10 bg-zinc-100/80 hover:bg-zinc-200/60 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 text-zinc-900 border border-zinc-200/30 shadow-xs"
                title="رجوع"
              >
                {language === 'ar' ? <ArrowRight className="w-5 h-5 stroke-[2.5px]" /> : <ArrowLeft className="w-5 h-5 stroke-[2.5px]" />}
              </button>
            </div>

            {!settingsSubSection ? (
              /* ==================== MAIN ACCOUNT SETTINGS LIST VIEW ==================== */
              <div className="space-y-5 animate-fade-in">
                {/* Big aligned Title "إعدادات الحساب" */}
                <h1 className="text-[26px] font-black text-[#111111] text-right tracking-tight leading-none pr-1">
                  إعدادات الحساب
                </h1>

                {/* 2. Notification Permission Card matching Image 4 */}
                {showNotificationBanner && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-zinc-100/55 rounded-3xl p-5 relative border border-zinc-200/20 text-right space-y-4 shadow-sm"
                  >
                    {/* Corner close sign */}
                    <button
                      type="button"
                      onClick={() => setShowNotificationBanner(false)}
                      className="absolute top-4 left-4 w-6 h-6 hover:bg-zinc-200 rounded-full flex items-center justify-center transition-all text-zinc-650 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5 stroke-[2.2px]" />
                    </button>

                    {/* Inline Title & Bell Emoji */}
                    <div className="flex items-center gap-2 justify-end pr-1">
                      <span className="text-[13.5px] font-black text-[#111111]">
                        تشغيل الإشعارات
                      </span>
                      <span className="text-base select-none">🔔</span>
                    </div>

                    {/* Description Subtext */}
                    <p className="text-[11px] font-bold text-zinc-500 leading-relaxed pl-8">
                      ابقَ على اطلاع دائم بالرسائل الجديدة وتفاصيل الحجوزات.
                    </p>

                    {/* Primary Button */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          alert("تم تفعيل إشعارات المتصفح بنجاح! ستتلقى تفاصيل الحجز الفوري أولاً بأول.");
                          setShowNotificationBanner(false);
                        }}
                        className="w-full bg-white hover:bg-zinc-50 font-black text-[11.5px] text-[#111111] py-2.5 rounded-xl border border-zinc-200 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                      >
                        نعم، أرجو إبلاغي
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 3. Account Settings Flat Options List */}
                <div className="space-y-0.5">
                  {/* Row 1: personal info */}
                  <button
                    onClick={() => setSettingsSubSection('personal')}
                    className="w-full py-3.5 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] group-hover:-translate-x-0.5 transition-transform" />
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-[13px] font-extrabold text-[#111111]">المعلومات الشخصية</span>
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <User className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                      </div>
                    </div>
                  </button>

                  {/* Row 2: Login / Security */}
                  <button
                    onClick={() => setSettingsSubSection('security')}
                    className="w-full py-3.5 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] group-hover:-translate-x-0.5 transition-transform" />
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-[13px] font-extrabold text-[#111111]">تسجيل الدخول والأمان</span>
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <Lock className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                      </div>
                    </div>
                  </button>

                  {/* Row 3: Privacy */}
                  <button
                    onClick={() => setSettingsSubSection('privacy')}
                    className="w-full py-3.5 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] group-hover:-translate-x-0.5 transition-transform" />
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-[13px] font-extrabold text-[#111111]">الخصوصية</span>
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <Hand className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                      </div>
                    </div>
                  </button>

                  {/* Row 4: Notifications Preference */}
                  <button
                    onClick={() => setSettingsSubSection('notifications')}
                    className="w-full py-3.5 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] group-hover:-translate-x-0.5 transition-transform" />
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-[13px] font-extrabold text-[#111111]">الإشعارات</span>
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <Bell className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                      </div>
                    </div>
                  </button>

                  {/* Row 5: Payments */}
                  <button
                    onClick={() => setSettingsSubSection('payments')}
                    className="w-full py-3.5 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] group-hover:-translate-x-0.5 transition-transform" />
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-[13px] font-extrabold text-[#111111]">الدفعات</span>
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <CreditCard className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                      </div>
                    </div>
                  </button>

                  {/* Row 6: Globe / Translation */}
                  <button
                    onClick={() => setSettingsSubSection('translation')}
                    className="w-full py-3.5 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] group-hover:-translate-x-0.5 transition-transform" />
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-[13px] font-extrabold text-[#111111]">الترجمة</span>
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <Globe className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                      </div>
                    </div>
                  </button>

                  {/* Row 7: Booking permissions */}
                  <button
                    onClick={() => setSettingsSubSection('permissions')}
                    className="w-full py-3.5 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] group-hover:-translate-x-0.5 transition-transform" />
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-[13px] font-extrabold text-[#111111]">أذونات الحجز</span>
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <Key className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                      </div>
                    </div>
                  </button>

                  {/* Row 8: Business traveling */}
                  <button
                    onClick={() => setSettingsSubSection('business')}
                    className="w-full py-3.5 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] group-hover:-translate-x-0.5 transition-transform" />
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-[13px] font-extrabold text-[#111111]">السفر من أجل العمل</span>
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                      </div>
                    </div>
                  </button>

                  {/* Row 9: Accessibility */}
                  <button
                    onClick={() => setSettingsSubSection('accessibility')}
                    className="w-full py-3.5 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] group-hover:-translate-x-0.5 transition-transform" />
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-[13px] font-extrabold text-[#111111]">سهولة الوصول</span>
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <Settings className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Divider exactly matching Image 5 */}
                <div className="border-t border-zinc-150/80 my-2.5" />

                {/* Flat Option Section 2 (Taxes & First Guest) */}
                <div className="space-y-0.5">
                  {/* Row 10: Taxes */}
                  <button
                    onClick={() => setSettingsSubSection('taxes')}
                    className="w-full py-3.5 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] group-hover:-translate-x-0.5 transition-transform" />
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-[13px] font-extrabold text-[#111111]">الضرائب</span>
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <FileText className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                      </div>
                    </div>
                  </button>

                  {/* Row 11: First Guest */}
                  <button
                    onClick={() => setSettingsSubSection('first_guest')}
                    className="w-full py-3.5 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] group-hover:-translate-x-0.5 transition-transform" />
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-[13px] font-extrabold text-[#111111]">ضيفك الأول</span>
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        <UserPlus className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Precise bottom label containing version number matching Image 5 with the company logo below it */}
                <div className="pt-8 flex flex-col items-end gap-1.5 pr-1" dir="rtl">
                  <span className="text-[10.5px] font-bold text-zinc-400 tracking-wide font-sans leading-none block">
                    Version 1.0.0
                  </span>
                  <img 
                    src={asiremLogo} 
                    alt="Asirem Corp" 
                    className="h-[12px] w-auto opacity-75 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ) : (
              /* ==================== SUBSECTIONS INNER RENDERING ==================== */
              <div className="pt-2 animate-fade-in text-right">
                {/* 1. Personal Information page */}
                {settingsSubSection === 'personal' && (
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-[10px] font-black text-zinc-400 mb-1">الاسم الكامل</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full text-xs font-bold bg-zinc-50 text-zinc-850 p-3.5 rounded-xl border border-zinc-200 focus:border-[#ff385c] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-zinc-400 mb-1">البريد الإلكتروني</label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full text-xs font-bold bg-zinc-50 text-zinc-850 p-3.5 rounded-xl border border-zinc-200 focus:border-[#ff385c] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-zinc-400 mb-1">رقم الهاتف</label>
                        <input
                          type="text"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full text-xs font-bold bg-zinc-50 text-zinc-850 p-3.5 rounded-xl border border-zinc-200 focus:border-[#ff385c] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-zinc-400 mb-1">الولاية الحالية</label>
                        <input
                          type="text"
                          value={profileForm.wilaya}
                          onChange={(e) => setProfileForm({ ...profileForm, wilaya: e.target.value })}
                          className="w-full text-xs font-bold bg-zinc-50 text-zinc-850 p-3.5 rounded-xl border border-zinc-200 focus:border-[#ff385c] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-zinc-400 mb-1">نبذة شخصية</label>
                        <textarea
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                          rows={3}
                          className="w-full text-xs font-bold bg-zinc-50 text-zinc-850 p-3.5 rounded-xl border border-zinc-200 focus:border-[#ff385c] outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#ff385c] hover:bg-rose-600 transition-all text-white font-black text-xs py-3.5 px-6 rounded-xl w-full cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>حفظ التعديلات الحالية</span>
                    </button>

                    {isSaved && (
                      <p className="text-xs text-rose-500 font-bold text-center animate-pulse pt-1">
                        ✓ تم تحديث معلوماتك بجدارة!
                      </p>
                    )}
                  </form>
                )}

                {/* 2. Login and Security page */}
                {settingsSubSection === 'security' && (
                  <div className="space-y-4">
                    <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-150 space-y-1.5">
                      <h4 className="text-xs font-black text-zinc-900">المصادقة الثنائية (2FA)</h4>
                      <p className="text-[10px] text-zinc-450 leading-relaxed font-bold">
                        تأمين حسابك عبر إرسال كود فوري في رسالة SMS لهاتفك عند تسجيل الدخول من متصفح جديد.
                      </p>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[10.5px] font-black text-[#ff385c]">
                          {isTwoFactorEnabled ? 'نشط الآن' : 'غير مفعل'}
                        </span>
                        <input
                          type="checkbox"
                          checked={isTwoFactorEnabled}
                          onChange={(e) => setIsTwoFactorEnabled(e.target.checked)}
                          className="w-10 h-5 accent-[#ff385c] rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-150 space-y-3">
                      <h4 className="text-xs font-black text-zinc-900">تحديث كلمة المرور</h4>
                      <div className="space-y-2">
                        <input
                          type="password"
                          placeholder="كلمة المرور الحالية"
                          className="w-full text-xs font-bold bg-white p-2.5 rounded-lg border border-zinc-200 outline-none"
                        />
                        <input
                          type="password"
                          placeholder="كلمة المرور الجديدة"
                          className="w-full text-xs font-bold bg-white p-2.5 rounded-lg border border-zinc-200 outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => alert("تم تحديث كلمة المرور بنجاح!")}
                        className="bg-zinc-900 text-white text-[10.5px] py-2 px-4 rounded-xl font-black cursor-pointer hover:bg-black transition-all"
                      >
                        تغيير الرمز السري
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. Privacy settings */}
                {settingsSubSection === 'privacy' && (
                  <div className="space-y-4">
                    <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-150 space-y-3 text-xs font-bold">
                      <div className="flex justify-between items-center py-2.5">
                        <div className="max-w-[80%]">
                          <h5 className="font-extrabold text-zinc-800">السماح بملفات تعريف الارتباط</h5>
                          <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">تتبع التصفح لترشيح أفضل الشاليهات والمسابح التي تفضلها في الجزائر.</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={cookieConsent}
                          onChange={(e) => setCookieConsent(e.target.checked)}
                          className="w-10 h-5 accent-[#ff385c] rounded-lg cursor-pointer shrink-0"
                        />
                      </div>

                      <div className="border-t border-zinc-150/65 my-1" />

                      <div className="flex justify-between items-center py-2.5">
                        <div className="max-w-[80%]">
                          <h5 className="font-extrabold text-zinc-800">تفعيل تحديد الموقع الجغرافي</h5>
                          <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">مشاركة موقعك التقريبي لعرض مزارع وقاعات حفلات قريبة منك للغاية.</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={locationConsent}
                          onChange={(e) => setLocationConsent(e.target.checked)}
                          className="w-10 h-5 accent-[#ff385c] rounded-lg cursor-pointer shrink-0"
                        />
                      </div>
                    </div>

                    <div className="bg-amber-50/50 p-3.5 rounded-2xl border border-rose-100/50 text-[10px] text-zinc-650 leading-relaxed font-bold">
                      تنص المادة القانونية في الجزائر على حماية الهوية الرقمية في كافة تداولات العقار السياحي الكرائي. لا نقوم بنشر معلوماتك مع أي أطراف إشهارية.
                    </div>
                  </div>
                )}

                {/* 4. Notifications selection */}
                {settingsSubSection === 'notifications' && (
                  <div className="space-y-3">
                    <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-150 space-y-4 font-bold text-xs">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="text-zinc-800 font-extrabold">إشعارات التطبيق الفورية</h5>
                          <p className="text-[10px] text-zinc-400 font-medium">استلام رسائل الدردشة والحجوزات مباشرة على هذا الهاتف.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={pushNotifications}
                          onChange={(e) => setPushNotifications(e.target.checked)}
                          className="w-10 h-5 accent-[#ff385c] rounded-lg cursor-pointer shrink-0"
                        />
                      </div>

                      <div className="border-t border-zinc-150/60" />

                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="text-zinc-800 font-extrabold">بريد إلكتروني دوري</h5>
                          <p className="text-[10px] text-zinc-400 font-medium">رسائل إخبارية، عروض ترويجية صيفية، وتقارير الشالي.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={emailNotifications}
                          onChange={(e) => setEmailNotifications(e.target.checked)}
                          className="w-10 h-5 accent-[#ff385c] rounded-lg cursor-pointer shrink-0"
                        />
                      </div>

                      <div className="border-t border-zinc-150/60" />

                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="text-zinc-800 font-extrabold">رسائل نصية SMS قصيرة</h5>
                          <p className="text-[10px] text-zinc-400 font-medium">تأكيدات كود الدفع عبر بريدي موب مباشرة في هاتفك.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={smsNotifications}
                          onChange={(e) => setSmsNotifications(e.target.checked)}
                          className="w-10 h-5 accent-[#ff385c] rounded-lg cursor-pointer shrink-0"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Payments list */}
                {settingsSubSection === 'payments' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-l from-rose-500 to-rose-600 text-white p-5 rounded-2xl space-y-4 shadow-sm text-right">
                      <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-black">الحساب الافتراضي المعتمد</span>
                      <div className="space-y-0.5">
                        <p className="text-[10px] text-white/70 font-bold">بطاقة الدفع الإلكتروني</p>
                        <p className="font-mono text-base font-black tracking-widest">•••• •••• •••• 9845</p>
                      </div>
                      <div className="flex justify-between items-center pt-2 text-[10px]">
                        <span className="font-bold">بريدي موب الجزائر</span>
                        <span className="font-mono font-bold">12/29</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-center py-6 text-zinc-400 text-[11px] font-bold font-sans">
                      <p>لم تفعل حسابات الـ CCP حتى الآن.</p>
                      <button
                        type="button"
                        onClick={() => alert("إضافة وسيلة دفع جديدة ستتوفر قريباً!")}
                        className="text-[#ff385c] font-black underline cursor-pointer hover:text-rose-600 block mt-1"
                      >
                        إضافة بطاقة جديدة
                      </button>
                    </div>
                  </div>
                )}

                {/* 6. Language Selector */}
                {settingsSubSection === 'translation' && (
                  <div className="space-y-4">
                    <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-150 space-y-3">
                      <label className="block text-[11px] font-black text-zinc-800">اختر لغة عرض المنصة وتفاصيل الحجز</label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {(Object.keys(languageNames) as Array<keyof typeof languageNames>).map((lng) => (
                          <button
                            type="button"
                            key={lng}
                            onClick={() => {
                              setLanguage(lng);
                              alert(`تم تغيير لغة المنصة بنجاح إلى: ${languageNames[lng]}`);
                            }}
                            className={`py-3 px-4 text-xs font-black rounded-xl transition-all cursor-pointer ${
                              language === lng 
                              ? 'bg-[#111111] text-white shadow-sm' 
                              : 'bg-white hover:bg-zinc-100/80 text-zinc-705 border border-zinc-200'
                            }`}
                          >
                            {languageNames[lng]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. Booking permissions */}
                {settingsSubSection === 'permissions' && (
                  <div className="space-y-3">
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-150 space-y-2">
                      <h4 className="text-xs font-black text-[#111111]">أذونات الكراء المتبادلة</h4>
                      <p className="text-[10px] text-zinc-450 leading-relaxed font-bold">
                        تسمح أذونات الحجز لمالكي الشاليهات ومكاتب الكراء التنسيق المالي مع ملفك التعريفي ومطابقة أوراق التعريف الجزائرية الموثقة.
                      </p>
                      <p className="text-[10px] text-zinc-400 font-bold italic pt-1 text-rose-500">
                        ✓ جميع الأذونات نشطة لمنح حجز فوري خالٍ من التعقيدات.
                      </p>
                    </div>
                  </div>
                )}

                {/* 8. Business Travel */}
                {settingsSubSection === 'business' && (
                  <div className="space-y-4">
                    <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-150 text-center space-y-3.5">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto border shadow-xs">
                        <Briefcase className="w-5.5 h-5.5 text-zinc-900" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-zinc-900">سجل سفرك لغرض العمل بشكل أفضل</h4>
                        <p className="text-[10px] text-zinc-450 max-w-xs mx-auto leading-relaxed font-bold">
                          اربط بريدك المهني لسهولة تبرير المصارف واستصدار الفواتير الموجهة للشركات وإدارات الموارد البشرية محلياً ودولياً.
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => alert("سيتم تفعيل ربط البريد الإلكتروني للمؤسسات قريباً.")}
                          className="px-5 py-2.5 bg-[#ff385c] hover:bg-rose-600 text-white text-[10.5px] font-black rounded-xl cursor-pointer"
                        >
                          بدء الربط المهني
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 9. Accessibility */}
                {settingsSubSection === 'accessibility' && (
                  <div className="space-y-3 font-bold text-xs" dir="rtl">
                    <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-150 space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5>الخطوط العريضة والمقروءة</h5>
                          <p className="text-[9.5px] text-zinc-400 font-medium">عرض جميع عناوين الشاليهات والأسعار بخطوط سميكة.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-10 h-5 accent-[#ff385c]" />
                      </div>

                      <div className="border-t border-zinc-150/60" />

                      <div className="flex justify-between items-center">
                        <div>
                          <h5>الوصول الشامل</h5>
                          <p className="text-[9.5px] text-zinc-400 font-medium">تفعيل خصائص إمكانية الوصول.</p>
                        </div>
                        <input type="checkbox" className="w-10 h-5 accent-[#ff385c]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'help':
        return (
          <div className="space-y-6" id="profile-subview-help">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setProfileView('main')} className="p-2 hover:bg-zinc-100 rounded-xl transition-colors">
                {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
              </button>
              <h2 className="text-lg font-black text-zinc-900">{t('getHelp')}</h2>
            </div>

            <div className="bg-rose-50/20 p-4 rounded-2xl border border-rose-100/50 space-y-2 text-xs text-zinc-700">
              <p className="font-extrabold text-rose-600">{t('needHelp')}</p>
              <p className="leading-relaxed text-zinc-600">
                مركز المساعدة لشبكة Lacasa الجزائرية متاح لمتابعتكم:
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2 sm:gap-6 text-[10px] text-zinc-600 font-bold">
                <span>📞 رقم الاتصال بالدعم: <strong className="text-rose-600">021 99 88 77</strong></span>
                <span>✉️ البريد فني: <strong className="text-rose-600">support@lacasa.dz</strong></span>
              </div>
            </div>

            <div className="space-y-4" dir="rtl">
              <h3 className="font-black text-xs text-zinc-800">{t('frequentQuestions')}</h3>
              
              <div className="space-y-2">
                {AlgerianFAQs.map((faq, idx) => (
                  <div key={idx} className="border border-zinc-200 rounded-xl overflow-hidden text-xs">
                    <button
                      type="button"
                      onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                      className="w-full text-right p-3 bg-zinc-50 hover:bg-zinc-100/80 transition-colors flex justify-between items-center cursor-pointer"
                    >
                      <span className="font-bold text-zinc-800">{faq.q}</span>
                      <span className="text-rose-500 font-bold">{faqOpen === idx ? '▲' : '▼'}</span>
                    </button>
                    {faqOpen === idx && (
                      <div className="p-3 bg-white text-zinc-650 leading-relaxed border-t border-zinc-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );


      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 pt-5 pb-6 space-y-4 bg-white text-zinc-900 animate-fade-in" id="profile-tab-container" dir="rtl">
      {/* High Quality Header matching Image 3 with proper RTL order */}
      <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
        <h1 className="text-[20px] font-black text-zinc-900 tracking-tight leading-none">
          الملف الشخصي
        </h1>
        <button 
          type="button"
          className="w-9 h-9 hover:bg-zinc-50 rounded-full flex items-center justify-center transition-all cursor-pointer relative active:scale-95 text-zinc-650"
          title="التنبيهات"
        >
          <Bell className="w-4.5 h-4.5 stroke-[2.2px] text-zinc-900" />
          <span className="absolute top-2 left-2.5 w-1.5 h-1.5 bg-[#ff385c] rounded-full" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!activeSubView ? (
          /* Main menu options - Perfectly Flat List matching Screenshot */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Logout prompt in-UI instead of alert popup */}
            <AnimatePresence>
              {showLogoutConfirm && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-zinc-50 text-zinc-900 p-5 rounded-3xl border border-zinc-200 text-center space-y-3 shadow-sm"
                >
                  <p className="text-xs font-black text-zinc-800">هل أنت متأكد من تسجيل خروجك بالكامل؟ سيتم إعادة تهيئة بيانات الحساب المحفوظة.</p>
                  <div className="flex justify-center gap-3">
                    <button onClick={executeLogout} className="bg-[#ff385c] hover:bg-rose-600 text-white font-black text-[10px] py-1.5 px-4 rounded-xl cursor-pointer">
                      تأكيد الخروج
                    </button>
                    <button onClick={() => setShowLogoutConfirm(false)} className="bg-zinc-250 text-zinc-800 hover:bg-zinc-300 font-extrabold text-[10px] py-1.5 px-4 rounded-xl cursor-pointer">
                      إلغاء التراجع
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Flat Menu Options Section 1 */}
            <div className="space-y-0.5">
              {/* 1. Account Settings */}
              <button
                onClick={() => setActiveSubView('settings')}
                className="w-full py-4 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                id="btn-profile-settings"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                    <Settings className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#ff385c] rounded-full" />
                  </div>
                  <span className="text-[13px] font-extrabold text-[#111111]">إعدادات الحساب</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* 2. Get Help */}
              <button
                onClick={() => setActiveSubView('help')}
                className="w-full py-4 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                id="btn-profile-help"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                  </div>
                  <span className="text-[13px] font-extrabold text-[#111111]">اطلب المساعدة</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* 3. View Profile Card */}
              <button
                onClick={() => setActiveSubView('profile_card')}
                className="w-full py-4 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                id="btn-profile-card"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                    <User className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                  </div>
                  <span className="text-[13px] font-extrabold text-[#111111]">عرض الملف الشخصي</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* 4. Privacy */}
              <button
                onClick={() => setActiveSubView('privacy')}
                className="w-full py-4 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                id="btn-profile-privacy"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                    <Hand className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                  </div>
                  <span className="text-[13px] font-extrabold text-[#111111]">الخصوصية</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] transition-transform group-hover:-translate-x-0.5" />
              </button>
            </div>

            {/* Separator Divider */}
            <div className="border-t border-zinc-150 my-1" />

            {/* Flat Menu Options Section 2 */}
            <div className="space-y-0.5">
              {/* 5. Refer a Host */}
              <button
                onClick={() => setActiveSubView('referral')}
                className="w-full py-4 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                id="btn-profile-referral"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                    <Share2 className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                  </div>
                  <span className="text-[13px] font-extrabold text-[#111111]">إحالة مضيف</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* 6. Co-host */}
              <button
                onClick={() => setActiveSubView('cohost')}
                className="w-full py-4 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                id="btn-profile-cohost"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                    <Key className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                  </div>
                  <span className="text-[13px] font-extrabold text-[#111111]">العثور على مضيف مشارك</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* 7. Legal */}
              <button
                onClick={() => setActiveSubView('legal')}
                className="w-full py-4 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group"
                id="btn-profile-legal"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                    <FileText className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                  </div>
                  <span className="text-[13px] font-extrabold text-[#111111]">قانوني</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px] transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* 8. Log Out */}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full py-4 flex items-center justify-between hover:bg-zinc-50/50 px-1 rounded-2xl transition-all cursor-pointer group text-red-500"
                id="btn-profile-logout"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                    <LogOut className="w-5.5 h-5.5 text-zinc-900 stroke-[1.8px]" />
                  </div>
                  <span className="text-[13px] font-extrabold text-red-500">تسجيل الخروج</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-zinc-400 stroke-[2px]" />
              </button>
            </div>

            {/* Pill Hosting Button matching Image 3 precisely */}
            <div className="flex justify-center pt-6">
              <button 
                onClick={() => {
                  alert("جاري الانتقال إلى واجهة استضافة Lacasa...");
                }}
                className="bg-[#111111] hover:bg-black transition-all text-white text-[12.5px] font-black py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>الاستضافة</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Subviews panel (Settings/Help/etc) - Light theme only to avoid unwanted dark styling */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-white w-full border border-zinc-200 rounded-3xl p-4 md:p-5 shadow-xs text-zinc-900"
          >
            {renderSubView()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
