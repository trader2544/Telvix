import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings, User, LayoutDashboard, Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import telvixLogo from '@/assets/telvix-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();

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

  const navItems = [
    { label: 'Work', action: () => navigate('/portfolio') },
    { label: 'Company', action: () => scrollToSection('why-choose') },
    { label: 'What we do', action: () => navigate('/services') },
    { label: 'Our Insights', action: () => navigate('/blog') },
    { label: 'Careers', action: () => navigate('/careers') },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <motion.button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src={telvixLogo} 
                alt="Telvix Logo" 
                className="h-8 md:h-10 w-auto"
              />
            </motion.button>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => { item.action(); setIsMenuOpen(false); }}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </motion.button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {profile?.role === 'admin' && (
                <Button onClick={() => navigate('/admin')} variant="ghost" size="sm" className="text-sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              )}
              {user && profile?.role !== 'admin' && (
                <Button onClick={() => navigate('/dashboard')} variant="ghost" size="sm" className="text-sm">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              )}
              {user ? (
                <Button onClick={() => navigate('/profile')} variant="ghost" size="sm" className="text-sm">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              ) : (
                <Button onClick={() => navigate('/auth')} variant="ghost" size="sm" className="text-sm">
                  Login
                </Button>
              )}
              <Button 
                onClick={() => navigate('/quote')} 
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 font-medium"
              >
                Start your project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <span className="text-sm font-medium text-foreground/70">Menu</span>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-foreground"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-20 lg:hidden"
          >
            <div className="flex flex-col p-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => { item.action(); setIsMenuOpen(false); }}
                  className="text-left text-2xl font-semibold text-foreground py-4 border-b border-border/30 hover:text-primary transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <div className="pt-6 space-y-3">
                {profile?.role === 'admin' && (
                  <Button onClick={() => { navigate('/admin'); setIsMenuOpen(false); }} variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                )}
                {user && profile?.role !== 'admin' && (
                  <Button onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }} variant="outline" className="w-full justify-start">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                )}
                {user ? (
                  <Button onClick={() => { navigate('/profile'); setIsMenuOpen(false); }} variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                ) : (
                  <Button onClick={() => { navigate('/auth'); setIsMenuOpen(false); }} variant="outline" className="w-full justify-start">
                    Login
                  </Button>
                )}
                <Button 
                  onClick={() => { navigate('/quote'); setIsMenuOpen(false); }}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full"
                >
                  Start your project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
