
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigateToPortfolio = () => {
    navigate('/portfolio');
    setIsMenuOpen(false);
  };

  const navigateToCareers = () => {
    navigate('/careers');
    setIsMenuOpen(false);
  };

  const navigateToHome = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const navigateToQuote = () => {
    navigate('/quote');
    setIsMenuOpen(false);
  };

  const handleCall = () => {
    window.open('tel:+254741947599', '_self');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/254741947599', '_blank');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-12 md:h-16">
            <div className="flex items-center">
              <button onClick={navigateToHome} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <img 
                  src="/lovable-uploads/a4c9ee74-f3ca-47b8-8adb-b4933b0b4f8c.png" 
                  alt="Telvix Logo" 
                  className="h-10 md:h-14 w-auto"
                />
              </button>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <button onClick={navigateToHome} className="text-gray-900 hover:text-primary transition-colors font-medium text-sm">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-900 hover:text-primary transition-colors font-medium text-sm">
                Services
              </button>
              <button onClick={() => scrollToSection('why-choose')} className="text-gray-900 hover:text-primary transition-colors font-medium text-sm">
                Why Us
              </button>
              <button onClick={navigateToPortfolio} className="text-gray-900 hover:text-primary transition-colors font-medium text-sm">
                Portfolio
              </button>
              <button onClick={navigateToCareers} className="text-gray-900 hover:text-primary transition-colors font-medium text-sm">
                Careers
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-900 hover:text-primary transition-colors font-medium text-sm">
                Contact
              </button>
            </nav>

            <div className="hidden md:flex">
              <Button onClick={navigateToQuote} size="sm" className="bg-accent hover:bg-accent/90 text-white font-semibold text-xs px-4 py-2">
                Get Free Quote
              </Button>
            </div>

            <button 
              className="md:hidden text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-3 bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-lg">
              <div className="flex flex-col space-y-3 px-3">
                <button onClick={navigateToHome} className="text-left text-gray-900 hover:text-primary transition-colors font-medium text-sm">
                  Home
                </button>
                <button onClick={() => scrollToSection('services')} className="text-left text-gray-900 hover:text-primary transition-colors font-medium text-sm">
                  Services
                </button>
                <button onClick={() => scrollToSection('why-choose')} className="text-left text-gray-900 hover:text-primary transition-colors font-medium text-sm">
                  Why Us
                </button>
                <button onClick={navigateToPortfolio} className="text-left text-gray-900 hover:text-primary transition-colors font-medium text-sm">
                  Portfolio
                </button>
                <button onClick={navigateToCareers} className="text-left text-gray-900 hover:text-primary transition-colors font-medium text-sm">
                  Careers
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-gray-900 hover:text-primary transition-colors font-medium text-sm">
                  Contact
                </button>
                <Button onClick={navigateToQuote} size="sm" className="bg-accent hover:bg-accent/90 w-full text-white font-semibold text-xs">
                  Get Free Quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Call Icon - positioned on the left */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={handleCall}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Call us"
        >
          <Phone className="w-4 h-4" />
        </button>
      </div>

      {/* WhatsApp Icon - positioned on the right */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default Header;
