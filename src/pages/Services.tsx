import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Code2, Calendar, ChevronDown, Globe, Smartphone, Bot, ShoppingCart, TrendingUp, Palette, Server, Sparkles, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import webDevelopmentImg from '@/assets/web-development.jpg';
import aiAutomationImg from '@/assets/ai-automation.jpg';
import saasDevelopmentImg from '@/assets/saas-development.jpg';
import ecommerceImg from '@/assets/ecommerce.jpg';
import digitalMarketingImg from '@/assets/digital-marketing.jpg';
import mobileDevelopmentImg from '@/assets/mobile-development.jpg';
import customSoftwareImg from '@/assets/custom-software.jpg';
import uiUxDesignImg from '@/assets/ui-ux-design.jpg';
interface Service {
  id: number;
  image: string;
  icon: any;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  gradient: string;
  technologies: string[];
}
const Services = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const services: Service[] = [{
    id: 1,
    image: webDevelopmentImg,
    icon: Globe,
    title: "Web Design & Development",
    shortDescription: "Craft responsive, high-performance websites using modern frameworks.",
    fullDescription: "We create stunning, responsive websites that captivate your audience and drive conversions. Our team specializes in modern frameworks like React, Next.js, and WordPress, delivering exceptional user experiences that set your brand apart.",
    features: ["Custom responsive design", "SEO optimization included", "Performance-focused development", "CMS integration", "E-commerce capabilities", "Ongoing maintenance & support"],
    technologies: ["React", "Next.js", "WordPress", "Tailwind CSS", "TypeScript"],
    gradient: "from-blue-500 to-cyan-500"
  }, {
    id: 2,
    image: aiAutomationImg,
    icon: Bot,
    title: "AI & Automation Solutions",
    shortDescription: "Boost efficiency with custom AI integrations and workflow automation.",
    fullDescription: "Transform your business operations with intelligent automation. We integrate cutting-edge AI solutions that streamline workflows, reduce manual tasks, and unlock new possibilities for growth and innovation.",
    features: ["Custom AI chatbots", "Workflow automation", "Data analysis & insights", "Process optimization", "API integrations", "Machine learning solutions"],
    technologies: ["OpenAI", "Python", "TensorFlow", "Zapier", "n8n"],
    gradient: "from-purple-500 to-pink-500"
  }, {
    id: 3,
    image: saasDevelopmentImg,
    icon: Server,
    title: "SaaS Development",
    shortDescription: "Launch scalable Software-as-a-Service solutions with modern architecture.",
    fullDescription: "Build robust, scalable SaaS platforms that grow with your business. From rental management systems to enterprise solutions, we architect applications designed for performance, security, and seamless user experiences.",
    features: ["Multi-tenant architecture", "Subscription management", "User authentication & roles", "Analytics dashboards", "API development", "Cloud deployment"],
    technologies: ["React", "Node.js", "PostgreSQL", "Supabase", "AWS"],
    gradient: "from-orange-500 to-red-500"
  }, {
    id: 4,
    image: ecommerceImg,
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    shortDescription: "Build powerful online stores designed to maximize sales.",
    fullDescription: "Create compelling e-commerce experiences that convert visitors into loyal customers. We build custom online stores with Shopify, WooCommerce, or bespoke solutions tailored to your unique business requirements.",
    features: ["Custom storefront design", "Payment gateway integration", "Inventory management", "Order tracking systems", "Mobile-optimized shopping", "Marketing integrations"],
    technologies: ["Shopify", "WooCommerce", "Stripe", "PayPal", "React"],
    gradient: "from-green-500 to-emerald-500"
  }, {
    id: 5,
    image: digitalMarketingImg,
    icon: TrendingUp,
    title: "Digital Marketing & SEO",
    shortDescription: "Drive traffic and conversions with data-driven strategies.",
    fullDescription: "Amplify your online presence with comprehensive digital marketing strategies. From SEO optimization to paid advertising, we help you reach your target audience and achieve measurable growth.",
    features: ["SEO audit & optimization", "Content marketing strategy", "PPC campaign management", "Social media marketing", "Email marketing automation", "Analytics & reporting"],
    technologies: ["Google Ads", "Meta Ads", "SEMrush", "Mailchimp", "Analytics"],
    gradient: "from-teal-500 to-blue-500"
  }, {
    id: 6,
    image: mobileDevelopmentImg,
    icon: Smartphone,
    title: "Mobile App Development",
    shortDescription: "Create stunning iOS and Android apps with cross-platform frameworks.",
    fullDescription: "Bring your app idea to life with our mobile development expertise. We build native and cross-platform applications that deliver exceptional user experiences on any device.",
    features: ["iOS & Android development", "Cross-platform solutions", "Push notifications", "Offline functionality", "App store optimization", "Post-launch support"],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    gradient: "from-indigo-500 to-purple-500"
  }, {
    id: 7,
    image: customSoftwareImg,
    icon: Code2,
    title: "Custom Software Development",
    shortDescription: "Develop bespoke software solutions tailored to your needs.",
    fullDescription: "Get software that fits your business perfectly. We design and develop custom solutions that address your specific challenges, streamline operations, and give you a competitive edge.",
    features: ["Requirements analysis", "Custom architecture design", "Agile development process", "Quality assurance testing", "Documentation & training", "Continuous improvement"],
    technologies: ["TypeScript", "Python", "Node.js", "PostgreSQL", "Docker"],
    gradient: "from-pink-500 to-rose-500"
  }, {
    id: 8,
    image: uiUxDesignImg,
    icon: Palette,
    title: "UI/UX Design",
    shortDescription: "Design intuitive interfaces that enhance user satisfaction.",
    fullDescription: "Create memorable digital experiences with our design expertise. We craft interfaces that are not only visually stunning but also intuitive, accessible, and aligned with your brand identity.",
    features: ["User research & personas", "Wireframing & prototyping", "Visual design systems", "Usability testing", "Accessibility compliance", "Design handoff"],
    technologies: ["Figma", "Adobe XD", "Framer", "Principle", "Sketch"],
    gradient: "from-amber-500 to-orange-500"
  }];
  const handleBookService = (serviceName: string) => {
    navigate(`/quote?service=${encodeURIComponent(serviceName)}`);
  };
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="text-center max-w-4xl mx-auto">
              
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                All Digital Services{' '}
                <span className="text-primary">Under One Roof</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                From concept to launch, we provide comprehensive digital solutions that drive growth and innovation for your business.
              </p>

              <Button onClick={() => navigate('/quote')} size="lg" className="rounded-full px-8 gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services Accordion Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-4">
              {services.map((service, index) => {
              const IconComponent = service.icon;
              const isExpanded = expandedId === service.id;
              return <motion.div key={service.id} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: index * 0.1
              }}>
                    <div className={`bg-card border border-border/50 rounded-2xl overflow-hidden transition-all duration-500 ${isExpanded ? 'shadow-xl shadow-primary/10' : 'shadow-sm hover:shadow-md'}`}>
                      {/* Service Header - Always Visible */}
                      <button onClick={() => toggleExpand(service.id)} className="w-full p-6 flex items-center gap-4 text-left hover:bg-muted/50 transition-colors">
                        {/* Circular Image with Icon Overlay */}
                        <div className="relative w-16 h-16 shrink-0">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full rounded-full object-cover border-2 border-border shadow-lg"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-md border-2 border-background`}>
                            <IconComponent className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {service.shortDescription}
                          </p>
                        </div>

                        <motion.div animate={{
                      rotate: isExpanded ? 180 : 0
                    }} transition={{
                      duration: 0.3
                    }} className="shrink-0">
                          <ChevronDown className="w-6 h-6 text-muted-foreground" />
                        </motion.div>
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isExpanded && <motion.div initial={{
                      height: 0,
                      opacity: 0
                    }} animate={{
                      height: 'auto',
                      opacity: 1
                    }} exit={{
                      height: 0,
                      opacity: 0
                    }} transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }} className="overflow-hidden">
                            <div className="px-6 pb-6 pt-2">
                              <div className="grid md:grid-cols-2 gap-6">
                                {/* Left Column - Image & Description */}
                                <div className="space-y-4">
                                  <div className="aspect-video rounded-xl overflow-hidden">
                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                  </div>
                                  <p className="text-muted-foreground leading-relaxed">
                                    {service.fullDescription}
                                  </p>
                                  
                                  {/* Technologies */}
                                  <div className="flex flex-wrap gap-2">
                                    {service.technologies.map((tech, i) => <span key={i} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                        {tech}
                                      </span>)}
                                  </div>
                                </div>

                                {/* Right Column - Features & CTA */}
                                <div className="space-y-4">
                                  <h4 className="font-semibold text-foreground">What's Included:</h4>
                                  <ul className="space-y-3">
                                    {service.features.map((feature, i) => <motion.li key={i} initial={{
                                opacity: 0,
                                x: -10
                              }} animate={{
                                opacity: 1,
                                x: 0
                              }} transition={{
                                delay: i * 0.05
                              }} className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0`}>
                                          <Check className="w-3 h-3 text-white" />
                                        </div>
                                        {feature}
                                      </motion.li>)}
                                  </ul>

                                  <Button onClick={() => handleBookService(service.title)} className={`w-full mt-6 bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white rounded-xl h-12`}>
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Book This Service
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>}
                      </AnimatePresence>
                    </div>
                  </motion.div>;
            })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-foreground text-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Transform Your{' '}
                <span className="text-primary">Digital Presence?</span>
              </h2>
              <p className="text-lg text-background/70 mb-10">
                Let's discuss your project and find the perfect solution for your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/quote')} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                  Get Free Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button onClick={() => navigate('/portfolio')} variant="outline" size="lg" className="border-background/30 text-background hover:bg-background/10 rounded-full px-8">
                  View Our Work
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Services;