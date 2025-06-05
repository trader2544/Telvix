
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
    <section className="py-20 bg-gradient-to-r from-accent to-accent/80 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your <span className="text-white/90">Digital Future?</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed">
            Partner with Digitel for cutting-edge web design, automation, SaaS solutions, and more. 
            Let's bring your vision to life and take your business to the next level.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-accent hover:bg-gray-100 font-semibold px-10 py-4 text-lg"
              onClick={navigateToQuote}
            >
              Request a Free Consultation
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-accent font-semibold px-10 py-4 text-lg"
              onClick={navigateToPortfolio}
            >
              View Our Portfolio
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span>Free Initial Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span>No Long-term Contracts</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span>24/7 Support Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
