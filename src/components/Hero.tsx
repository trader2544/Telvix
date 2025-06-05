
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const navigateToPortfolio = () => {
    navigate('/portfolio');
  };

  const navigateToCareers = () => {
    navigate('/careers');
  };

  const navigateToQuote = () => {
    navigate('/quote');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent text-white overflow-hidden pt-28">
      <div className="absolute inset-0 bg-black/5"></div>
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Additional floating elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-white/5 to-accent/10 rounded-full blur-2xl animate-bounce"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-accent/15 to-white/5 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-accent/5 rounded-full blur-2xl animate-float" style={{animationDelay: '3s'}}></div>
      
      {/* Geometric shapes */}
      <div className="absolute top-40 right-1/4 w-6 h-6 bg-white/20 rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
      <div className="absolute bottom-40 left-1/3 w-4 h-4 bg-accent/30 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-3/4 right-20 w-8 h-8 bg-white/15 rotate-12 animate-bounce" style={{animationDelay: '1.5s'}}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium">Available for New Projects</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-accent">Digitel:</span> Your Gateway to
              <span className="block bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed max-w-2xl">
              From stunning websites to AI-powered automation, SaaS solutions, and mobile apps. 
              We transform your ideas into powerful digital experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 text-lg group"
                onClick={navigateToQuote}
              >
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 text-lg backdrop-blur-sm bg-white/10"
                onClick={navigateToPortfolio}
              >
                <Play className="mr-2 w-5 h-5" />
                View Portfolio
              </Button>
            </div>

            {/* New Careers Section */}
            <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex items-center mb-2">
                <span className="text-accent font-semibold">🚀 Join Our Team</span>
              </div>
              <p className="text-sm text-white/80 mb-3">
                We're hiring talented developers from Kenya and Nigeria for exciting freelance projects!
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent hover:text-white font-medium px-4 py-2"
                onClick={navigateToCareers}
              >
                View Opportunities
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-accent">50+</div>
                <div className="text-sm text-white/80">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">95%</div>
                <div className="text-sm text-white/80">Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-white/80">Support</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
                alt="Digital Innovation" 
                className="relative rounded-3xl shadow-2xl w-full transform group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating Cards */}
              <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-bounce-gentle">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-gray-800 font-bold text-lg">50+</div>
                    <div className="text-gray-600 text-sm">Projects Delivered</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-8 -right-8 bg-gradient-to-r from-accent to-primary text-white p-6 rounded-2xl shadow-xl animate-float">
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm opacity-90">Client Satisfaction</div>
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
