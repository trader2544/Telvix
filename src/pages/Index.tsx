
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
      <Header />
      <Hero />
      <Services />
      
      {/* Competitive Analysis Feature */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Know Your Competition 📊
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what websites exist in your niche and location. Get insights to build something better!
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <CompetitiveAnalysis />
          </div>
        </div>
      </section>
      
      <WhyChoose />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
