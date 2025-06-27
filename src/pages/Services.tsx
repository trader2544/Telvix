import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, Bot, Zap, ShoppingBag, TrendingUp, Smartphone, 
  Code2, Palette, Calendar, MapPin, Clock, Star,
  CheckCircle, ArrowRight, Users, Target, Award
} from 'lucide-react';
import { detectUserCurrency, formatCurrency } from '@/utils/currency';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const Services = () => {
  const navigate = useNavigate();
  const [userCurrency, setUserCurrency] = useState('USD');

  useEffect(() => {
    setUserCurrency(detectUserCurrency());
  }, []);

  const services = [
    {
      id: 'web-development',
      icon: Globe,
      title: "Web Design & Development",
      description: "Craft responsive, high-performance websites using modern frameworks like React, Vue, and WordPress for exceptional user experiences.",
      fullDescription: "Our web development team creates stunning, responsive websites that work flawlessly across all devices. We use cutting-edge technologies including React, Vue.js, Next.js, and WordPress to build fast, secure, and SEO-optimized websites.",
      features: [
        "Custom responsive design",
        "SEO optimization",
        "Performance optimization", 
        "Mobile-first approach",
        "CMS integration",
        "E-commerce functionality"
      ],
      basePrice: 1500,
      timeline: "2-6 weeks",
      gradient: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      popular: true
    },
    {
      id: 'ai-automation',
      icon: Bot,
      title: "AI & Automation Solutions", 
      description: "Boost efficiency with custom AI integrations, workflow automation, and intelligent tools that streamline your business processes.",
      fullDescription: "Transform your business with AI-powered automation solutions. We integrate chatbots, workflow automation, data analysis tools, and custom AI solutions that reduce manual work and increase productivity.",
      features: [
        "Custom AI chatbots",
        "Workflow automation",
        "Data analysis & insights",
        "Process optimization",
        "Integration with existing systems",
        "24/7 automated support"
      ],
      basePrice: 2500,
      timeline: "3-8 weeks",
      gradient: "from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'saas-development',
      icon: Zap,
      title: "SaaS Development",
      description: "Launch scalable Software-as-a-Service solutions with modern architecture, from rental systems to enterprise platforms.",
      fullDescription: "Build and launch your SaaS product with our comprehensive development services. We handle everything from architecture design to deployment, ensuring your platform is scalable, secure, and user-friendly.",
      features: [
        "Scalable cloud architecture",
        "User management systems",
        "Payment integration",
        "Multi-tenant architecture",
        "API development",
        "Analytics & reporting"
      ],
      basePrice: 5000,
      timeline: "8-16 weeks",
      gradient: "from-orange-500 to-red-500",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'ecommerce',
      icon: ShoppingBag,
      title: "E-commerce Solutions",
      description: "Build powerful online stores with Shopify, WooCommerce, or custom platforms designed to maximize sales and engagement.",
      fullDescription: "Launch your online store with our comprehensive e-commerce solutions. We create conversion-optimized stores that drive sales, with integrated payment systems, inventory management, and marketing tools.",
      features: [
        "Custom store design",
        "Payment gateway integration",
        "Inventory management",
        "Order tracking system",
        "Marketing automation",
        "Mobile commerce optimization"
      ],
      basePrice: 2000,
      timeline: "4-8 weeks",
      gradient: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'digital-marketing',
      icon: TrendingUp,
      title: "Digital Marketing & SEO",
      description: "Drive traffic and conversions with data-driven SEO strategies, PPC campaigns, and comprehensive digital marketing.",
      fullDescription: "Grow your online presence with our comprehensive digital marketing services. We combine SEO, content marketing, social media, and paid advertising to drive qualified traffic and increase conversions.",
      features: [
        "SEO optimization",
        "Content marketing",
        "Social media management",
        "PPC advertising",
        "Email marketing",
        "Analytics & reporting"
      ],
      basePrice: 800,
      timeline: "Ongoing",
      gradient: "from-teal-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'mobile-apps',
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Create stunning iOS and Android apps with cross-platform frameworks like Flutter and React Native for maximum reach.",
      fullDescription: "Develop native and cross-platform mobile applications that deliver exceptional user experiences. We use Flutter, React Native, and native development to create apps that users love.",
      features: [
        "Cross-platform development",
        "Native iOS & Android apps",
        "UI/UX design",
        "App store optimization",
        "Push notifications",
        "Offline functionality"
      ],
      basePrice: 3500,
      timeline: "6-12 weeks",
      gradient: "from-indigo-500 to-purple-500",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'custom-software',
      icon: Code2,
      title: "Custom Software Development",
      description: "Develop bespoke software solutions tailored to your unique business requirements and operational workflows.",
      fullDescription: "Get custom software solutions built specifically for your business needs. From CRM systems to inventory management, we create software that fits your exact requirements and grows with your business.",
      features: [
        "Custom business logic",
        "Database design",
        "API integrations",
        "User role management",
        "Reporting & analytics",
        "Scalable architecture"
      ],
      basePrice: 4000,
      timeline: "8-20 weeks",
      gradient: "from-pink-500 to-rose-500",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 'ui-ux-design',
      icon: Palette,
      title: "UI/UX Design",
      description: "Design intuitive, visually stunning interfaces that enhance user satisfaction, engagement, and brand recognition.",
      fullDescription: "Create exceptional user experiences with our UI/UX design services. We focus on user-centered design principles to create interfaces that are both beautiful and functional.",
      features: [
        "User research & testing",
        "Wireframing & prototyping",
        "Visual design",
        "Interaction design",
        "Design system creation",
        "Accessibility compliance"
      ],
      basePrice: 1200,
      timeline: "3-6 weeks",
      gradient: "from-amber-500 to-orange-500",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleBookService = (serviceId: string) => {
    navigate(`/quote?service=${encodeURIComponent(serviceId)}`);
  };

  const stats = [
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: Target, value: "1000+", label: "Projects Completed" },
    { icon: Award, value: "99%", label: "Success Rate" },
    { icon: Globe, value: "50+", label: "Countries Served" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-teal-50/30">
      <GoogleAnalytics />
      
      {/* SEO Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Telvix Digital Services",
          "description": "Comprehensive digital solutions including web development, mobile apps, AI automation, and digital marketing services",
          "provider": {
            "@type": "Organization",
            "name": "Telvix Digital Solutions",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Kenya",
              "addressLocality": "Nairobi"
            }
          },
          "areaServed": {
            "@type": "Country",
            "name": "Worldwide"
          },
          "serviceType": services.map(s => s.title)
        })}
      </script>

      <Header />
      
      <main>
        {/* Mobile-Optimized Header Section */}
        <section className="mobile-spacing px-3 sm:px-4 lg:px-6 pt-20">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-4 md:mb-6 shadow-lg animate-bounce-gentle">
              <Code2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            
            <h1 className="mobile-text-4xl text-gray-900 mb-4 md:mb-6 animate-fade-in">
              Complete Digital Services
              <span className="block text-primary mt-2">From Nairobi to the World</span>
            </h1>
            
            <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 animate-fade-in">
              Telvix delivers world-class digital solutions from our headquarters in Nairobi, Kenya. 
              Serving clients globally with cutting-edge technology and innovative approaches.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-8 md:mb-12 animate-fade-in">
              <Badge variant="secondary" className="flex items-center gap-2 text-xs">
                <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                Nairobi, Kenya HQ
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 text-xs">
                <Globe className="w-3 h-3 md:w-4 md:h-4" />
                Global Services
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 text-xs">
                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                24/7 Support
              </Badge>
            </div>

            {/* Mobile-Optimized Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="inline-flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-primary/10 rounded-xl mb-2 md:mb-3">
                      <IconComponent className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mobile-Optimized Services Grid */}
        <section className="mobile-spacing px-3 sm:px-4 lg:px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card 
                    key={service.id}
                    className="group relative bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 rounded-xl md:rounded-3xl overflow-hidden animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {service.popular && (
                      <div className="absolute top-3 md:top-4 right-3 md:right-4 z-10">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                          <Star className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}

                    {/* Service Image */}
                    <div className="relative h-32 md:h-48 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                      
                      {/* Service Icon */}
                      <div className="absolute top-2 md:top-4 left-2 md:left-4">
                        <div className={`w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br ${service.gradient} rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-4 h-4 md:w-6 md:h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-3 md:p-6">
                      <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-primary transition-colors leading-tight">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-3 md:mb-4 leading-relaxed text-xs md:text-sm line-clamp-3">
                        {service.description}
                      </p>

                      {/* Key Features - Mobile Optimized */}
                      <div className="mb-3 md:mb-4 hidden md:block">
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-600">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing and Timeline - Mobile Optimized */}
                      <div className="flex justify-between items-center mb-3 md:mb-4 text-xs md:text-sm">
                        <div>
                          <span className="text-gray-500">Starting from</span>
                          <div className="text-sm md:text-xl font-bold text-primary">
                            {formatCurrency(service.basePrice, userCurrency)}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-gray-500">Timeline</span>
                          <div className="font-semibold text-gray-900 text-xs md:text-sm">
                            {service.timeline}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleBookService(service.id)}
                        size="sm"
                        className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group text-xs md:text-sm py-2 md:py-3`}
                      >
                        <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        Get Quote
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mobile-Optimized CTA Section */}
        <section className="mobile-spacing px-3 sm:px-4 lg:px-6 bg-gradient-to-r from-primary to-accent">
          <div className="container mx-auto text-center">
            <h2 className="mobile-text-3xl text-white mb-4 md:mb-6 animate-fade-in">
              Ready to Transform Your Business?
            </h2>
            <p className="text-sm md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto animate-fade-in">
              Join hundreds of satisfied clients worldwide. Let's discuss your project and bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in">
              <Button 
                size="sm"
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 text-sm"
                onClick={() => navigate('/quote')}
              >
                Get Free Quote
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 text-sm"
                onClick={() => navigate('/portfolio')}
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
