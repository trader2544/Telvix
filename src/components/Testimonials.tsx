
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
      logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=100&h=100&q=80",
      link: "http://nuchoblackhatey.ct.ws"
    },
    {
      name: "Elso Boutique",
      role: "E-commerce Platform", 
      company: "Kenyan Craftsmanship",
      content: "Modern e-commerce platform celebrating Kenyan craftsmanship, connecting global shoppers with authentic local artisans.",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=100&h=100&q=80",
      link: "https://elso-atelier.com"
    },
    {
      name: "Kwa Kamande Space",
      role: "Rental Management",
      company: "Property Tech",
      content: "Comprehensive rental management platform streamlining property management for landlords and tenants with automated tools.",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=100&h=100&q=80",
      link: "https://kwakamande.space"
    },
    {
      name: "Paul Rentals",
      role: "Luxury Rentals",
      company: "Premium Service",
      content: "Exclusive platform for luxury car and property rentals in Nairobi, providing VIP service for distinguished clients.",
      logo: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=100&h=100&q=80",
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
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
                <blockquote className="text-gray-700 leading-relaxed text-lg italic text-center mb-8 relative">
                  <div className="absolute -top-4 -left-2 text-4xl text-blue-200 font-serif">"</div>
                  {testimonial.content}
                  <div className="absolute -bottom-8 -right-2 text-4xl text-teal-200 font-serif">"</div>
                </blockquote>
                
                {/* Client Info */}
                <div className="text-center mb-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{testimonial.name}</h4>
                  <p className="text-blue-600 font-semibold mb-1">{testimonial.role}</p>
                  <p className="text-gray-500 text-sm">{testimonial.company}</p>
                </div>

                {/* View Project Button */}
                <div className="text-center">
                  <Button
                    onClick={() => window.open(testimonial.link, '_blank')}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-2"
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

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <a
          href="https://wa.me/254741947599"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl hover:shadow-green-500/25 transform hover:scale-110 transition-all duration-300 group"
        >
          <svg 
            className="w-7 h-7 text-white transform group-hover:scale-110 transition-transform duration-300" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
        
        {/* WhatsApp tooltip */}
        <div className="absolute bottom-16 right-0 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          Chat with us on WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
