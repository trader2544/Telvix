
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Bot, Zap, ShoppingCart, TrendingUp, Smartphone, Code, Palette } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Design & Development",
      description: "Craft responsive, high-performance websites using modern frameworks (e.g., React, WordPress) for seamless user experiences."
    },
    {
      icon: Bot,
      title: "Automation Solutions", 
      description: "Boost efficiency with custom API integrations, AI-driven tools, and platforms like Zapier or Make for streamlined workflows."
    },
    {
      icon: Zap,
      title: "Premade SaaS Solutions",
      description: "Launch quickly with scalable SaaS products, like rental systems for real estate, cars, or equipment, tailored to your needs."
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Development",
      description: "Build powerful online stores with Shopify, WooCommerce, or custom platforms to maximize sales and engagement."
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing & SEO",
      description: "Drive traffic and conversions with SEO, PPC, social media marketing, and content strategies."
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Create user-friendly iOS and Android apps with cross-platform frameworks like Flutter or React Native."
    },
    {
      icon: Code,
      title: "Custom Software Development",
      description: "Develop bespoke software solutions to address unique business challenges and goals."
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Design intuitive, visually stunning interfaces to enhance user satisfaction and retention."
    }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            All Digital Services Under One Roof
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From concept to launch, we provide comprehensive digital solutions that drive growth and innovation for your business.
          </p>
        </div>

        {/* Desktop/Tablet Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mobile Grid - Smaller Cards */}
        <div className="md:hidden grid grid-cols-2 gap-3 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md animate-slide-up bg-white/90 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4">
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors text-center leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed text-center line-clamp-3">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg mr-4"
            onClick={() => scrollToSection('contact')}
          >
            Explore All Services
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg"
            onClick={() => scrollToSection('contact')}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
