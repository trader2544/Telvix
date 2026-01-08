import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const popularPages = [
    { path: "/", label: "Home", icon: Home },
    { path: "/portfolio", label: "Portfolio", icon: Search },
    { path: "/quote", label: "Get Quote", icon: Mail },
    { path: "/#contact", label: "Contact", icon: Phone },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-4 text-center relative z-10"
      >
        <motion.h1 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="text-8xl md:text-9xl font-bold text-muted-foreground/20 mb-4"
        >
          404
        </motion.h1>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>

        <div className="mb-8">
          <Link to="/">
            <Button size="lg" className="group">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Popular Pages</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className="flex flex-col items-center p-4 bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-6 h-6 text-primary mb-2" />
                  <span className="text-sm font-medium text-foreground">{page.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Need Help?</h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="mailto:telvixhr@outlook.com" className="inline-flex items-center gap-2 text-primary hover:underline">
              <Mail className="w-4 h-4" />
              telvixhr@outlook.com
            </a>
            <a href="tel:+254741947599" className="inline-flex items-center gap-2 text-primary hover:underline">
              <Phone className="w-4 h-4" />
              +254 741 947 599
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;