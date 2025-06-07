
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToPortfolio = () => {
    navigate('/portfolio');
  };

  const navigateToQuote = () => {
    navigate('/quote');
  };

  return (
    <section className="mobile-spacing bg-gradient-to-r from-accent to-accent/80 text-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h2 className="mobile-text-4xl font-bold mb-4">
            Ready to Transform Your <span className="text-white/90">Digital Future?</span>
          </h2>
          
          <p className="text-sm md:text-lg mb-8 text-white/90 leading-relaxed">
            Partner with Telvix for cutting-edge web design, automation, SaaS solutions, and more. 
            Let's bring your vision to life and take your business to the next level.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="sm" 
              className="bg-white text-accent hover:bg-gray-100 font-semibold px-6 py-3 text-sm"
              onClick={navigateToQuote}
            >
              Request a Free Consultation
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-accent font-semibold px-6 py-3 text-sm"
              onClick={navigateToPortfolio}
            >
              View Our Portfolio
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-xs">Free Initial Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-xs">No Long-term Contracts</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-xs">24/7 Support Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
