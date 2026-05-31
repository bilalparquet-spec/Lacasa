import React, { useState } from 'react';
import { useApp } from './AppContext';
import { useLanguage } from './LanguageContext';
import { languageNames } from '../translations';
import { UserProfile } from '../types';
import { 
  User, Settings, HelpCircle, Shield, Share2, Scale, 
  LogOut, CheckCircle2, Copy, Globe, ChevronLeft, 
  ChevronRight, ArrowRight, ArrowLeft, Star, Award, Sparkles, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Demo certified legal co-hosts in Algeria
const CO_HOSTS_LIST = [
  { id: 'ch1', name: 'يوسف مزايري', city: 'الجزائر العاصمة', rating: 4.9, bio: 'وكيل عقاري معتمد بخبرة 12 سنة ببلدية سيدي يحيى وحيدرة. إدارة تامة واستقبال السياح.', phone: '0551 11 22 33' },
  { id: 'ch2', name: 'أمين بلحسن', city: 'وهران جبهة البحر', rating: 4.8, bio: 'إدارة شقق فاخرة وإقامات فندقية بالباهية وهران الكبرى مع خدمة النظافة الفندقية الشاملة.', phone: '0560 44 55 66' },
  { id: 'ch3', name: 'كمال جاب الله', city: 'بجاية وتيزي وزو', rating: 4.95, bio: 'متخصص في كراء وإدارة الشاليهات الجبلية والغابية بمنطقة القبائل وتيكجدا.', phone: '0555 77 88 99' },
  { id: 'ch4', name: 'عبد الحميد الهادي', city: 'جيجل الطاهير', rating: 4.75, bio: 'تسيير وتأجير البنغالوهات الشاطئية الصيفية بجيجل وزيامة منصورية قانونياً وسياحياً.', phone: '0770 12 34 88' },
];

export const ProfileTab: React.FC = () => {
  const { userProfile, updateUserProfile, bookings, favorites } = useApp();
  const { t, language, setLanguage } = useLanguage();

  const [activeSubView, setActiveSubView] = useState<string | null>(null);

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
          <div className="space-y-6" id="profile-subview-settings">
            <div className="flex items-center gap-2 border-b pb-3 border-gold-200/15">
              <button onClick={() => setActiveSubView(null)} className="p-1 hover:bg-gold-50 rounded-lg dark:hover:bg-zinc-800 text-gold-600">
                {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
              </button>
              <h2 className="text-lg font-black text-zinc-900 dark:text-gold-205">{t('accountSettings')}</h2>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1">{t('name')}</label>
                  <input 
                    type="text" 
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full text-xs font-bold bg-gold-50/20 dark:bg-zinc-850 text-zinc-850 dark:text-zinc-100 p-3 rounded-xl border border-gold-200/10 focus:border-gold-500/50 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1">{t('email')}</label>
                  <input 
                    type="email" 
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full text-xs font-bold bg-gold-50/20 dark:bg-zinc-850 text-zinc-850 dark:text-zinc-100 p-3 rounded-xl border border-gold-200/10 focus:border-gold-500/50 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1">{t('phone')}</label>
                  <input 
                    type="text" 
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full text-xs font-bold bg-gold-50/20 dark:bg-zinc-850 text-zinc-850 dark:text-zinc-100 p-3 rounded-xl border border-gold-200/10 focus:border-gold-500/50 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1">{t('wilaya')}</label>
                  <input 
                    type="text" 
                    value={profileForm.wilaya}
                    onChange={(e) => setProfileForm({ ...profileForm, wilaya: e.target.value })}
                    className="w-full text-xs font-bold bg-gold-50/20 dark:bg-zinc-850 text-zinc-850 dark:text-zinc-100 p-3 rounded-xl border border-gold-200/10 focus:border-gold-500/50 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 mb-1">{t('bio')}</label>
                <textarea 
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  rows={3}
                  className="w-full text-xs font-bold bg-gold-50/20 dark:bg-zinc-850 text-zinc-850 dark:text-zinc-100 p-3 rounded-xl border border-gold-200/10 focus:border-gold-500/50 outline-none"
                />
              </div>

              {/* Language Changer inside Account Settings */}
              <div className="pt-4 border-t border-gold-200/15 space-y-2">
                <label className="block text-[10px] font-black text-gold-600">{t('changeLanguage')}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(languageNames) as Array<keyof typeof languageNames>).map((lng) => (
                    <button
                      type="button"
                      key={lng}
                      onClick={() => setLanguage(lng)}
                      className={`py-2 px-3 text-[10px] font-black rounded-xl transition-all cursor-pointer ${
                        language === lng 
                        ? 'gold-gradient-bg text-zinc-950 shadow-sm' 
                        : 'bg-gold-50/30 hover:bg-gold-50 dark:bg-zinc-805 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      {languageNames[lng]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="gold-gradient-bg text-zinc-900 font-black text-xs py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('saveChanges')}</span>
              </button>

              {isSaved && (
                <p className="text-xs text-gold-600 flex items-center gap-1 font-bold animate-pulse">
                  <CheckCircle2 className="w-4 h-4" /> {t('saveChanges')}... تم الحفظ والترقية بنجاح!
                </p>
              )}
            </form>
          </div>
        );

      case 'help':
        const AlgerianFAQs = [
          { q: 'كيف أقوم بحجز شاليه أو مسبح عبر Lacasa الجزائر؟', a: 'سهل جداً! تصفح المعروضات في الصفحة الرئيسية، اختر سكنك المفضل كالشاليهات أو المسابح، اضبط تاريخ الدخول والذهاب وعدد الضيوف، ثم اضغط على "احجز الآن". سيتم تأجير العقار فوراً وسيفتح لك محادثة مؤمنة مع المضيف.' },
          { q: 'هل الكراء في طريقتكم قانوني ومضمون؟', a: 'نعم. كل المضيفين والعقارات المعروضة في شبكتنا تخضع للتدقيق والتحقق من الهوية والملكيات للتأكد من سلامتك وقانونيتك التامة بموجب القوانين السياحية للتأجير الفرعي في الجزائر.' },
          { q: 'ما هي طرق الدفع المعتمدة؟', a: 'ندعم حالياً الدفع اليدوي عند الاستلام، والتحويل عبر تطبيق بريدي موب (BaridiMob) لبريد الجزائر بالإضافة إلى حوالات CCP وحساب الدفع الذاتي.' },
          { q: 'كيف تلغى الحجوزات المستعجلة؟', a: 'يمكنك إلغاء أي حجز قادم مجاناً عبر تبويب "الرحلات" بالنقر على زر ملخص الإلغاء لاسترجاع عربونك كاملاً.' },
        ];

        return (
          <div className="space-y-6" id="profile-subview-help">
            <div className="flex items-center gap-2 border-b pb-3 border-gold-200/15">
              <button onClick={() => setActiveSubView(null)} className="p-1 hover:bg-gold-50 rounded-lg dark:hover:bg-zinc-800 text-gold-600">
                {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
              </button>
              <h2 className="text-lg font-black text-zinc-900 dark:text-gold-205">{t('getHelp')}</h2>
            </div>

            <div className="bg-gold-50/40 dark:bg-gold-950/20 p-4 rounded-2xl border border-gold-200/20 space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              <p className="font-extrabold text-gold-700 dark:text-gold-400">{t('needHelp')}</p>
              <p className="leading-relaxed">
                مركز المساعدة لشبكة Lacasa الجزائرية متاح لمتابعتكم:
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2 sm:gap-6 text-[10px] text-zinc-600 dark:text-zinc-400 font-bold">
                <span>📞 رقم الاتصال بالدعم: <strong className="text-gold-600">021 99 88 77</strong></span>
                <span>✉️ البريد فني: <strong className="text-gold-600">support@lacasa.dz</strong></span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-black text-xs text-zinc-800 dark:text-zinc-200">{t('frequentQuestions')}</h3>
              
              <div className="space-y-2">
                {AlgerianFAQs.map((faq, idx) => (
                  <div key={idx} className="border border-gold-200/10 dark:border-zinc-800 rounded-xl overflow-hidden text-xs">
                    <button
                      type="button"
                      onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                      className="w-full text-right p-3 bg-gold-50/5 hover:bg-gold-50/20 dark:hover:bg-zinc-805 transition-colors flex justify-between items-center"
                    >
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">{faq.q}</span>
                      <span className="text-gold-500 font-bold">{faqOpen === idx ? '▲' : '▼'}</span>
                    </button>
                    {faqOpen === idx && (
                      <div className="p-3 bg-white dark:bg-zinc-850 text-zinc-600 dark:text-zinc-350 leading-relaxed border-t border-gold-100/10">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ticket submit form */}
            <form onSubmit={(e) => { e.preventDefault(); setContactSuccess(true); setContactMessage(''); }} className="space-y-3 pt-4 border-t border-gold-200/15">
              <h3 className="font-bold text-xs text-zinc-800 dark:text-zinc-250">إرسال استفسار مباشر لقسم الحجوزات</h3>
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
                placeholder="اكتب تفاصيل مشكلتك أو استفسارك هنا..."
                rows={3}
                className="w-full text-xs bg-gold-50/10 dark:bg-zinc-850 text-zinc-850 dark:text-zinc-100 p-3 rounded-xl border border-gold-200/10 focus:border-gold-500-25 outline-none"
              />
              <button
                type="submit"
                className="gold-gradient-bg text-zinc-950 text-[10px] font-black py-2.5 px-4 rounded-xl cursor-pointer shadow-xs active:scale-95"
              >
                إرسال التذكرة
              </button>
              {contactSuccess && (
                <p className="text-[10px] text-gold-650 flex items-center gap-1.5 font-bold animate-pulse">
                  <CheckCircle2 className="w-4 h-4" /> تم إرسال تذكرتك بنجاح! رقم المتابعة: #{Math.floor(Math.random() * 90000 + 10000)}
                </p>
              )}
            </form>
          </div>
        );

      case 'profile_card':
        return (
          <div className="space-y-6" id="profile-subview-card">
            <div className="flex items-center gap-2 border-b pb-3 border-gold-200/15">
              <button onClick={() => setActiveSubView(null)} className="p-1 hover:bg-gold-50 rounded-lg dark:hover:bg-zinc-800 text-gold-600">
                {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
              </button>
              <h2 className="text-lg font-black text-zinc-900 dark:text-gold-205">{t('viewProfile')}</h2>
            </div>

            {/* Physical Profile Card mockup */}
            <div className="max-w-md mx-auto bg-gradient-to-br from-zinc-950 via-zinc-900 to-gold-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden border border-gold-400/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-black text-lg tracking-widest gold-gradient-text uppercase font-sans">LACASA</h3>
                  <p className="text-[8px] text-gold-300 uppercase tracking-widest leading-none font-bold">ALGERIA GOLD MEMBER</p>
                </div>
                <div className="text-right">
                  <span className="text-[8px] bg-gold-500 text-zinc-950 font-black py-0.5 px-2.5 rounded-full uppercase border border-gold-350/30">VIP MEMBER</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={profileForm.avatar} 
                  alt={profileForm.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-gold-400"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1 flex-1 min-w-0">
                  <h4 className="font-black text-sm truncate">{profileForm.name}</h4>
                  <p className="text-[9px] text-gold-400 flex items-center gap-1 font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>حساب مستكشف سياحي موثق</span>
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-zinc-350 leading-relaxed italic mb-6">
                "{profileForm.bio}"
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 py-3.5 border-t border-gold-200/10 text-center text-xs">
                <div>
                  <p className="text-[9px] text-zinc-400 font-bold">الرحلات</p>
                  <p className="text-sm font-black text-gold-400">{bookings.length}</p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-400 font-bold">المفضلة</p>
                  <p className="text-sm font-black text-gold-400">{favorites.length}</p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-400 font-bold">الرتبة</p>
                  <p className="text-sm font-black text-gold-400 flex items-center justify-center gap-0.5">
                    <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                    <span>ذهبية</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[10px] text-zinc-400 max-w-sm mx-auto">
                هذه بطاقة الهوية الرقمية لـ Lacasa. يتم ترقيتها وتفعيل ميزاتها تلقائياً بناءً على حجوزاتك ومستويات رضا المضيفين.
              </p>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6" id="profile-subview-privacy">
            <div className="flex items-center gap-2 border-b pb-3 border-gold-200/15">
              <button onClick={() => setActiveSubView(null)} className="p-1 hover:bg-gold-50 rounded-lg dark:hover:bg-zinc-800 text-gold-600">
                {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
              </button>
              <h2 className="text-lg font-black text-zinc-900 dark:text-gold-205">{t('privacy')}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 items-start bg-gold-50/20 dark:bg-zinc-805 p-4 rounded-2xl border border-gold-250/10">
                <Shield className="w-5 h-5 text-gold-550 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-black text-xs text-zinc-850 dark:text-gold-100">{t('privacySettings')}</h4>
                  <p className="text-[10px] text-zinc-450 leading-relaxed font-bold">
                    {t('privacyDesc')}
                  </p>
                </div>
              </div>

              {/* Toggles */}
              <div className="divide-y divide-gold-200/10 dark:divide-zinc-800/60 text-xs font-bold">
                <div className="py-4 flex justify-between items-center">
                  <div className="max-w-[80%]">
                    <h5 className="font-extrabold text-zinc-800 dark:text-zinc-200">السماح بملفات تعريف الارتباط الإصدار الفاخر</h5>
                    <p className="text-[10px] text-zinc-400 font-medium mt-0.5">تتبع التصفح لترشيح أفضل الشاليهات والمسابح التي تفضلها في الجزائر العاصمة ووهران.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={cookieConsent}
                    onChange={(e) => setCookieConsent(e.target.checked)}
                    className="w-10 h-5 accent-gold-500 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="py-4 flex justify-between items-center">
                  <div className="max-w-[80%]">
                    <h5 className="font-extrabold text-zinc-800 dark:text-zinc-200">تفعيل تحديد الموقع الجغرافي</h5>
                    <p className="text-[10px] text-zinc-400 font-medium mt-0.5">مشاركة موقعك التقريبي لعرض مزارع وقاعات حفلات قريبة منك للغاية.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={locationConsent}
                    onChange={(e) => setLocationConsent(e.target.checked)}
                    className="w-10 h-5 accent-gold-500 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="bg-amber-50/50 p-4 rounded-2xl border border-gold-300/20 text-[10px] text-gold-805 dark:bg-zinc-800/30 dark:text-zinc-300">
                <p className="font-black mb-1 flex items-center gap-1 text-gold-700">
                  <AlertCircle className="w-4 h-4" /> قانون حماية البيانات رقم 18-07 في الجزائر
                </p>
                <p className="leading-relaxed">
                  تلتزم منصة Lacasa بالكامل بالقانون الجزائري رقم 18-07 المتعلق بحماية الأشخاص الطبيعيين في جبهة معالجة المعطيات ذات الطابع الشخصي. بياناتك آمنة ومحفوظة لتسهيل الكراء السياحي فقط.
                </p>
              </div>
            </div>
          </div>
        );

      case 'referral':
        return (
          <div className="space-y-6" id="profile-subview-referral">
            <div className="flex items-center gap-2 border-b pb-3 border-gold-200/15">
              <button onClick={() => setActiveSubView(null)} className="p-1 hover:bg-gold-50 rounded-lg dark:hover:bg-zinc-800 text-gold-600">
                {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
              </button>
              <h2 className="text-lg font-black text-zinc-900 dark:text-gold-205">{t('referHost')}</h2>
            </div>

            <div className="space-y-4">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gold-50/40 rounded-full flex items-center justify-center mx-auto border border-gold-250/20">
                  <Share2 className="w-7 h-7 text-gold-500" />
                </div>
                <h3 className="font-black text-xs text-zinc-800 dark:text-zinc-100">{t('referredHosts')}</h3>
                <p className="text-[10px] text-zinc-400 max-w-sm mx-auto font-medium leading-relaxed">
                  {t('referredDesc')}
                </p>
              </div>

              {/* Referral Code Copy board */}
              <div className="bg-gold-50/15 dark:bg-zinc-805 p-4 rounded-2xl border border-gold-200/10 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs font-bold">
                <div>
                  <span className="block text-[8px] text-zinc-400 uppercase font-black tracking-widest">{t('referredCode')}</span>
                  <span className="font-mono font-black text-gold-600 dark:text-gold-450 text-xs">
                    LACASA-HOST-REF-{profileForm.phone.replace(/\s+/g, '') || '0550123456'}
                  </span>
                </div>
                <button
                  onClick={handleCopyReferral}
                  className="gold-gradient-bg text-zinc-900 text-[10px] font-black py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all shrink-0 active:scale-95 cursor-pointer"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-zinc-900" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'تم النسخ!' : 'نسخ الرمز'}</span>
                </button>
              </div>

              {/* stats */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
                <div className="p-3 border border-gold-200/10 rounded-xl bg-gold-50/5">
                  <p className="text-zinc-400 text-[9px]">المسجلون</p>
                  <p className="text-zinc-800 dark:text-zinc-200 mt-1">3 أصدقاء</p>
                </div>
                <div className="p-3 border border-gold-200/10 rounded-xl bg-gold-50/5">
                  <p className="text-zinc-400 text-[9px]">مكتمل الحجز</p>
                  <p className="text-zinc-800 dark:text-zinc-200 mt-1">1 مضيف</p>
                </div>
                <div className="p-3 border border-gold-200/10 rounded-xl bg-gold-50/5">
                  <p className="text-zinc-400 text-[9px]">عائدات الأرباح</p>
                  <p className="text-gold-550 font-black mt-1">10,000 دج</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cohost':
        return (
          <div className="space-y-6" id="profile-subview-cohost">
            <div className="flex items-center gap-2 border-b pb-3 border-gold-200/15">
              <button onClick={() => setActiveSubView(null)} className="p-1 hover:bg-gold-50 rounded-lg dark:hover:bg-zinc-800 text-gold-600">
                {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
              </button>
              <h2 className="text-lg font-black text-zinc-900 dark:text-gold-205">{t('findCoHost')}</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gold-50/30 p-4 rounded-2xl text-xs text-zinc-750 dark:bg-zinc-850 dark:text-zinc-350 border border-gold-200/10">
                <h4 className="font-extrabold text-xs text-gold-700 dark:text-gold-450 mb-1">
                  {t('legalCoHostTitle')}
                </h4>
                <p className="leading-relaxed font-bold">
                  {t('legalCoHostDesc')}
                </p>
              </div>

              {/* Applied successfully status toast */}
              <AnimatePresence>
                {requestedCoHostName && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 bg-gold-950 text-gold-300 rounded-xl text-[10px] font-black text-center"
                  >
                    تم إرسال طلب تعاون قانوني إلى المضيف المشترك ({requestedCoHostName}). سيتواصل معك قريباً تلفونياً لتأكيد شروط الكراء!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Co-hosts directories */}
              <div className="space-y-3.5">
                {CO_HOSTS_LIST.map((co) => (
                  <div 
                    key={co.id}
                    className="p-4 border border-gold-200/10 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 space-y-2.5 shadow-xs"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-black text-xs text-zinc-900 dark:text-gold-200">{co.name}</h4>
                        <span className="inline-block text-[10px] text-gold-600 bg-gold-50 dark:bg-gold-950/20 font-bold py-0.5 px-2 rounded-md mt-1">
                          📍 {co.city}
                        </span>
                      </div>
                      <span className="flex items-center gap-0.5 font-bold text-gold-500 text-xs">
                        <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                        <span>{co.rating}</span>
                      </span>
                    </div>

                    <p className="text-[10px] text-zinc-400 font-bold leading-relaxed">{co.bio}</p>

                    <div className="flex justify-between items-center pt-2.5 border-t border-gold-200/10 text-[10px] font-bold">
                      <span className="text-zinc-500">📞 {co.phone}</span>
                      <button
                        onClick={() => handleCoHostRequest(co.name)}
                        className="gold-gradient-bg text-zinc-950 font-black py-1.5 px-3 rounded-lg text-[9px] cursor-pointer shadow-xs active:scale-95"
                      >
                        طلب تعاون
                      </button>
                    </div>
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
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-8 animate-fade-in" id="profile-tab-container">
      <AnimatePresence mode="wait">
        {!activeSubView ? (
          /* Main menu options */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* User Profile Overview */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-gold-50/20 to-gold-100/5 dark:from-zinc-900/40 dark:to-zinc-900/10 p-5 rounded-3xl border border-gold-200/25 dark:border-zinc-800 shadow-xs">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-gold-400 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <h2 className="text-base font-black text-zinc-900 dark:text-gold-205">{userProfile.name}</h2>
                <p className="text-[10px] text-zinc-400 font-mono tracking-tight">{userProfile.email}</p>
                <span className="inline-block text-[9px] bg-gold-50 dark:bg-gold-950/30 text-gold-650 dark:text-gold-300 font-black py-0.5 px-2.5 rounded-full border border-gold-200/30">
                  مستكشف في {userProfile.wilaya}
                </span>
              </div>
            </div>

            {/* Logout prompt in-UI instead of alert popup */}
            <AnimatePresence>
              {showLogoutConfirm && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-gold-950 text-gold-100 p-5 rounded-3xl border border-gold-400/20 text-center space-y-3 shadow-md"
                >
                  <p className="text-xs font-black">هل أنت متأكد من تسجيل خروجك بالكامل؟ سيتم إعادة تهيئة بيانات الحساب المحفوظة.</p>
                  <div className="flex justify-center gap-3">
                    <button onClick={executeLogout} className="bg-red-650 text-white font-black text-[10px] py-1.5 px-4 rounded-xl hover:bg-red-700 cursor-pointer">
                      تأكيد الخروج
                    </button>
                    <button onClick={() => setShowLogoutConfirm(false)} className="bg-gold-800 text-gold-200 font-extrabold text-[10px] py-1.5 px-4 rounded-xl cursor-pointer">
                      إلغاء التراجع
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Profile Action Menu Accordion */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gold-200/15 dark:border-zinc-800 shadow-xs divide-y divide-gold-100/10 dark:divide-zinc-800/60 overflow-hidden">
              
              {/* 1. Account Settings */}
              <button
                onClick={() => setActiveSubView('settings')}
                className="w-full p-4 flex items-center justify-between text-zinc-850 dark:text-zinc-100 hover:bg-gold-50/15 dark:hover:bg-zinc-805 transition-colors cursor-pointer"
                id="btn-profile-settings"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gold-500" />
                  <span className="text-xs font-black">{t('accountSettings')}</span>
                </div>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4 text-zinc-400" /> : <ChevronRight className="w-4 h-4 text-zinc-400" />}
              </button>

              {/* 2. Get Help */}
              <button
                onClick={() => setActiveSubView('help')}
                className="w-full p-4 flex items-center justify-between text-zinc-850 dark:text-zinc-100 hover:bg-gold-50/15 dark:hover:bg-zinc-805 transition-colors cursor-pointer"
                id="btn-profile-help"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gold-500" />
                  <span className="text-xs font-black">{t('getHelp')}</span>
                </div>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4 text-zinc-400" /> : <ChevronRight className="w-4 h-4 text-zinc-400" />}
              </button>

              {/* 3. View Profile */}
              <button
                type="button"
                onClick={() => setActiveSubView('profile_card')}
                className="w-full p-4 flex items-center justify-between text-zinc-850 dark:text-zinc-100 hover:bg-gold-50/15 dark:hover:bg-zinc-805 transition-colors cursor-pointer"
                id="btn-profile-card"
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gold-500" />
                  <span className="text-xs font-black">{t('viewProfile')}</span>
                </div>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4 text-zinc-400" /> : <ChevronRight className="w-4 h-4 text-zinc-400" />}
              </button>

              {/* 4. Privacy */}
              <button
                onClick={() => setActiveSubView('privacy')}
                className="w-full p-4 flex items-center justify-between text-zinc-850 dark:text-zinc-100 hover:bg-gold-50/15 dark:hover:bg-zinc-805 transition-colors cursor-pointer"
                id="btn-profile-privacy"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gold-500" />
                  <span className="text-xs font-black">{t('privacy')}</span>
                </div>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4 text-zinc-400" /> : <ChevronRight className="w-4 h-4 text-zinc-400" />}
              </button>

              {/* 5. Refer a Host */}
              <button
                onClick={() => setActiveSubView('referral')}
                className="w-full p-4 flex items-center justify-between text-zinc-850 dark:text-zinc-100 hover:bg-gold-50/15 dark:hover:bg-zinc-805 transition-colors cursor-pointer"
                id="btn-profile-referral"
              >
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-gold-500" />
                  <span className="text-xs font-black">{t('referHost')}</span>
                </div>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4 text-zinc-400" /> : <ChevronRight className="w-4 h-4 text-zinc-400" />}
              </button>

              {/* 6. Find a Certified Co-Host Legally */}
              <button
                onClick={() => setActiveSubView('cohost')}
                className="w-full p-4 flex items-center justify-between text-zinc-850 dark:text-zinc-100 hover:bg-gold-50/15 dark:hover:bg-zinc-805 transition-colors cursor-pointer"
                id="btn-profile-cohost"
              >
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-gold-500" />
                  <span className="text-xs font-black">{t('findCoHost')}</span>
                </div>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4 text-zinc-400" /> : <ChevronRight className="w-4 h-4 text-zinc-400" />}
              </button>

              {/* 7. Log out */}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full p-4 flex items-center justify-between text-red-650 hover:bg-red-50/30 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                id="btn-profile-logout"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 animate-pulse" />
                  <span className="text-xs font-black">{t('logout')}</span>
                </div>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>

            {/* Application Version */}
            <div className="text-center text-[10px] text-zinc-400 flex flex-col gap-0.5 justify-center font-bold">
              <span>{t('appVersion')} 1.0.0</span>
              <span>© {new Date().getFullYear()} Lacasa Algeria. كل الحقوق محفوظة.</span>
            </div>
          </motion.div>
        ) : (
          /* Subviews panel (Settings/Help/etc) */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-white dark:bg-zinc-90 w-full border border-gold-200/15 dark:border-zinc-800 rounded-3xl p-5 md:p-6 shadow-xs"
          >
            {renderSubView()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
