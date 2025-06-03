
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, Globe, Heart } from 'lucide-react';

const Footer = () => {
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
  };

  const navigateToPortfolio = () => {
    navigate('/portfolio');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="mb-8">
              <span className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Digitel
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-8 max-w-md text-lg">
              Your trusted digital partner for innovative solutions. We transform ideas into powerful 
              digital experiences that drive growth and success.
            </p>
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                <span className="text-white text-lg">📘</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                <span className="text-white text-lg">🐦</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                <span className="text-white text-lg">💼</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                <span className="text-white text-lg">📷</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <div className="space-y-4">
              <button onClick={navigateToHome} className="block text-gray-300 hover:text-accent transition-colors duration-300 text-left">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="block text-gray-300 hover:text-accent transition-colors duration-300 text-left">
                Services
              </button>
              <button onClick={() => scrollToSection('why-choose')} className="block text-gray-300 hover:text-accent transition-colors duration-300 text-left">
                About Us
              </button>
              <button onClick={navigateToPortfolio} className="block text-gray-300 hover:text-accent transition-colors duration-300 text-left">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('contact')} className="block text-gray-300 hover:text-accent transition-colors duration-300 text-left">
                Contact
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300 group">
                <Mail className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-white transition-colors duration-300">digitelhr@outlook.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 group">
                <Phone className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-white transition-colors duration-300">+254741947599</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 group">
                <Globe className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-white transition-colors duration-300">Global Services Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0 flex items-center">
              <span>© {new Date().getFullYear()} Digitel. Made with</span>
              <Heart className="w-4 h-4 text-red-500 mx-1 animate-pulse" />
              <span>for digital innovation.</span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <button className="hover:text-accent transition-colors duration-300">Privacy Policy</button>
              <button className="hover:text-accent transition-colors duration-300">Terms of Service</button>
              <button className="hover:text-accent transition-colors duration-300">Cookie Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
