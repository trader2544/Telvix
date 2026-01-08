import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Target, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const WhyChoose = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Sparkles,
      title: "Comprehensive Expertise",
      description: "Our team excels in every digital discipline, from design to development to marketing."
    },
    {
      icon: Target,
      title: "Tailored Solutions",
      description: "We customize every project to fit your unique business goals and industry needs."
    },
    {
      icon: Zap,
      title: "Scalable & Future-Proof",
      description: "Our solutions, from SaaS to automation, grow with your business."
    },
    {
      icon: Users,
      title: "Proven Results",
      description: "Trusted by clients worldwide with a track record of successful projects."
    }
  ];

  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
    { value: "5+", label: "Years Experience" },
  ];

  return (
    <section id="why-choose" className="mobile-spacing bg-foreground text-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern" style={{ filter: 'invert(1)' }} />
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0], scale: [1, 0.95, 1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Title */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Why Telvix is Your Ultimate{' '}
              <span className="text-primary">Digital Partner</span>
            </h2>
            <p className="text-background/70 text-lg leading-relaxed mb-8">
              We combine expertise, innovation, and dedication to deliver exceptional 
              results that drive your business forward.
            </p>
            <Button 
              onClick={() => navigate('/quote')}
              className="bg-background text-foreground hover:bg-background/90 rounded-full px-8"
            >
              Get Started
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          {/* Right Column - Benefits */}
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-background mb-2 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-background/60 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div 
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-background/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
