import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
const CTA = () => {
  const navigate = useNavigate();
  const features = ["Free Initial Consultation", "No Long-term Contracts", "24/7 Support Available"];
  return <section className="mobile-spacing bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Elements */}
      <motion.div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" animate={{
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.3, 0.5]
    }} transition={{
      duration: 10,
      repeat: Infinity
    }} />
      <motion.div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" animate={{
      scale: [1, 0.9, 1],
      opacity: [0.3, 0.5, 0.3]
    }} transition={{
      duration: 8,
      repeat: Infinity,
      delay: 2
    }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" initial={{
          opacity: 0,
          y: 40
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            Ready to Transform Your{' '}
            <span className="text-primary-foreground/80">Digital Future?</span>
          </motion.h2>
          
          <motion.p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2,
          duration: 0.8
        }}>
            Partner with Telvix for cutting-edge web design, automation, SaaS solutions, and more. 
            Let's bring your vision to life.
          </motion.p>
          
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-12" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.4,
          duration: 0.8
        }}>
            <Button onClick={() => navigate('/quote')} size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 font-medium group">
              Request a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button onClick={() => navigate('/portfolio')} size="lg" variant="outline" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8">
              View Our Portfolio
            </Button>
          </motion.div>
          
          <motion.div className="flex flex-wrap justify-center gap-6" initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.6,
          duration: 0.8
        }}>
            {features.map((feature, index) => <div key={feature} className="flex items-center space-x-2 text-primary-foreground/80">
                
                <span className="text-sm">{feature}</span>
              </div>)}
          </motion.div>
        </div>
      </div>
    </section>;
};
export default CTA;