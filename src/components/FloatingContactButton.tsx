import { useState } from 'react';
import { Phone, X, Send, MessageCircle, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const handleWhatsApp = () => {
    window.open('https://wa.me/254741947599?text=Hello! I am interested in your services.', '_blank');
  };

  const handleTelegram = () => {
    window.open('https://t.me/telvixtech', '_blank');
  };

  const handleWeChat = () => {
    window.open('weixin://dl/chat?telvixtech', '_blank');
  };

  const handleDiscord = () => {
    window.open('https://discord.gg/telvix', '_blank');
  };

  const handleCall = () => {
    window.open('tel:+254741947599', '_self');
  };

  const handleSendLiveChat = () => {
    if (chatMessage.trim()) {
      // Open WhatsApp with the message
      window.open(`https://wa.me/254741947599?text=${encodeURIComponent(chatMessage)}`, '_blank');
      setChatMessage('');
      setShowLiveChat(false);
    }
  };

  const contactOptions = [
    {
      name: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100',
      borderColor: 'border-green-200',
      onClick: handleWhatsApp,
      status: 'Online'
    },
    {
      name: 'Telegram',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      color: 'from-blue-400 to-blue-600',
      bgColor: 'from-blue-50 to-sky-50 hover:from-blue-100 hover:to-sky-100',
      borderColor: 'border-blue-200',
      onClick: handleTelegram,
      status: 'Available'
    },
    {
      name: 'WeChat',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.49.49 0 0 1 .176-.553c1.527-1.123 2.52-2.783 2.52-4.628 0-3.391-3.03-6.116-7.078-6.116zm-2.886 3.63c.535 0 .969.44.969.983a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.983.969-.983zm5.422 0c.535 0 .969.44.969.983a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.983.969-.983z"/>
        </svg>
      ),
      color: 'from-green-400 to-green-600',
      bgColor: 'from-green-50 to-lime-50 hover:from-green-100 hover:to-lime-100',
      borderColor: 'border-green-200',
      onClick: handleWeChat,
      status: 'Scan QR'
    },
    {
      name: 'Discord',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
        </svg>
      ),
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100',
      borderColor: 'border-indigo-200',
      onClick: handleDiscord,
      status: 'Join Server'
    },
    {
      name: 'Call Us',
      icon: <Phone className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100',
      borderColor: 'border-orange-200',
      onClick: handleCall,
      status: 'Available'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => { setIsOpen(false); setShowLiveChat(false); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Main Panel */}
      <AnimatePresence>
        {isOpen && !showLiveChat && (
          <motion.div 
            className="absolute bottom-20 right-0 z-50"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden w-[300px]">
              {/* Header with Avatar */}
              <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-5 py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-20" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Hi there! 👋</h3>
                    <p className="text-white/80 text-sm">How can we help you?</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 relative z-10">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/90 text-xs">We typically reply in minutes</span>
                </div>
              </div>

              {/* Live Chat Button */}
              <div className="p-4 border-b border-gray-100">
                <button
                  onClick={() => setShowLiveChat(true)}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Start Live Chat</span>
                </button>
              </div>

              {/* Contact Options */}
              <div className="p-3 space-y-2 max-h-[280px] overflow-y-auto">
                <p className="text-xs text-muted-foreground px-2 mb-2">Or connect via:</p>
                {contactOptions.map((option, index) => (
                  <motion.button
                    key={option.name}
                    onClick={option.onClick}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r ${option.bgColor} transition-all duration-300 group border ${option.borderColor} hover:shadow-md`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center shadow-md text-white group-hover:scale-110 transition-transform duration-300`}>
                      {option.icon}
                    </div>
                    <div className="text-left flex-1">
                      <span className="font-semibold text-gray-800 text-sm block">{option.name}</span>
                      <span className="text-xs text-gray-500">{option.status}</span>
                    </div>
                    <Send className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">Available 24/7 • Fast Response ⚡</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Chat Panel */}
      <AnimatePresence>
        {showLiveChat && (
          <motion.div 
            className="absolute bottom-20 right-0 z-50"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden w-[320px]">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 px-5 py-4 flex items-center gap-3">
                <button 
                  onClick={() => setShowLiveChat(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm">Telvix Support</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/80 text-xs">Online</span>
                  </div>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="p-4 h-[200px] bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-md shadow-sm max-w-[200px]">
                    <p className="text-sm text-gray-700">Hi! 👋 How can we help you today? Type your message below.</p>
                    <span className="text-xs text-gray-400 mt-1 block">Just now</span>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendLiveChat()}
                    className="flex-1 px-4 py-3 rounded-full bg-gray-100 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    onClick={handleSendLiveChat}
                    disabled={!chatMessage.trim()}
                    className="w-11 h-11 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white flex items-center justify-center hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.button
        onClick={() => { setIsOpen(!isOpen); setShowLiveChat(false); }}
        className={`relative z-50 w-16 h-16 rounded-full shadow-2xl transition-colors duration-500 ${
          isOpen 
            ? 'bg-gray-800' 
            : 'bg-gradient-to-br from-primary via-primary/90 to-primary/80'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact us"
      >
        {/* Ripple effects */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/40 to-primary/20 animate-pulse" />
          </>
        )}
        
        {/* Icon */}
        <motion.span 
          className="relative flex items-center justify-center"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <div className="relative">
              <User className="w-7 h-7 text-white" />
              <MessageCircle className="w-4 h-4 text-white absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5" />
            </div>
          )}
        </motion.span>

        {/* Notification badge */}
        {!isOpen && (
          <motion.span 
            className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✓
          </motion.span>
        )}
      </motion.button>

      {/* Floating tooltip */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            className="absolute bottom-20 right-0 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-xl shadow-lg whitespace-nowrap">
              Chat with us! 💬
              <div className="absolute top-full right-6 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingContactButton;