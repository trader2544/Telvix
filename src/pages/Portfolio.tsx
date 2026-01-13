import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Globe, Smartphone, ShoppingBag, Bot, Zap, Car, TrendingUp, Leaf, Building2, Dumbbell, Pill, User, ArrowRight, Filter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface ProjectDetails {
  id: number;
  name: string;
  description: string;
  fullDescription: string;
  keyFeatures: string[];
  techStack: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  icon: any;
  image: string;
  category: string;
}
const categories = [{
  id: 'all',
  label: 'All Projects',
  icon: Globe
}, {
  id: 'ecommerce',
  label: 'E-commerce',
  icon: ShoppingBag
}, {
  id: 'saas',
  label: 'SaaS',
  icon: Zap
}, {
  id: 'healthcare',
  label: 'Healthcare',
  icon: Pill
}, {
  id: 'fintech',
  label: 'Fintech',
  icon: TrendingUp
}, {
  id: 'lifestyle',
  label: 'Lifestyle',
  icon: User
}];
const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const navigate = useNavigate();
  const portfolioProjects: ProjectDetails[] = [{
    id: 1,
    name: "Elso Boutique",
    description: "A modern e-commerce platform celebrating Kenyan craftsmanship.",
    fullDescription: "Elso Boutique is a sophisticated e-commerce platform that showcases the finest Kenyan craftsmanship. From handwoven baskets to contemporary fashion and specialty foods, the platform connects global shoppers with authentic local artisans.",
    keyFeatures: ["Curated marketplace for handwoven baskets, fashion, and specialty foods", "Fast, secure shopping with M-Pesa integration", "Seller dashboards for inventory and customer management", "Personalized recommendations and responsive support"],
    techStack: "React, TypeScript, Tailwind CSS, Supabase",
    html_url: "https://github.com/trader2544/atelier-rose-commerce-kenya.git",
    homepage: "https://elso-boutique.com/",
    stargazers_count: 189,
    forks_count: 52,
    language: "TypeScript",
    topics: ["ecommerce", "kenya", "craftsmanship"],
    icon: ShoppingBag,
    image: "/lovable-uploads/3b10d268-0f01-4ac3-9f1f-5866e799e8ee.png",
    category: "ecommerce"
  }, {
    id: 2,
    name: "LemiStores",
    description: "Premium Electronics & Home Appliances retail platform.",
    fullDescription: "LemiStores is an online retail store specializing in premium electronics and home appliances. The platform provides customers with an easy shopping experience through a clean layout and responsive design.",
    keyFeatures: ["Premium electronics and home appliances catalog", "Clean, organized product categories", "Responsive design for mobile and desktop", "Easy shopping experience with quality focus"],
    techStack: "React, JavaScript, CSS",
    html_url: "#",
    homepage: "https://lemistores.netlify.app",
    stargazers_count: 145,
    forks_count: 32,
    language: "JavaScript",
    topics: ["ecommerce", "electronics", "appliances"],
    icon: ShoppingBag,
    image: "/lovable-uploads/fd3a764c-1a6d-4fba-951d-9a35c7a67049.png",
    category: "ecommerce"
  }, {
    id: 3,
    name: "Mustapha Fashion",
    description: "Reimagining African style through innovative designs.",
    fullDescription: "Mustapha Fashion is a fashion brand reimagining African style through innovative designs that blend Kenyan heritage with modern aesthetics.",
    keyFeatures: ["Collections: Savanna Dreams, Urban Craftsman, Elegant Nairobi", "Event styling and fashion judging services", "Blend of Kenyan heritage with modern aesthetics", "Creative vision showcasing African style"],
    techStack: "React, TypeScript, Tailwind CSS",
    html_url: "#",
    homepage: "https://mustaphafashions.co.ke/",
    stargazers_count: 178,
    forks_count: 45,
    language: "TypeScript",
    topics: ["fashion", "african-style", "design"],
    icon: User,
    image: "/lovable-uploads/ee0438b5-3260-4b41-bc29-35f0544c7ca8.png",
    category: "lifestyle"
  }, {
    id: 4,
    name: "Rabbit Hole Fitness Lab",
    description: "Interactive platform exploring fitness science and calisthenics.",
    fullDescription: "Rabbit Hole Fitness Lab is a comprehensive fitness and education platform that combines scientific research with practical application.",
    keyFeatures: ["Educational content on fitness and nutrition", "Calisthenics progressions and strength programs", "Interactive tracking tools", "Premium course support"],
    techStack: "React, TypeScript, Supabase, Tailwind CSS",
    html_url: "https://github.com/trader2544/rabbit-hole-fitness-lab",
    homepage: "https://rabbithole.fitness",
    stargazers_count: 275,
    forks_count: 84,
    language: "TypeScript",
    topics: ["fitness", "education", "health"],
    icon: Dumbbell,
    image: "/lovable-uploads/27cca01b-8a73-410d-9248-5b05149fd158.png",
    category: "lifestyle"
  }, {
    id: 5,
    name: "PharmaSync Pro AI",
    description: "Pharmacy and clinic management platform with AI-powered insights.",
    fullDescription: "PharmaSync Pro AI is a comprehensive healthcare management platform designed specifically for Kenyan healthcare providers.",
    keyFeatures: ["Inventory and sales tracking", "Patient medical records & prescriptions", "User roles with branch control", "Analytics dashboard"],
    techStack: "React, TypeScript, Supabase, Tailwind CSS",
    html_url: "https://github.com/trader2544/pharma-sync-pro-ai",
    homepage: "https://pharma-sync.netlify.app",
    stargazers_count: 198,
    forks_count: 67,
    language: "TypeScript",
    topics: ["healthcare", "pharmacy", "saas"],
    icon: Pill,
    image: "/lovable-uploads/78339dfa-9d7b-42f1-8336-5185e1ccc0c6.png",
    category: "healthcare"
  }, {
    id: 6,
    name: "MJS Products Limited",
    description: "Architectural and construction firm website.",
    fullDescription: "MJS Products Limited represents excellence in architectural design and construction services across Kenya.",
    keyFeatures: ["Project showcase and service pages", "Company vision, mission, and values", "Clean, responsive design", "Client-focused structure"],
    techStack: "React, TypeScript, Tailwind CSS",
    html_url: "https://github.com/trader2544/mjs-prods",
    homepage: "https://mjsprods.co.ke",
    stargazers_count: 156,
    forks_count: 43,
    language: "TypeScript",
    topics: ["construction", "architecture", "kenya"],
    icon: Building2,
    image: "/lovable-uploads/18572de8-2218-4d81-8c05-e83cc4169dec.png",
    category: "lifestyle"
  }, {
    id: 7,
    name: "Paul Rentals",
    description: "Luxury car and property rentals platform in Nairobi.",
    fullDescription: "Paul Rentals is an exclusive platform designed for luxury car and property rentals in Nairobi.",
    keyFeatures: ["Easy property and vehicle listing with online booking", "Calendar synchronization for availability tracking", "Admin dashboard with analytics", "VIP service with 24/7 support"],
    techStack: "React, TypeScript, Node.js, MongoDB",
    html_url: "https://github.com/trader2544/paulrentals.git",
    homepage: "https://paulrentals.netlify.app",
    stargazers_count: 298,
    forks_count: 89,
    language: "TypeScript",
    topics: ["luxury-rentals", "vehicles", "properties"],
    icon: Car,
    image: "/lovable-uploads/4d656ebd-2524-4973-8f90-ca049f965544.png",
    category: "saas"
  }, {
    id: 8,
    name: "AfriGrowth",
    description: "Personalized investment advisory for African markets.",
    fullDescription: "AfriGrowth is a cutting-edge investment advisory platform specifically designed for African markets.",
    keyFeatures: ["Market analysis tools and corporate finance planning", "Savings and retirement planning guidance", "Financial education resources", "Responsive, modern UI"],
    techStack: "React, TypeScript, Node.js",
    html_url: "https://github.com/trader2544/afrigrowth.git",
    homepage: "https://afrigrowth.netlify.app",
    stargazers_count: 124,
    forks_count: 45,
    language: "TypeScript",
    topics: ["fintech", "investment", "africa"],
    icon: TrendingUp,
    image: "/lovable-uploads/c84b6d6c-0b8c-42af-a8b5-4779c3c0f1f2.png",
    category: "fintech"
  }, {
    id: 9,
    name: "Eco Track",
    description: "Environmental monitoring platform for conservationists.",
    fullDescription: "Eco Track is a sophisticated environmental monitoring platform designed for researchers and conservationists in Kenya.",
    keyFeatures: ["Real-time monitoring of environmental metrics", "Geospatial mapping for visualizing data", "Alerts for abnormal conditions", "Tools for data-driven conservation"],
    techStack: "React, TypeScript, Custom CSS",
    html_url: "https://github.com/trader2544/eco-track",
    homepage: "https://eotrack.netlify.app",
    stargazers_count: 167,
    forks_count: 56,
    language: "TypeScript",
    topics: ["environment", "conservation", "sustainability"],
    icon: Leaf,
    image: "/lovable-uploads/f7b6da4f-1260-4f3e-8c2f-2510fe076664.png",
    category: "saas"
  }, {
    id: 10,
    name: "Telvix Digital Solutions",
    description: "Full-service digital agency website.",
    fullDescription: "Telvix Digital Solutions represents a comprehensive digital agency offering end-to-end technology solutions.",
    keyFeatures: ["Web & app development services", "AI and automation workflows", "SaaS solutions and branding", "SEO and digital marketing packages"],
    techStack: "React, TypeScript, Supabase, Tailwind CSS",
    html_url: "https://github.com/trader2544/Telvix",
    homepage: "https://telvix.tech",
    stargazers_count: 234,
    forks_count: 78,
    language: "TypeScript",
    topics: ["digital-agency", "web-development", "ai"],
    icon: Zap,
    image: "/lovable-uploads/a1750ac5-0b00-4671-b6c9-53a03cbb591a.png",
    category: "saas"
  }];
  const filteredProjects = selectedCategory === 'all' ? portfolioProjects : portfolioProjects.filter(p => p.category === selectedCategory);
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
        }} className="text-center mb-16">
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Crafted with{' '}
              <span className="text-primary">Passion</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of successful digital solutions. Each project represents our commitment to excellence.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return <Button key={category.id} variant={isActive ? "default" : "outline"} onClick={() => setSelectedCategory(category.id)} className={`rounded-full gap-2 transition-all duration-300 ${isActive ? 'shadow-lg shadow-primary/25' : 'hover:bg-muted'}`}>
                  
                  {category.label}
                </Button>;
          })}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
              const IconComponent = project.icon;
              const isHovered = hoveredProject === project.id;
              return <motion.div key={project.id} layout initial={{
                opacity: 0,
                scale: 0.9
              }} animate={{
                opacity: 1,
                scale: 1
              }} exit={{
                opacity: 0,
                scale: 0.9
              }} transition={{
                duration: 0.3,
                delay: index * 0.05
              }} onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="group cursor-pointer h-full">
                          <div className="relative bg-card rounded-2xl overflow-hidden border border-border/50 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                              <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                              {/* Overlay on hover */}
                              <motion.div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent flex items-end justify-center p-6" initial={{
                            opacity: 0
                          }} animate={{
                            opacity: isHovered ? 1 : 0
                          }} transition={{
                            duration: 0.3
                          }}>
                                <div className="text-center">
                                  <p className="text-background/80 text-sm mb-3">Click to view details</p>
                                  <div className="flex gap-3 justify-center">
                                    {project.homepage && <Button size="sm" variant="secondary" className="rounded-full" onClick={e => {
                                  e.stopPropagation();
                                  window.open(project.homepage, '_blank');
                                }}>
                                        <Globe className="w-4 h-4 mr-1" />
                                        Visit
                                      </Button>}
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-5">
                              <div className="flex items-center gap-3 mb-3">
                                
                                <div>
                                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                    {project.name}
                                  </h3>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    
                                    
                                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                                    <span>{project.language}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {project.topics.slice(0, 3).map((topic, i) => <span key={i} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                                    {topic}
                                  </span>)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                      
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                              <IconComponent className="w-7 h-7 text-primary" />
                            </div>
                            <div>
                              <DialogTitle className="text-2xl">{project.name}</DialogTitle>
                              <p className="text-sm text-muted-foreground">{project.techStack}</p>
                            </div>
                          </div>
                        </DialogHeader>
                        <div className="space-y-6">
                          <img src={project.image} alt={project.name} className="w-full h-64 object-cover rounded-xl" />
                          <p className="text-muted-foreground">{project.fullDescription}</p>
                          <div>
                            <h4 className="font-semibold mb-3 text-foreground">Key Features</h4>
                            <ul className="space-y-2">
                              {project.keyFeatures.map((feature, index) => <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                  {feature}
                                </li>)}
                            </ul>
                          </div>
                          <div className="flex gap-3">
                            {project.homepage && <Button className="flex-1 gap-2 rounded-xl" onClick={() => window.open(project.homepage, '_blank')}>
                                <ExternalLink className="w-4 h-4" />
                                Visit Live Site
                              </Button>}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </motion.div>;
            })}
            </AnimatePresence>
          </motion.div>

          {/* CTA Section */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="mt-20 text-center">
            <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 rounded-3xl p-12 border border-border/50">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Have a Project in Mind?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Let's collaborate and create something amazing together. We're ready to bring your vision to life.
              </p>
              <Button onClick={() => navigate('/quote')} size="lg" className="rounded-full px-8 gap-2">
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default Portfolio;