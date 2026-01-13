import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Wallet, Code, Smartphone, Globe, Zap, ArrowRight, Lock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const Careers = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const gigs = [{
    title: "M-Pesa Integration Developer",
    location: "Kenya (Remote)",
    type: "Freelance",
    budget: "KSh 15,000 - 30,000",
    currency: "KSh",
    icon: Wallet,
    description: "Integrate M-Pesa payment gateway into existing web applications.",
    skills: ["PHP", "Node.js", "M-Pesa API", "MySQL"],
    duration: "1-2 weeks"
  }, {
    title: "React Frontend Developer",
    location: "Nigeria (Remote)",
    type: "Freelance",
    budget: "₦50,000 - 80,000",
    currency: "₦",
    icon: Code,
    description: "Build responsive React components for e-commerce platform.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Redux"],
    duration: "2-3 weeks"
  }, {
    title: "WordPress Plugin Developer",
    location: "Kenya (Remote)",
    type: "Freelance",
    budget: "KSh 20,000 - 40,000",
    currency: "KSh",
    icon: Globe,
    description: "Create custom WordPress plugin for rental management system.",
    skills: ["WordPress", "PHP", "MySQL", "JavaScript"],
    duration: "1-2 weeks"
  }, {
    title: "Mobile App UI Designer",
    location: "Nigeria (Remote)",
    type: "Freelance",
    budget: "₦40,000 - 70,000",
    currency: "₦",
    icon: Smartphone,
    description: "Design modern UI/UX for Flutter mobile application.",
    skills: ["Figma", "Adobe XD", "UI/UX", "Mobile Design"],
    duration: "1-2 weeks"
  }, {
    title: "Database Optimization Specialist",
    location: "Kenya (Remote)",
    type: "Freelance",
    budget: "KSh 25,000 - 45,000",
    currency: "KSh",
    icon: Zap,
    description: "Optimize MySQL database performance for high-traffic application.",
    skills: ["MySQL", "Database Design", "Performance Tuning", "Indexing"],
    duration: "1 week"
  }, {
    title: "API Integration Developer",
    location: "Nigeria (Remote)",
    type: "Freelance",
    budget: "₦60,000 - 100,000",
    currency: "₦",
    icon: Code,
    description: "Integrate third-party APIs for fintech application.",
    skills: ["Node.js", "Express", "REST APIs", "Authentication"],
    duration: "2-3 weeks"
  }];
  const benefits = ["Flexible working hours", "Remote work opportunities", "Competitive project rates", "Skill development programs", "Direct client communication", "Portfolio building projects"];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center mb-20">
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Freelance{' '}
              <span className="text-primary">Opportunities</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our network of talented developers from Kenya and Nigeria. Work on exciting projects with competitive rates and flexible schedules.
            </p>
          </motion.div>

          {/* Available Gigs */}
          <section className="mb-20">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Available Gigs</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {user ? 'Browse current opportunities and find your next project' : 'Sign in to view detailed job listings and apply'}
              </p>
            </motion.div>

            {user ? <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
            once: true
          }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gigs.map((gig, index) => {
              const IconComponent = gig.icon;
              return <motion.div key={index} variants={itemVariants}>
                      <Card className="group h-full bg-card hover:shadow-xl transition-all duration-500 border border-border/50 hover:border-primary/30 overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                              <IconComponent className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                {gig.title}
                              </h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                {gig.location}
                              </div>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                            {gig.description}
                          </p>

                          <div className="space-y-3 mb-4">
                            <div className="flex items-center text-sm">
                              <Wallet className="w-4 h-4 text-primary mr-2" />
                              <span className="font-semibold text-primary">{gig.budget}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                              <span className="text-muted-foreground">{gig.duration}</span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-xs font-medium text-foreground mb-2">Required Skills:</p>
                            <div className="flex flex-wrap gap-1">
                              {gig.skills.map((skill, skillIndex) => <span key={skillIndex} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                  {skill}
                                </span>)}
                            </div>
                          </div>

                          <Button className="w-full group/btn" onClick={() => window.open('https://wa.me/254741947599', '_blank')}>
                            Apply Now
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>;
            })}
              </motion.div> : (/* Locked State for Non-Authenticated Users */
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-center py-16">
                <Card className="max-w-md mx-auto border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardContent className="p-8">
                    
                    <h3 className="text-xl font-bold text-foreground mb-2">Sign In to View Jobs</h3>
                    <p className="text-muted-foreground mb-6">
                      Create an account or sign in to browse available freelance opportunities and apply.
                    </p>
                    <Button onClick={() => navigate('/auth')} className="gap-2">
                      Sign In / Register
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>)}
          </section>

          {/* Benefits Section */}
          <motion.section initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="bg-muted/30 rounded-3xl p-8 md:p-12 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Why Work With Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => <motion.div key={index} initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">{benefit}</span>
                </motion.div>)}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Join Our Team?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Send us your portfolio and let's discuss how we can work together on exciting projects.
            </p>
            <Button size="lg" className="text-lg px-8 py-6 rounded-full group" onClick={() => window.open('https://wa.me/254741947599', '_blank')}>
              Contact Us on WhatsApp
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>;
};
export default Careers;