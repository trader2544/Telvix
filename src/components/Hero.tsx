import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
const Hero = () => {
  const navigate = useNavigate();
  return <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden pt-16 sm:pt-20">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      {/* Floating gradient orbs */}
      <motion.div className="absolute top-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-primary/5 rounded-full blur-3xl" animate={{
      y: [0, -30, 0],
      scale: [1, 1.1, 1]
    }} transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }} />
      <motion.div className="absolute bottom-1/4 left-1/4 w-40 sm:w-80 h-40 sm:h-80 bg-primary/3 rounded-full blur-3xl" animate={{
      y: [0, 30, 0],
      scale: [1, 0.95, 1]
    }} transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2
    }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline - Webpoint style */}
          <motion.h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight leading-[1.1] sm:leading-[1.05] mb-6 sm:mb-8" initial={{
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
            <span className="inline-flex items-center flex-wrap justify-center">
              <motion.span className="relative inline-flex items-center px-3 sm:px-6 py-1 sm:py-2 bg-primary text-primary-foreground rounded-full mx-1 sm:mx-2 text-2xl sm:text-5xl md:text-7xl lg:text-8xl" initial={{
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
                {/* Animated 3D Cube */}
                <motion.div 
                  className="absolute left-2 sm:left-3 w-5 h-5 sm:w-8 sm:h-8"
                  style={{ perspective: '100px' }}
                >
                  <motion.div
                    className="w-full h-full relative"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{
                      rotateX: [0, 360],
                      rotateY: [0, 360],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {/* Front face */}
                    <div className="absolute inset-0 bg-primary-foreground/30 rounded-sm sm:rounded-md border border-primary-foreground/40" 
                      style={{ transform: 'translateZ(4px)' }} 
                    />
                    {/* Back face */}
                    <div className="absolute inset-0 bg-primary-foreground/20 rounded-sm sm:rounded-md border border-primary-foreground/30" 
                      style={{ transform: 'translateZ(-4px)' }} 
                    />
                    {/* Right face */}
                    <div className="absolute inset-0 bg-primary-foreground/25 rounded-sm sm:rounded-md border border-primary-foreground/35"
                      style={{ transform: 'rotateY(90deg) translateZ(4px)' }}
                    />
                    {/* Left face */}
                    <div className="absolute inset-0 bg-primary-foreground/15 rounded-sm sm:rounded-md border border-primary-foreground/25"
                      style={{ transform: 'rotateY(-90deg) translateZ(4px)' }}
                    />
                    {/* Top face */}
                    <div className="absolute inset-0 bg-primary-foreground/35 rounded-sm sm:rounded-md border border-primary-foreground/45"
                      style={{ transform: 'rotateX(90deg) translateZ(4px)' }}
                    />
                    {/* Bottom face */}
                    <div className="absolute inset-0 bg-primary-foreground/10 rounded-sm sm:rounded-md border border-primary-foreground/20"
                      style={{ transform: 'rotateX(-90deg) translateZ(4px)' }}
                    />
                  </motion.div>
                </motion.div>
                <span className="relative z-10 ml-7 sm:ml-10">Solutions</span>
              </motion.span>
              <span className="mt-1 sm:mt-0">for a</span>
            </span>
            <br />
            Better Tomorrow.
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4" initial={{
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
            <Button onClick={() => navigate('/quote')} size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium group">
              Start your project
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
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