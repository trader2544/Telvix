
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

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

  return (
    <>
      {/* KPM Advertisement Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center justify-center space-x-4 text-sm md:text-base">
          <span className="font-semibold">🏠 New: Kenya Property Manager (KPM)</span>
          <span className="hidden md:inline">- Complete rental & property management system with M-Pesa integration</span>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-blue-600 text-xs px-3 py-1"
            onClick={() => window.open('https://kenyapropertymanager.com', '_blank')}
          >
            Learn More <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>

      <header className="fixed top-12 left-0 right-0 z-40 bg-transparent backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button onClick={navigateToHome} className="text-2xl font-bold text-gray-800 hover:text-primary transition-colors">
                Digitel
              </button>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button onClick={navigateToHome} className="text-gray-700 hover:text-primary transition-colors font-medium">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-primary transition-colors font-medium">
                Services
              </button>
              <button onClick={() => scrollToSection('why-choose')} className="text-gray-700 hover:text-primary transition-colors font-medium">
                Why Us
              </button>
              <button onClick={navigateToPortfolio} className="text-gray-700 hover:text-primary transition-colors font-medium">
                Portfolio
              </button>
              <button onClick={navigateToCareers} className="text-gray-700 hover:text-primary transition-colors font-medium">
                Careers
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-primary transition-colors font-medium">
                Contact
              </button>
            </nav>

            <div className="hidden md:flex">
              <Button onClick={() => scrollToSection('contact')} className="bg-accent hover:bg-accent/90 text-white font-semibold">
                Get Free Quote
              </Button>
            </div>

            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-lg">
              <div className="flex flex-col space-y-4 px-4">
                <button onClick={navigateToHome} className="text-left text-gray-700 hover:text-primary transition-colors font-medium">
                  Home
                </button>
                <button onClick={() => scrollToSection('services')} className="text-left text-gray-700 hover:text-primary transition-colors font-medium">
                  Services
                </button>
                <button onClick={() => scrollToSection('why-choose')} className="text-left text-gray-700 hover:text-primary transition-colors font-medium">
                  Why Us
                </button>
                <button onClick={navigateToPortfolio} className="text-left text-gray-700 hover:text-primary transition-colors font-medium">
                  Portfolio
                </button>
                <button onClick={navigateToCareers} className="text-left text-gray-700 hover:text-primary transition-colors font-medium">
                  Careers
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 hover:text-primary transition-colors font-medium">
                  Contact
                </button>
                <Button onClick={() => scrollToSection('contact')} className="bg-accent hover:bg-accent/90 w-full text-white font-semibold">
                  Get Free Quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
