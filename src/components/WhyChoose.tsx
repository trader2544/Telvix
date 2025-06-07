
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const WhyChoose = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const benefits = [
    {
      title: "Comprehensive Expertise",
      description: "Our team excels in every digital discipline, from design to development to marketing."
    },
    {
      title: "Tailored Solutions",
      description: "We customize every project to fit your unique business goals and industry needs."
    },
    {
      title: "Scalable & Future-Proof",
      description: "Our solutions, from SaaS to automation, grow with your business."
    },
    {
      title: "Proven Results",
      description: "Trusted by clients worldwide with a track record of successful projects."
    }
  ];

  return (
    <section id="why-choose" className="mobile-spacing bg-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        {/* Desktop Version */}
        <div className="hidden md:block">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="mobile-text-4xl text-gray-900 mb-4">
              Why Telvix is Your Ultimate <span className="text-primary">Digital Partner</span>
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
              We combine expertise, innovation, and dedication to deliver exceptional results that drive your business forward.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center sm:text-left">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-up">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80" 
                alt="Digital Innovation" 
                className="rounded-xl md:rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-xl md:rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Mobile Collapsible Version */}
        <div className="md:hidden">
          <div 
            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h2 className="text-base font-bold text-gray-900">
              Why Choose Telvix?
            </h2>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-primary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-primary" />
            )}
          </div>

          {isExpanded && (
            <div className="mt-3 animate-fade-in">
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
