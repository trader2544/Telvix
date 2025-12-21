import { useState } from 'react';
import { Phone, MessageCircle, X, MessagesSquare } from 'lucide-react';

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCall = () => {
    window.open('tel:+254741947599', '_self');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/254741947599', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Options Panel */}
      <div className={`absolute bottom-20 right-0 z-50 transition-all duration-300 ease-out ${
        isOpen 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}>
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden min-w-[240px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-5 py-4">
            <h3 className="text-white font-bold text-lg">Let's Chat! 💬</h3>
            <p className="text-white/90 text-sm">How would you like to connect?</p>
          </div>

          {/* Options */}
          <div className="p-3 space-y-2">
            {/* WhatsApp Option */}
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group border border-green-100 hover:border-green-200 hover:shadow-md"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <span className="font-semibold text-gray-800 block">WhatsApp</span>
                <span className="text-sm text-gray-500">Chat with us instantly</span>
              </div>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            </button>

            {/* Call Option */}
            <button
              onClick={handleCall}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group border border-blue-100 hover:border-blue-200 hover:shadow-md"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <span className="font-semibold text-gray-800 block">Call Us</span>
                <span className="text-sm text-gray-500">Speak to our team</span>
              </div>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">Available 24/7 • Fast Response</p>
          </div>
        </div>
      </div>

      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative z-50 w-16 h-16 rounded-full shadow-2xl transition-all duration-500 ease-out transform hover:scale-110 ${
          isOpen 
            ? 'bg-gray-800 rotate-0' 
            : 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 animate-bounce-gentle'
        }`}
        aria-label="Contact us"
      >
        {/* Ripple effect */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-20 animate-pulse" />
          </>
        )}
        
        {/* Icon */}
        <span className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="w-7 h-7 text-white transition-transform duration-300" />
          ) : (
            <MessagesSquare className="w-7 h-7 text-white transition-transform duration-300" />
          )}
        </span>

        {/* Notification badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse">
            1
          </span>
        )}
      </button>

      {/* Tooltip when closed */}
      {!isOpen && (
        <div className="absolute bottom-full right-0 mb-3 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
            Need help? Chat with us! 👋
            <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingContactButton;
