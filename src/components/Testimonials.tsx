
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Property Manager",
      company: "Elite Real Estate",
      content: "Digitel's rental system transformed our real estate business! The automation features saved us countless hours and improved our client satisfaction dramatically.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "TechStart Solutions",
      content: "The custom SaaS platform Digitel built for us exceeded all expectations. Their attention to detail and technical expertise is unmatched.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Growth Dynamics",
      content: "Working with Digitel was a game-changer. Their digital marketing strategies increased our online presence by 300% in just 6 months.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "David Wilson",
      role: "Founder",
      company: "AutoFlow Systems",
      content: "The automation solutions provided by Digitel streamlined our entire workflow. We're now operating 50% more efficiently than before.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Businesses <span className="text-primary">Worldwide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients say about working with Digitel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-primary font-medium">{testimonial.role}</p>
                    <p className="text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 leading-relaxed text-lg italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.5 3 1.5-6.5L0 7l6.5-.5L10 0l3.5 6.5L20 7l-6 4.5L15.5 18z"/>
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
