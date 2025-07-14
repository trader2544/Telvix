
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Smartphone, Globe, Zap, Shield, TrendingUp, Users, Star, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Services = () => {
  const [selectedService, setSelectedService] = useState('web-development');

  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      icon: Code,
      description: 'Custom websites and web applications built with modern technologies',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile First'],
      price: 'From $2,500',
      duration: '2-4 weeks'
    },
    {
      id: 'mobile-apps',
      title: 'Mobile Applications', 
      icon: Smartphone,
      description: 'Native and cross-platform mobile apps for iOS and Android',
      features: ['Cross Platform', 'Native Performance', 'App Store Ready', 'Push Notifications'],
      price: 'From $5,000',
      duration: '4-8 weeks'
    },
    {
      id: 'saas-solutions',
      title: 'SaaS Solutions',
      icon: Globe,
      description: 'Scalable software-as-a-service platforms and applications',
      features: ['Cloud Infrastructure', 'User Management', 'Payment Integration', 'Analytics'],
      price: 'From $10,000',
      duration: '8-16 weeks'
    },
    {
      id: 'ai-integration',
      title: 'AI Integration',
      icon: Zap,
      description: 'Artificial intelligence and machine learning solutions',
      features: ['Custom AI Models', 'API Integration', 'Data Processing', 'Automation'],
      price: 'From $7,500',
      duration: '6-12 weeks'
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc",
      rating: 5,
      comment: "Exceptional work on our web platform. The team delivered beyond expectations."
    },
    {
      name: "Michael Chen",
      company: "Digital Ventures",
      rating: 5,
      comment: "Professional, timely, and innovative. Our mobile app exceeded all our goals."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary via-primary/90 to-accent text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 md:mb-8 animate-fade-in">
              Our <span className="text-accent">Services</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-4xl mx-auto mb-6 md:mb-8 animate-slide-up">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={selectedService} onValueChange={setSelectedService} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
                {services.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <TabsTrigger key={service.id} value={service.id} className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:inline">{service.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <TabsContent key={service.id} value={service.id}>
                    <Card className="max-w-4xl mx-auto">
                      <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                          <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-2xl">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <CardTitle className="text-3xl">{service.title}</CardTitle>
                        <CardDescription className="text-lg">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-xl font-semibold mb-4">Key Features</h4>
                            <ul className="space-y-2">
                              {service.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-primary" />
                              <span className="font-semibold">Starting at: {service.price}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-primary" />
                              <span>Timeline: {service.duration}</span>
                            </div>
                            <Button className="w-full mt-4">Get Started</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                What Our Clients Say
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-gray-500">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
