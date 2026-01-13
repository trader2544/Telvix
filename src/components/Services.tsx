import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import discoveryImg from '@/assets/discovery-service.jpg';
import designImg from '@/assets/ui-ux-design.jpg';
import developmentImg from '@/assets/development-service.jpg';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      number: "01 / 03",
      title: "Discovery",
      description: "We conduct high-level research based on your requirements to develop the best digital solutions. We understand, devise, and strategize solutions that are centered around your idea.",
      features: ["User Research", "UX Audit", "Product and Business Strategy", "Conversion Rate Optimisation"],
      image: discoveryImg,
    },
    {
      number: "02 / 03",
      title: "Design",
      description: "Users first. We create for the end users. Those who are on your platform every day. Those who wish life was a little bit easier. We design products. We design brands. But most importantly, we design experiences.",
      features: ["UX Design", "UI Design", "Competitive Analysis", "Motion Design", "Branding"],
      image: designImg,
    },
    {
      number: "03 / 03",
      title: "Development",
      description: "Every line of code is like a stroke of paint on your canvas. We build with the right frameworks and technologies, ensuring the final product is sturdy, clean, and responsive.",
      features: ["Webflow Development", "React & Next.js", "Mobile Development", "API Integration"],
      image: developmentImg,
    }
  ];

  return (
    <section className="mobile-spacing bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            What makes Telvix different?
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            We let our work speak for itself. We know your organization is unique, 
            and we take the time to understand your requirements to create a qualitative approach.
          </p>
          <p className="text-muted-foreground max-w-2xl mt-4 text-lg leading-relaxed">
            We love partnering up with organizations that aim to positively impact 
            the world through user-centric solutions.
          </p>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              onClick={() => navigate('/quote')}
              variant="outline"
              className="rounded-full border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 group"
            >
              Start your project
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Our Offers Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Our offers</p>
          <p className="text-muted-foreground max-w-3xl text-lg">
            Our three-step approach to projects has yielded in brands to make an impact in their industry. 
            We discover, design, and build effective solutions tailor-made for your ideas.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="space-y-20 md:space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              {/* Image */}
              <motion.div 
                className={`relative group ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3]">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="text-sm text-muted-foreground font-medium">{service.number}</span>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">{service.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-foreground/80">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => navigate('/services')}
                  variant="link"
                  className="text-foreground p-0 h-auto font-medium group"
                >
                  Learn More
                  <ArrowUpRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
