
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Globe, Bot, Zap, ShoppingBag, TrendingUp, Smartphone, Code2, Palette, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Globe,
      title: "Web Design & Development",
      description: "Craft responsive, high-performance websites using modern frameworks like React and WordPress for exceptional user experiences.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Bot,
      title: "AI & Automation Solutions", 
      description: "Boost efficiency with custom AI integrations, workflow automation, and intelligent tools that streamline your business processes.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "SaaS Development",
      description: "Launch scalable Software-as-a-Service solutions with modern architecture, from rental systems to enterprise platforms.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: ShoppingBag,
      title: "E-commerce Solutions",
      description: "Build powerful online stores with Shopify, WooCommerce, or custom platforms designed to maximize sales and engagement.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing & SEO",
      description: "Drive traffic and conversions with data-driven SEO strategies, PPC campaigns, and comprehensive digital marketing.",
      gradient: "from-teal-500 to-blue-500"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Create stunning iOS and Android apps with cross-platform frameworks like Flutter and React Native for maximum reach.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Code2,
      title: "Custom Software Development",
      description: "Develop bespoke software solutions tailored to your unique business requirements and operational workflows.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Design intuitive, visually stunning interfaces that enhance user satisfaction, engagement, and brand recognition.",
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  const handleBookService = (serviceName: string) => {
    navigate(`/quote?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/50">
      <Header />
      
      <main className="pt-16">
        {/* Services Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/20 to-teal-50/30 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 md:w-72 md:h-72 bg-gradient-to-br from-blue-200/20 to-teal-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 md:w-80 md:h-80 bg-gradient-to-br from-teal-200/20 to-blue-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>

          <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
            <div className="text-center mb-6 md:mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-3 md:mb-4 shadow-lg">
                <Code2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
                All Digital Services <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Under One Roof</span>
              </h2>
              <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
                From concept to launch, we provide comprehensive digital solutions that drive growth and innovation for your business.
              </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card 
                    key={index} 
                    className="group relative bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 rounded-3xl overflow-hidden animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Gradient Border Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    <CardContent className="relative p-6">
                      <div className="mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                        <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors text-center leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed text-center line-clamp-3 mb-4">
                        {service.description}
                      </p>
                      <Button
                        onClick={() => handleBookService(service.title)}
                        className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white`}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Service
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
