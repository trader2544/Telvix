import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChoose from '@/components/WhyChoose';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';
import FloatingContactButton from '@/components/FloatingContactButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Performance and Analytics */}
      <PerformanceOptimizer />
      <GoogleAnalytics />
      
      <Header />
      
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <WhyChoose />
        <CTA />
        <Contact />
      </main>
      
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Index;
