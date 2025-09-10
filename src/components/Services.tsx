
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Code2, Calendar, ArrowRight } from 'lucide-react';
import webDevelopmentImg from '@/assets/web-development.jpg';
import aiAutomationImg from '@/assets/ai-automation.jpg';
import saasDevelopmentImg from '@/assets/saas-development.jpg';
import ecommerceImg from '@/assets/ecommerce.jpg';
import digitalMarketingImg from '@/assets/digital-marketing.jpg';
import mobileDevelopmentImg from '@/assets/mobile-development.jpg';
import customSoftwareImg from '@/assets/custom-software.jpg';
import uiUxDesignImg from '@/assets/ui-ux-design.jpg';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      image: webDevelopmentImg,
      title: "Web Design & Development",
      description: "Craft responsive, high-performance websites using modern frameworks like React and WordPress for exceptional user experiences.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      image: aiAutomationImg,
      title: "AI & Automation Solutions", 
      description: "Boost efficiency with custom AI integrations, workflow automation, and intelligent tools that streamline your business processes.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      image: saasDevelopmentImg,
      title: "SaaS Development",
      description: "Launch scalable Software-as-a-Service solutions with modern architecture, from rental systems to enterprise platforms.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      image: ecommerceImg,
      title: "E-commerce Solutions",
      description: "Build powerful online stores with Shopify, WooCommerce, or custom platforms designed to maximize sales and engagement.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      image: digitalMarketingImg,
      title: "Digital Marketing & SEO",
      description: "Drive traffic and conversions with data-driven SEO strategies, PPC campaigns, and comprehensive digital marketing.",
      gradient: "from-teal-500 to-blue-500"
    },
    {
      image: mobileDevelopmentImg,
      title: "Mobile App Development",
      description: "Create stunning iOS and Android apps with cross-platform frameworks like Flutter and React Native for maximum reach.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      image: customSoftwareImg,
      title: "Custom Software Development",
      description: "Develop bespoke software solutions tailored to your unique business requirements and operational workflows.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      image: uiUxDesignImg,
      title: "UI/UX Design",
      description: "Design intuitive, visually stunning interfaces that enhance user satisfaction, engagement, and brand recognition.",
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  const handleBookService = (serviceName: string) => {
    navigate(`/quote?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <section id="services" className="mobile-spacing bg-gradient-to-br from-gray-50 via-blue-50/20 to-teal-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 md:w-72 md:h-72 bg-gradient-to-br from-blue-200/20 to-teal-200/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 md:w-80 md:h-80 bg-gradient-to-br from-teal-200/20 to-blue-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div className="text-center mb-6 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-3 md:mb-4 shadow-lg">
            <Code2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h2 className="mobile-text-4xl text-gray-900 mb-3 md:mb-4">
            All Digital Services <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Under One Roof</span>
          </h2>
          <p className="text-xs md:text-lg text-gray-600 max-w-3xl mx-auto">
            From concept to launch, we provide comprehensive digital solutions that drive growth and innovation for your business.
          </p>
        </div>

        {/* Service Cards Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-12">
          {services.map((service, index) => {
            return (
              <Card 
                key={index} 
                className="group relative bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-3 rounded-xl md:rounded-3xl overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl md:rounded-3xl`}></div>
                
                <CardContent className="relative p-3 md:p-6">
                  <div className="mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden shadow-md">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xs md:text-lg font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-primary transition-colors text-center leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed text-center line-clamp-3 mb-3 md:mb-4 hidden md:block">
                    {service.description}
                  </p>
                  <Button
                    onClick={() => handleBookService(service.title)}
                    size="sm"
                    className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white text-xs py-1 md:py-2`}
                  >
                    <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    Book
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm mr-2 md:mr-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
            onClick={() => navigate('/services')}
          >
            View All Services
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/portfolio')}
          >
            View Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
