
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const navigateToPortfolio = () => {
    navigate('/portfolio');
  };

  const navigateToQuote = () => {
    navigate('/quote');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <div style={{position:'relative', width:'100%', height:'100%', paddingBottom:'56.250%'}} className="absolute inset-0">
            <iframe 
              allow="fullscreen;autoplay" 
              allowFullScreen 
              height="100%" 
              src="https://streamable.com/e/lmifak?autoplay=1&muted=1" 
              width="100%" 
              style={{border:'none', width:'100%', height:'100%', position:'absolute', left:'0px', top:'0px', overflow:'hidden', filter: 'brightness(0.3)'}}
              className="z-[1]"
            />
          </div>
        </div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-accent/80 z-10"></div>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 md:w-72 md:h-72 bg-accent/20 rounded-full blur-3xl animate-float z-20"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl animate-float z-20" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 bg-accent/10 rounded-full blur-3xl animate-pulse z-20"></div>
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-30">
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
              
              {/* Video Player for demonstration */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <div style={{position:'relative', width:'100%', height:'0px', paddingBottom:'56.250%'}}>
                  <iframe 
                    allow="fullscreen;autoplay" 
                    allowFullScreen 
                    height="100%" 
                    src="https://streamable.com/e/kuoc9r?autoplay=1&muted=1" 
                    width="100%" 
                    style={{border:'none', width:'100%', height:'100%', position:'absolute', left:'0px', top:'0px', overflow:'hidden'}}
                  />
                </div>
              </div>
              
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
