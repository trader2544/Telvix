import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Testimonials = () => {
  const projects = [
    {
      name: "Elso Boutique",
      category: "E-commerce Platform",
      description: "Modern e-commerce platform celebrating Kenyan craftsmanship.",
      logo: "/lovable-uploads/1ebaad52-dd91-479d-843f-e3352f70739f.png",
      link: "https://elso-atelier.com"
    },
    {
      name: "Rabbit Hole Fitness Lab",
      category: "Fitness & Education",
      description: "Interactive platform exploring fitness science and nutrition.",
      logo: "/lovable-uploads/27cca01b-8a73-410d-9248-5b05149fd158.png",
      link: "https://rabbithole.fitness"
    },
    {
      name: "MJS Products Limited",
      category: "Construction & Design",
      description: "Top-tier architectural and construction firm website.",
      logo: "/lovable-uploads/18572de8-2218-4d81-8c05-e83cc4169dec.png",
      link: "https://mjsprods.co.ke"
    },
    {
      name: "PharmaSync Pro AI",
      category: "Healthcare SaaS",
      description: "Comprehensive pharmacy and clinic management platform.",
      logo: "/lovable-uploads/78339dfa-9d7b-42f1-8336-5185e1ccc0c6.png",
      link: "https://pharma-sync.netlify.app"
    },
    {
      name: "Kwa Kamande Space",
      category: "Property Tech",
      description: "Comprehensive rental management platform.",
      logo: "/lovable-uploads/75ecb35e-46da-4797-96de-0c0bd5d64bf8.png",
      link: "https://kwakamande.space"
    },
    {
      name: "Paul Rentals",
      category: "Premium Service",
      description: "Exclusive platform for luxury car and property rentals.",
      logo: "/lovable-uploads/4d656ebd-2524-4973-8f90-ca049f965544.png",
      link: "https://paulrentals.netlify.app"
    }
  ];

  return (
    <section id="testimonials" className="mobile-spacing bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Selected Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Projects that speak for themselves
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            A showcase of our recent work, from e-commerce platforms to SaaS solutions.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-card rounded-3xl overflow-hidden hover-lift cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Card Content */}
              <div className="p-8">
                {/* Logo */}
                <div className="relative mb-8">
                  <motion.div 
                    className="w-20 h-20 rounded-2xl overflow-hidden bg-muted shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={project.logo} 
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Arrow */}
                  <div className="absolute -right-2 -top-2 w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Category */}
                <span className="text-sm text-muted-foreground font-medium">
                  {project.category}
                </span>

                {/* Name */}
                <h3 className="text-xl font-bold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.a>
          ))}
        </div>

        {/* View All */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a 
            href="/portfolio"
            className="inline-flex items-center text-foreground font-medium hover:text-primary transition-colors group"
          >
            View all projects
            <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
