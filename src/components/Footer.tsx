import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, ArrowRight, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import telvixLogo from '@/assets/telvix-logo.png';

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

  const footerLinks = {
    services: [
      { label: 'Web Development', href: '/services' },
      { label: 'Mobile Apps', href: '/services' },
      { label: 'AI Solutions', href: '/services' },
      { label: 'SaaS Development', href: '/services' },
      { label: 'E-commerce', href: '/services' },
    ],
    company: [
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/#contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="py-16 md:py-24">
          {/* Top Section */}
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            {/* Left - Brand & Newsletter */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Let's build something{' '}
                <span className="text-primary">amazing</span> together.
              </h3>
              <p className="text-background/60 mb-8 max-w-md leading-relaxed">
                Subscribe to our newsletter for the latest updates, insights, and digital trends.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/40 rounded-full px-6"
                  required
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 rounded-full px-6"
                  disabled={isLoading}
                >
                  {isLoading ? '...' : <ArrowRight className="w-5 h-5" />}
                </Button>
              </form>
            </div>

            {/* Right - Contact Info */}
            <div className="lg:text-right">
              <div className="space-y-4">
                <a href="mailto:telvixhr@outlook.com" className="flex items-center lg:justify-end gap-3 text-background/80 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>telvixhr@outlook.com</span>
                </a>
                <a href="tel:+254741947599" className="flex items-center lg:justify-end gap-3 text-background/80 hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>+254 741 947 599</span>
                </a>
                <div className="flex items-center lg:justify-end gap-3 text-background/60">
                  <MapPin className="w-5 h-5" />
                  <span>Global Remote Services</span>
                </div>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-background/10">
            <div>
              <h4 className="font-semibold text-background mb-4">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-background/60 hover:text-primary transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-background mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-background/60 hover:text-primary transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-background mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-background/60 hover:text-primary transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-background mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-background/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <img 
                  src={telvixLogo} 
                  alt="Telvix" 
                  className="h-8 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-background/40 text-sm">
                © {new Date().getFullYear()} Telvix. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
