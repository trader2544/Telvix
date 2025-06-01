
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">Digitel</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('why-choose')} className="text-gray-700 hover:text-primary transition-colors">
              Why Us
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-primary transition-colors">
              Testimonials
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </button>
          </nav>

          <div className="hidden md:flex">
            <Button onClick={() => scrollToSection('contact')} className="bg-accent hover:bg-accent/90">
              Get Free Quote
            </Button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className="text-left text-gray-700 hover:text-primary transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="text-left text-gray-700 hover:text-primary transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('why-choose')} className="text-left text-gray-700 hover:text-primary transition-colors">
                Why Us
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-left text-gray-700 hover:text-primary transition-colors">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 hover:text-primary transition-colors">
                Contact
              </button>
              <Button onClick={() => scrollToSection('contact')} className="bg-accent hover:bg-accent/90 w-full">
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
