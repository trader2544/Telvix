
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, ExternalLink } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "NuchoBlackHatey",
      role: "VPN Platform",
      company: "Security & Privacy",
      content: "A secure, high-speed VPN platform delivering optimized configuration files for private internet access across all devices.",
      logo: "/lovable-uploads/4ec2be6e-7e3b-4e44-b57e-171dc5bd4c10.png",
      link: "http://nuchoblackhatey.ct.ws"
    },
    {
      name: "Elso Boutique",
      role: "E-commerce Platform", 
      company: "Kenyan Craftsmanship",
      content: "Modern e-commerce platform celebrating Kenyan craftsmanship, connecting global shoppers with authentic local artisans.",
      logo: "/lovable-uploads/1ebaad52-dd91-479d-843f-e3352f70739f.png",
      link: "https://elso-atelier.com"
    },
    {
      name: "Kwa Kamande Space",
      role: "Rental Management",
      company: "Property Tech",
      content: "Comprehensive rental management platform streamlining property management for landlords and tenants with automated tools.",
      logo: "/lovable-uploads/75ecb35e-46da-4797-96de-0c0bd5d64bf8.png",
      link: "https://kwakamande.space"
    },
    {
      name: "Paul Rentals",
      role: "Luxury Rentals",
      company: "Premium Service",
      content: "Exclusive platform for luxury car and property rentals in Nairobi, providing VIP service for distinguished clients.",
      logo: "/lovable-uploads/4d656ebd-2524-4973-8f90-ca049f965544.png",
      link: "https://paulrentals.netlify.app"
    }
  ];

  return (
    <section id="testimonials" className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-teal-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-200/20 to-blue-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-teal-100/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl mb-6 shadow-lg">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="mobile-text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Our Portfolio Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
        </div>

        {/* Desktop Testimonials Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group relative bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-3xl overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Card Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <CardContent className="relative p-8 lg:p-10">
                {/* Company Logo */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <img 
                      src={testimonial.logo}
                      alt={`${testimonial.company} logo`}
                      className="relative w-20 h-20 rounded-2xl object-cover shadow-lg transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                {/* Quote */}
                <blockquote className="text-gray-700 leading-relaxed text-sm md:text-base italic text-center mb-8 relative">
                  <div className="absolute -top-4 -left-2 text-4xl text-blue-200 font-serif">"</div>
                  {testimonial.content}
                  <div className="absolute -bottom-8 -right-2 text-4xl text-teal-200 font-serif">"</div>
                </blockquote>
                
                {/* Client Info */}
                <div className="text-center mb-6">
                  <h4 className="font-bold text-gray-900 text-base md:text-lg mb-1">{testimonial.name}</h4>
                  <p className="text-blue-600 font-semibold mb-1 text-sm md:text-base">{testimonial.role}</p>
                  <p className="text-gray-500 text-xs md:text-sm">{testimonial.company}</p>
                </div>

                {/* View Project Button */}
                <div className="text-center">
                  <Button
                    onClick={() => window.open(testimonial.link, '_blank')}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-2 text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </div>

                {/* Mobile App-like Indicator */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Logo Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div className="flex animate-scroll-left">
              {/* First set */}
              {testimonials.map((testimonial, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 mx-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <img 
                      src={testimonial.logo}
                      alt={`${testimonial.company} logo`}
                      className="relative w-16 h-16 rounded-2xl object-cover shadow-lg transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 mx-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <img 
                      src={testimonial.logo}
                      alt={`${testimonial.company} logo`}
                      className="relative w-16 h-16 rounded-2xl object-cover shadow-lg transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
