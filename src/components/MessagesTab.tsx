import React, { useState } from 'react';
import { useApp } from './AppContext';
import { useLanguage } from './LanguageContext';
import { MessageSquare, Send, CheckCheck, Compass, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MessagesTab: React.FC = () => {
  const { messages, sendMessageToHost } = useApp();
  const { t, language } = useLanguage();

  const [activeMessageId, setActiveMessageId] = useState<string | null>(messages[0]?.id || null);
  const [inputText, setInputText] = useState('');
  const [copiedPhoneHost, setCopiedPhoneHost] = useState(false);

  const activeMessage = messages.find((m) => m.id === activeMessageId);

  const triggerPhoneShow = () => {
    setCopiedPhoneHost(true);
    setTimeout(() => setCopiedPhoneHost(false), 4500);
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeMessageId) return;

    sendMessageToHost(activeMessageId, inputText);
    setInputText('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6" id="messages-tab-container">
      {/* Page Title */}
      <div className="border-b border-gold-200/15 dark:border-zinc-805 pb-3 mb-6">
        <h1 className="text-xl font-black text-zinc-900 dark:text-gold-100 flex items-center gap-2">
          <MessageSquare className="w-5.5 h-5.5 text-gold-500" />
          <span>{t('messages')}</span>
        </h1>
        <p className="text-xs text-zinc-400">
          تواصل فوري ومباشر مع مضيفيك في الجزائر لمناقشة ترتيبات السكن والكراء
        </p>
      </div>

      {messages.length === 0 ? (
        /* Empty messages */
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 max-w-sm mx-auto">
          <div className="w-16 h-16 bg-gold-50/50 dark:bg-gold-950/20 rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-gold-450" />
          </div>
          <div className="px-4">
            <h3 className="font-extrabold text-xs text-zinc-850 dark:text-gold-100">{t('noMessages')}</h3>
            <p className="text-[10px] text-zinc-450 mt-1 font-medium lead-relaxed">
              عند حجز أي عقار في Lacasa، ستتمكن من الدردشة مع المضيفين هنا فوراً لتنسيق الاستلام والخدمات.
            </p>
          </div>
        </div>
      ) : (
        /* Chat Dashboard Shell */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white dark:bg-zinc-90 w-full rounded-2xl border border-gold-200/10 dark:border-zinc-800 shadow-sm overflow-hidden min-h-[500px]">
          
          {/* Contacts list */}
          <div className="md:col-span-4 border-b md:border-b-0 md:border-r dark:border-l border-gold-200/15 dark:border-zinc-800 flex flex-col h-full bg-gold-50/5">
            <div className="p-4 border-b border-gold-200/15 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">المحادثات المتاحة</span>
            </div>

            <div className="flex-1 divide-y divide-gold-100/10 dark:divide-zinc-800 overflow-y-auto max-h-[450px]">
              {messages.map((item) => {
                const isActive = item.id === activeMessageId;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveMessageId(item.id)}
                    className={`p-4 gap-3 flex items-start cursor-pointer transition-colors relative ${
                      isActive 
                      ? 'bg-gold-50/40 dark:bg-gold-950/20 text-gold-900 border-r-4 border-gold-500 dark:border-r-0 dark:border-l-4 dark:border-gold-500' 
                      : 'hover:bg-gold-50/15 dark:hover:bg-zinc-800'
                    }`}
                    id={`contact-item-${item.id}`}
                  >
                    <img 
                      src={item.senderAvatar} 
                      alt={item.senderName}
                      className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-gold-200/20"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-xs text-zinc-900 dark:text-gold-200 truncate">
                          {item.senderName}
                        </h4>
                        <span className="text-[9px] text-zinc-400 shrink-0 font-medium">{item.time}</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 truncate mt-1">
                        {item.lastMessage}
                      </p>
                    </div>

                    {item.unread && (
                      <span className="absolute top-1/2 -translate-y-1/2 left-4 w-2 h-2 bg-gold-500 rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Room workspace */}
          <div className="md:col-span-8 flex flex-col h-[500px] justify-between bg-white dark:bg-zinc-900 relative">
            {activeMessage ? (
              <>
                {/* Active Chat Header */}
                <div className="p-4 border-b border-gold-100/10 dark:border-zinc-850 flex items-center justify-between bg-gold-50/10 dark:bg-zinc-800/10">
                  <div className="flex items-center gap-3">
                    <img 
                      src={activeMessage.senderAvatar} 
                      alt={activeMessage.senderName}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-black text-xs text-zinc-900 dark:text-gold-200">
                        {activeMessage.senderName}
                      </h3>
                      <p className="text-[9px] text-gold-600 dark:text-gold-400 flex items-center gap-1 font-bold">
                        <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-ping" />
                        <span>نشط حالياً بالمنصة</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <button 
                      onClick={triggerPhoneShow}
                      className="p-2.5 bg-white hover:bg-gold-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl text-gold-600 transition-all shadow-xs border border-gold-200/15 cursor-pointer active:scale-95"
                      title="اتصال تلفني"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-gold-500" />
                    </button>
                  </div>
                </div>

                {/* Copied Phone custom overlay instead of unsafe browser alerts */}
                <AnimatePresence>
                  {copiedPhoneHost && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-16 left-4 right-4 z-20 bg-gold-950 text-gold-300 p-3 rounded-xl border border-gold-400/25 shadow-md text-xs font-bold text-center flex items-center justify-between"
                    >
                      <span>رقم المضيف للتنسيق الفوري: <b className="text-white">0552 44 91 30</b></span>
                      <span className="text-[10px] bg-gold-900 text-gold-200 py-0.5 px-2 rounded-full">جاهز للاتصال</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Chat Bubbles Scroll List */}
                <div className="flex-1 p-5 space-y-4 overflow-y-auto max-h-[340px] bg-gold-50/5">
                  <div className="text-center">
                    <span className="inline-block text-[9px] font-bold bg-gold-50/40 dark:bg-zinc-800 text-gold-600 py-1 px-3 rounded-full border border-gold-200/10">
                      تأمين مشفر ومحمي بواسطة Lacasa Algérie
                    </span>
                  </div>

                  {activeMessage.conversation.map((msg, index) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div 
                        key={msg.id || index}
                        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] rounded-2xl p-3.5 shadow-xs ${
                          isUser 
                          ? 'bg-zinc-950 text-white rounded-br-none dark:bg-zinc-100 dark:text-zinc-950 ltr:rounded-bl-none ltr:rounded-br-2xl' 
                          : 'bg-white text-zinc-800 rounded-bl-none dark:bg-zinc-800 dark:text-zinc-100 border border-gold-200/10 ltr:rounded-br-none ltr:rounded-bl-2xl shadow-xs'
                        }`}>
                          <p className="text-xs font-medium leading-relaxed whitespace-pre-line">{msg.text}</p>
                          <div className="flex items-center justify-end gap-1 mt-1.5 text-[8px] opacity-75">
                            <span>{msg.time}</span>
                            {isUser && <CheckCheck className="w-3 h-3 text-gold-400" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chat action input bar */}
                <form 
                  onSubmit={handleSubmitMessage}
                  className="p-3 border-t border-gold-200/10 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex gap-2.5 items-center"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t('typeMessage')}
                    className="flex-1 text-xs bg-gold-50/40 dark:bg-zinc-850 text-zinc-800 dark:text-gold-100 px-4 py-3 rounded-xl focus:border-gold-500/25 border border-gold-100/10 outline-none"
                    id="messages-input-field"
                  />
                  <button
                    type="submit"
                    className="gold-gradient-bg hover:opacity-95 text-zinc-950 p-3 rounded-xl shadow-xs transition-all active:scale-95 shrink-0 cursor-pointer"
                    id="messages-send-button"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center h-full text-zinc-400">
                <Compass className="w-10 h-10 text-gold-300 mb-2 animate-pulse" />
                <p className="text-xs font-bold">الرجاء اختيار أحد المضيفين لبدء المحادثة.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
