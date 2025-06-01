
const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="mb-6">
              <span className="text-3xl font-bold text-accent">Digitel</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Your trusted digital partner for innovative web solutions, automation, SaaS development, 
              and comprehensive digital marketing strategies.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors cursor-pointer">
                📘
              </div>
              <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors cursor-pointer">
                🐦
              </div>
              <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors cursor-pointer">
                💼
              </div>
              <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors cursor-pointer">
                📷
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3">
              <button onClick={() => scrollToSection('home')} className="block text-gray-300 hover:text-accent transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="block text-gray-300 hover:text-accent transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('why-choose')} className="block text-gray-300 hover:text-accent transition-colors">
                About Us
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="block text-gray-300 hover:text-accent transition-colors">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('contact')} className="block text-gray-300 hover:text-accent transition-colors">
                Contact
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>info@digitelagency.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>+1-555-DIGITEL</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🌍</span>
                <span>Global Services Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Digitel. All rights reserved.
            </div>
            <div className="flex space-x-6 text-gray-400">
              <button className="hover:text-accent transition-colors">Privacy Policy</button>
              <button className="hover:text-accent transition-colors">Terms of Service</button>
              <button className="hover:text-accent transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
