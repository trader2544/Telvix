
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { useEffect } from 'react';

const Hero = () => {
  const navigate = useNavigate();

  const navigateToPortfolio = () => {
    navigate('/portfolio');
  };

  const navigateToQuote = () => {
    navigate('/quote');
  };

  useEffect(() => {
    // Load Wistia script
    const script = document.createElement('script');
    script.src = 'https://fast.wistia.com/assets/external/E-v1.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Wistia Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="wistia_responsive_padding" 
          style={{ padding: '0% 0 0 0', position: 'relative' }}
        >
          <div 
            className="wistia_responsive_wrapper" 
            style={{ height: '100vh', left: 0, position: 'absolute', top: 0, width: '100%' }}
          >
            <iframe
              src="https://fast.wistia.net/embed/iframe/fx86as02vk?autoPlay=true&controlsVisibleOnLoad=false&fullscreenButton=false&muted=true&playButton=false&playbar=false&settingsControl=false&smallPlayButton=false&volumeControl=false&playerColor=14b8a6&loop=true"
              title="Telvix Hero Video"
              allow="autoplay; fullscreen"
              allowFullScreen
              frameBorder="0"
              scrolling="no"
              className="wistia_embed absolute inset-0 w-full h-full object-cover"
              name="wistia_embed"
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.4)'
              }}
            />
          </div>
        </div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-accent/80"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 md:w-72 md:h-72 bg-accent/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="text-center lg:text-left animate-fade-in text-white">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-4 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-xs font-medium">Available for New Projects</span>
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="text-accent">Telvix:</span> Your Gateway to
              <span className="block bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>
            
            <p className="text-sm md:text-lg mb-6 text-white/90 leading-relaxed max-w-2xl">
              From stunning websites to AI-powered automation, SaaS solutions, and mobile apps. 
              We transform your ideas into powerful digital experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
              <Button 
                size="sm" 
                className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 text-sm group shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={navigateToQuote}
              >
                Get Free Quote
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-6 py-3 text-sm backdrop-blur-sm bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={navigateToPortfolio}
              >
                <Play className="mr-2 w-4 h-4" />
                View Portfolio
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 text-center lg:text-left">
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-lg md:text-xl font-bold text-accent">50+</div>
                <div className="text-xs text-white/80">Projects</div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="text-lg md:text-xl font-bold text-accent">95%</div>
                <div className="text-xs text-white/80">Satisfaction</div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="text-lg md:text-xl font-bold text-accent">24/7</div>
                <div className="text-xs text-white/80">Support</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-2xl md:rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
                alt="Digital Innovation" 
                className="relative rounded-2xl md:rounded-3xl shadow-2xl w-full transform group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating Cards */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl animate-bounce-gentle">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-gray-800 font-bold text-sm md:text-base">50+</div>
                    <div className="text-gray-600 text-xs">Projects Delivered</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-accent to-primary text-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl animate-float">
                <div className="text-center">
                  <div className="text-lg md:text-xl font-bold">95%</div>
                  <div className="text-xs opacity-90">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
