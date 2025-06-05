
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, ArrowRight, Facebook, Twitter, Instagram, LinkedIn } from 'lucide-react';

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Digitel
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  Transforming ideas into powerful digital experiences through innovative web solutions and cutting-edge technology.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <span className="text-gray-300">digitelhr@outlook.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <span className="text-gray-300">+254741947599</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-gray-300">Global Remote Services</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
              <ul className="space-y-3">
                <li><a href="#services" className="text-gray-300 hover:text-accent transition-colors">Web Development</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-accent transition-colors">Mobile Apps</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-accent transition-colors">AI Solutions</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-accent transition-colors">SaaS Development</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-accent transition-colors">E-commerce</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-accent transition-colors">Digital Marketing</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-3">
                <li><a href="/portfolio" className="text-gray-300 hover:text-accent transition-colors">Portfolio</a></li>
                <li><a href="/careers" className="text-gray-300 hover:text-accent transition-colors">Careers</a></li>
                <li><a href="#testimonials" className="text-gray-300 hover:text-accent transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-accent transition-colors">Contact</a></li>
                <li><a href="/privacy-policy" className="text-gray-300 hover:text-accent transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="text-gray-300 hover:text-accent transition-colors">Terms of Service</a></li>
                <li><a href="/cookie-policy" className="text-gray-300 hover:text-accent transition-colors">Cookie Policy</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Stay Updated</h4>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter for the latest updates and digital insights.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-accent"
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90"
                >
                  Subscribe
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <LinkedIn className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              Powered by Digitel
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="/privacy-policy" className="text-gray-400 hover:text-accent transition-colors">Privacy</a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-accent transition-colors">Terms</a>
              <a href="/cookie-policy" className="text-gray-400 hover:text-accent transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
