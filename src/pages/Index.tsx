
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChoose from '@/components/WhyChoose';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CompetitiveAnalysis from '@/components/CompetitiveAnalysis';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SocialIntegration from '@/components/SocialIntegration';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Performance and Analytics Components */}
      <PerformanceOptimizer />
      <GoogleAnalytics />
      
      {/* Enhanced semantic HTML structure for SEO */}
      <Header />
      
      <main role="main">
        <Hero />
        
        <Services />
        
        {/* Full-width Competitive Analysis Feature - Mobile Optimized */}
        <section id="competitive-analysis" className="mobile-spacing bg-gradient-to-br from-gray-50 to-blue-50" aria-labelledby="competitive-analysis-heading">
          <div className="w-full px-3 sm:px-4 lg:px-6">
            <div className="text-center mb-6 md:mb-8 px-2">
              <h2 id="competitive-analysis-heading" className="mobile-text-3xl font-bold text-gray-800 mb-3 md:mb-4 animate-fade-in">
                Know Your Competition 📊
              </h2>
              <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto px-2 animate-fade-in">
                Discover what websites exist in your niche and location. Get insights to build something better!
              </p>
            </div>
            <div className="w-full animate-slide-up">
              <CompetitiveAnalysis />
            </div>
          </div>
        </section>
        
        <WhyChoose />
        <Testimonials />
        <CTA />
        <Contact />
        
        {/* Social Media Integration - Mobile Optimized */}
        <section className="mobile-spacing bg-gray-50" aria-label="Social Media">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 text-center">
            <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-3 md:mb-4 animate-fade-in">Connect With Us</h3>
            <div className="animate-slide-up">
              <SocialIntegration />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
