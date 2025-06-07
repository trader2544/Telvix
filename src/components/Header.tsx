
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

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

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button onClick={navigateToHome} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img 
                src="/lovable-uploads/a62654f0-a94f-466a-a34a-95214d1db9e4.png" 
                alt="Telvix Logo" 
                className="h-8 w-auto"
              />
            </button>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button onClick={navigateToHome} className="text-gray-900 hover:text-primary transition-colors font-medium">
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-900 hover:text-primary transition-colors font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection('why-choose')} className="text-gray-900 hover:text-primary transition-colors font-medium">
              Why Us
            </button>
            <button onClick={navigateToPortfolio} className="text-gray-900 hover:text-primary transition-colors font-medium">
              Portfolio
            </button>
            <button onClick={navigateToCareers} className="text-gray-900 hover:text-primary transition-colors font-medium">
              Careers
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-900 hover:text-primary transition-colors font-medium">
              Contact
            </button>
          </nav>

          <div className="hidden md:flex">
            <Button onClick={navigateToQuote} className="bg-accent hover:bg-accent/90 text-white font-semibold">
              Get Free Quote
            </Button>
          </div>

          <button 
            className="md:hidden text-gray-900"
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
              <button onClick={navigateToHome} className="text-left text-gray-900 hover:text-primary transition-colors font-medium">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="text-left text-gray-900 hover:text-primary transition-colors font-medium">
                Services
              </button>
              <button onClick={() => scrollToSection('why-choose')} className="text-left text-gray-900 hover:text-primary transition-colors font-medium">
                Why Us
              </button>
              <button onClick={navigateToPortfolio} className="text-left text-gray-900 hover:text-primary transition-colors font-medium">
                Portfolio
              </button>
              <button onClick={navigateToCareers} className="text-left text-gray-900 hover:text-primary transition-colors font-medium">
                Careers
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-gray-900 hover:text-primary transition-colors font-medium">
                Contact
              </button>
              <Button onClick={navigateToQuote} className="bg-accent hover:bg-accent/90 w-full text-white font-semibold">
                Get Free Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
