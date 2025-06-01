
const WhyChoose = () => {
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

  const stats = [
    { number: "200+", label: "Projects Delivered" },
    { number: "10+", label: "Years of Experience" },
    { number: "95%", label: "Client Retention Rate" },
    { number: "50+", label: "Happy Clients" }
  ];

  return (
    <section id="why-choose" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Digitel is Your Ultimate <span className="text-primary">Digital Partner</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine expertise, innovation, and dedication to deliver exceptional results that drive your business forward.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="animate-slide-up">
            <div className="grid sm:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl"></div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary group-hover:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 group-hover:text-white/90 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
