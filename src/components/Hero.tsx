import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
const Hero = () => {
  const navigate = useNavigate();
  return <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden pt-20">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      {/* Floating gradient orbs */}
      <motion.div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" animate={{
      y: [0, -30, 0],
      scale: [1, 1.1, 1]
    }} transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }} />
      <motion.div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" animate={{
      y: [0, 30, 0],
      scale: [1, 0.95, 1]
    }} transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2
    }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline - Webpoint style */}
          <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight leading-[1.05] mb-8" initial={{
          opacity: 0,
          y: 60
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1]
        }}>
            We Build Winning
            <br />
            <span className="inline-flex items-center">
              <motion.span className="relative inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-full mx-2" initial={{
              scale: 0.8,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} transition={{
              delay: 0.5,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}>
                <motion.span className="absolute left-4 w-8 h-8 bg-primary-foreground/20 rounded-lg" animate={{
                rotate: [0, 10, 0]
              }} transition={{
                duration: 4,
                repeat: Infinity
              }} />
                <span className="relative z-10 ml-6">Solutions</span>
              </motion.span>
              for a
            </span>
            <br />
            Better Tomorrow.
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed" initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 1,
          ease: [0.22, 1, 0.36, 1]
        }}>
            From research to execution, we work closely with organizations to create 
            an intuitive and impactful experience online.
          </motion.p>

          {/* CTA Button */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6,
          duration: 0.8
        }}>
            <Button onClick={() => navigate('/quote')} size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-base font-medium group">
              Start your project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1.2
    }}>
        
      </motion.div>
    </section>;
};
export default Hero;