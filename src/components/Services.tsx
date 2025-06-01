
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: "🌐",
      title: "Web Design & Development",
      description: "Craft responsive, high-performance websites using modern frameworks (e.g., React, WordPress) for seamless user experiences."
    },
    {
      icon: "🤖",
      title: "Automation Solutions",
      description: "Boost efficiency with custom API integrations, AI-driven tools, and platforms like Zapier or Make for streamlined workflows."
    },
    {
      icon: "⚡",
      title: "Premade SaaS Solutions",
      description: "Launch quickly with scalable SaaS products, like rental systems for real estate, cars, or equipment, tailored to your needs."
    },
    {
      icon: "🛒",
      title: "E-commerce Development",
      description: "Build powerful online stores with Shopify, WooCommerce, or custom platforms to maximize sales and engagement."
    },
    {
      icon: "📈",
      title: "Digital Marketing & SEO",
      description: "Drive traffic and conversions with SEO, PPC, social media marketing, and content strategies."
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description: "Create user-friendly iOS and Android apps with cross-platform frameworks like Flutter or React Native."
    },
    {
      icon: "💻",
      title: "Custom Software Development",
      description: "Develop bespoke software solutions to address unique business challenges and goals."
    },
    {
      icon: "🎨",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
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
