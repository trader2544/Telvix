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
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 safe-top"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            {/* Logo - MEGA BIG */}
            <motion.button 
              onClick={() => navigate('/')}
              className="flex items-center group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src={telvixLogo} 
                alt="Telvix Logo" 
                className="h-16 md:h-20 lg:h-24 w-auto"
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

            {/* Mobile Menu Button - App-like */}
            <div className="flex lg:hidden items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 rounded-2xl bg-muted/50 active:bg-muted text-foreground transition-all"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - App-like Full Screen */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background lg:hidden safe-top"
          >
            {/* Header area padding */}
            <div className="h-20" />
            
            {/* Navigation Items - App-like grid */}
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => { item.action(); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-4 text-lg font-medium text-foreground rounded-2xl active:bg-muted hover:bg-muted/50 transition-colors flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.label}
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              ))}
            </div>
            
            {/* Divider */}
            <div className="mx-4 h-px bg-border" />
            
            {/* Action Buttons - App-like */}
            <div className="px-4 py-6 space-y-2">
              {profile?.role === 'admin' && (
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => { navigate('/admin'); setIsMenuOpen(false); }} 
                  className="w-full px-4 py-4 rounded-2xl bg-muted/50 text-foreground font-medium flex items-center gap-3 active:bg-muted"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  Admin Panel
                </motion.button>
              )}
              {user && profile?.role !== 'admin' && (
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }} 
                  className="w-full px-4 py-4 rounded-2xl bg-muted/50 text-foreground font-medium flex items-center gap-3 active:bg-muted"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-primary" />
                  </div>
                  My Dashboard
                </motion.button>
              )}
              {user ? (
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => { navigate('/profile'); setIsMenuOpen(false); }} 
                  className="w-full px-4 py-4 rounded-2xl bg-muted/50 text-foreground font-medium flex items-center gap-3 active:bg-muted"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-accent-foreground" />
                  </div>
                  My Profile
                </motion.button>
              ) : (
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => { navigate('/auth'); setIsMenuOpen(false); }} 
                  className="w-full px-4 py-4 rounded-2xl bg-muted/50 text-foreground font-medium flex items-center gap-3 active:bg-muted"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  Login / Register
                </motion.button>
              )}
              
              {/* Primary CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="pt-4"
              >
                <Button 
                  onClick={() => { navigate('/quote'); setIsMenuOpen(false); }}
                  className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl text-lg font-semibold shadow-lg shadow-primary/30"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
