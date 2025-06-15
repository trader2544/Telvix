
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChoose from '@/components/WhyChoose';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CompetitiveAnalysis from '@/components/CompetitiveAnalysis';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Enhanced semantic HTML structure for SEO */}
      <Header />
      
      <main role="main">
        <Hero />
        
        <Services />
        
        {/* Full-width Competitive Analysis Feature */}
        <section id="competitive-analysis" className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-blue-50" aria-labelledby="competitive-analysis-heading">
          <div className="w-full px-2 sm:px-4 lg:px-6">
            <div className="text-center mb-6 md:mb-8 px-2">
              <h2 id="competitive-analysis-heading" className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
                Know Your Competition 📊
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto px-2">
                Discover what websites exist in your niche and location. Get insights to build something better!
              </p>
            </div>
            <div className="w-full">
              <CompetitiveAnalysis />
            </div>
          </div>
        </section>
        
        <WhyChoose />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
