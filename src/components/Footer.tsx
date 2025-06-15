
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        'service_nzx6w0k',
        'template_krkmosf',
        {
          to_email: 'telvixhr@outlook.com',
          from_email: email,
          message: `Newsletter subscription request from: ${email}`,
          subject: 'Newsletter Subscription',
        },
        'sDPnCjZEzOqbAQz7l'
      );

      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivacyClick = () => {
    navigate('/privacy-policy');
  };

  const handleTermsClick = () => {
    navigate('/terms-of-service');
  };

  const handleCookieClick = () => {
    navigate('/cookie-policy');
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20"></div>
      <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 md:w-80 md:h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Company Info */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Telvix
                </h3>
                <p className="text-gray-300 mt-2 leading-relaxed text-xs md:text-sm">
                  Transforming ideas into powerful digital experiences through innovative web solutions and cutting-edge technology.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="text-gray-300 text-xs">telvixhr@outlook.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="text-gray-300 text-xs">+254741947599</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-gray-300 text-xs">Global Remote Services</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4 text-white">Services</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-gray-300 hover:text-accent transition-colors text-xs">Web Development</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-accent transition-colors text-xs">Mobile Apps</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-accent transition-colors text-xs">AI Solutions</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-accent transition-colors text-xs">SaaS Development</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-accent transition-colors text-xs">E-commerce</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-accent transition-colors text-xs">Digital Marketing</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li><a href="/portfolio" className="text-gray-300 hover:text-accent transition-colors text-xs">Portfolio</a></li>
                <li><a href="/careers" className="text-gray-300 hover:text-accent transition-colors text-xs">Careers</a></li>
                <li><a href="#testimonials" className="text-gray-300 hover:text-accent transition-colors text-xs">Testimonials</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-accent transition-colors text-xs">Contact</a></li>
                <li><button onClick={handlePrivacyClick} className="text-gray-300 hover:text-accent transition-colors text-xs text-left">Privacy Policy</button></li>
                <li><button onClick={handleTermsClick} className="text-gray-300 hover:text-accent transition-colors text-xs text-left">Terms of Service</button></li>
                <li><button onClick={handleCookieClick} className="text-gray-300 hover:text-accent transition-colors text-xs text-left">Cookie Policy</button></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4 text-white">Stay Updated</h4>
              <p className="text-gray-300 mb-4 text-xs">
                Subscribe to our newsletter for the latest updates and digital insights.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-accent text-xs h-8"
                  required
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="sm"
                  className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-xs py-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                  <ArrowRight className="ml-2 w-3 h-3" />
                </Button>
              </form>

              {/* Social Links */}
              <div className="flex space-x-3 mt-4">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-gray-400 text-xs">
              Powered by Telvix
            </div>
            
            <div className="flex space-x-4 text-xs">
              <button onClick={handlePrivacyClick} className="text-gray-400 hover:text-accent transition-colors">Privacy</button>
              <button onClick={handleTermsClick} className="text-gray-400 hover:text-accent transition-colors">Terms</button>
              <button onClick={handleCookieClick} className="text-gray-400 hover:text-accent transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
