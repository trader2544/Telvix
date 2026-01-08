import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Github, Star, Globe, Code2, Smartphone, ShoppingBag, Bot, Zap, Car, TrendingUp, Leaf, Building2, Dumbbell, Pill, User, ArrowRight } from 'lucide-react';

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
}

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  const portfolioProjects: ProjectDetails[] = [
    {
      id: 1,
      name: "Elso Boutique",
      description: "A modern e-commerce platform celebrating Kenyan craftsmanship, connecting shoppers with unique, high-quality local products.",
      fullDescription: "Elso Boutique is a sophisticated e-commerce platform that showcases the finest Kenyan craftsmanship. From handwoven baskets to contemporary fashion and specialty foods, the platform connects global shoppers with authentic local artisans while providing comprehensive seller management tools.",
      keyFeatures: [
        "Curated marketplace for handwoven baskets, fashion, and specialty foods",
        "Fast, secure shopping with M-Pesa integration",
        "Seller dashboards for inventory and customer management",
        "Personalized recommendations and responsive support"
      ],
      techStack: "Vite, TypeScript, React, Tailwind CSS, shadcn-ui",
      html_url: "https://github.com/trader2544/atelier-rose-commerce-kenya.git",
      homepage: "https://elso-boutique.com/",
      stargazers_count: 189,
      forks_count: 52,
      language: "TypeScript",
      topics: ["ecommerce", "kenya", "craftsmanship"],
      icon: ShoppingBag,
      image: "/lovable-uploads/3b10d268-0f01-4ac3-9f1f-5866e799e8ee.png"
    },
    {
      id: 2,
      name: "LemiStores",
      description: "Premium Electronics & Home Appliances - An online retail store with clean layout and responsive design for Kenyan shoppers.",
      fullDescription: "LemiStores is an online retail store specializing in premium electronics and home appliances. The platform provides customers with an easy shopping experience through a clean layout, well-organized product categories, and responsive design.",
      keyFeatures: [
        "Premium electronics and home appliances catalog",
        "Clean, organized product categories",
        "Responsive design for mobile and desktop",
        "Easy shopping experience with quality focus"
      ],
      techStack: "Modern web technologies",
      html_url: "#",
      homepage: "https://lemistores.netlify.app",
      stargazers_count: 145,
      forks_count: 32,
      language: "JavaScript",
      topics: ["ecommerce", "electronics", "appliances"],
      icon: ShoppingBag,
      image: "/lovable-uploads/fd3a764c-1a6d-4fba-951d-9a35c7a67049.png"
    },
    {
      id: 3,
      name: "Mustapha Fashion",
      description: "Kenyan Fashion Designer - Reimagining African style through innovative designs that blend heritage with modern aesthetics.",
      fullDescription: "Mustapha Fashion is a fashion brand reimagining African style through innovative designs that blend Kenyan heritage with modern aesthetics. Highlighting collections like Savanna Dreams and Urban Craftsman, the brand brings culture, craftsmanship, and creative vision to the forefront.",
      keyFeatures: [
        "Collections: Savanna Dreams, Urban Craftsman, Elegant Nairobi",
        "Event styling and fashion judging services",
        "Blend of Kenyan heritage with modern aesthetics",
        "Creative vision showcasing African style"
      ],
      techStack: "Modern web design",
      html_url: "#",
      homepage: "https://mustaphafashions.co.ke/",
      stargazers_count: 178,
      forks_count: 45,
      language: "TypeScript",
      topics: ["fashion", "african-style", "design"],
      icon: User,
      image: "/lovable-uploads/ee0438b5-3260-4b41-bc29-35f0544c7ca8.png"
    },
    {
      id: 4,
      name: "Rabbit Hole Fitness Lab",
      description: "An interactive platform exploring fitness science, calisthenics, and nutrition with evidence-based guides.",
      fullDescription: "Rabbit Hole Fitness Lab is a comprehensive fitness and education platform that combines scientific research with practical application. The platform offers evidence-based guides, progressive calisthenics programs, and interactive tools for fitness enthusiasts.",
      keyFeatures: [
        "Educational content on fitness and nutrition",
        "Calisthenics progressions and strength programs",
        "Interactive tracking tools",
        "Premium course support"
      ],
      techStack: "Vite, TypeScript, React, shadcn-ui, Tailwind CSS, Supabase",
      html_url: "https://github.com/trader2544/rabbit-hole-fitness-lab",
      homepage: "https://rabbithole.fitness",
      stargazers_count: 275,
      forks_count: 84,
      language: "TypeScript",
      topics: ["fitness", "education", "health"],
      icon: Dumbbell,
      image: "/lovable-uploads/27cca01b-8a73-410d-9248-5b05149fd158.png"
    },
    {
      id: 5,
      name: "PharmaSync Pro AI",
      description: "A pharmacy and clinic management platform for Kenyan healthcare providers with AI-powered insights.",
      fullDescription: "PharmaSync Pro AI is a comprehensive healthcare management platform designed specifically for Kenyan healthcare providers. It combines pharmacy management, clinic operations, and patient care into a unified system with advanced analytics.",
      keyFeatures: [
        "Inventory and sales tracking",
        "Patient medical records & prescriptions",
        "User roles with branch control",
        "Analytics dashboard"
      ],
      techStack: "Vite, TypeScript, React, shadcn-ui, Tailwind CSS",
      html_url: "https://github.com/trader2544/pharma-sync-pro-ai",
      homepage: "https://pharma-sync.netlify.app",
      stargazers_count: 198,
      forks_count: 67,
      language: "TypeScript",
      topics: ["healthcare", "pharmacy", "saas"],
      icon: Pill,
      image: "/lovable-uploads/78339dfa-9d7b-42f1-8336-5185e1ccc0c6.png"
    },
    {
      id: 6,
      name: "MJS Products Limited",
      description: "Top-tier architectural and construction firm website showcasing residential and commercial projects.",
      fullDescription: "MJS Products Limited represents excellence in architectural design and construction services across Kenya. The website showcases their comprehensive portfolio of residential and commercial projects, highlighting their commitment to quality craftsmanship.",
      keyFeatures: [
        "Project showcase and service pages",
        "Company vision, mission, and values",
        "Clean, responsive design",
        "Client-focused structure"
      ],
      techStack: "Vite, TypeScript, React, shadcn-ui, Tailwind CSS",
      html_url: "https://github.com/trader2544/mjs-prods",
      homepage: "https://mjsprods.co.ke",
      stargazers_count: 156,
      forks_count: 43,
      language: "TypeScript",
      topics: ["construction", "architecture", "kenya"],
      icon: Building2,
      image: "/lovable-uploads/18572de8-2218-4d81-8c05-e83cc4169dec.png"
    },
    {
      id: 7,
      name: "Paul Rentals",
      description: "A platform for managing luxury car and property rentals in Nairobi with premium VIP service.",
      fullDescription: "Paul Rentals is an exclusive platform designed for luxury car and property rentals in Nairobi. The platform caters to high-profile clients seeking premium vehicles and properties with seamless booking experiences.",
      keyFeatures: [
        "Easy property and vehicle listing with online booking",
        "Calendar synchronization for availability tracking",
        "Admin dashboard with analytics",
        "VIP service with 24/7 support"
      ],
      techStack: "React, TypeScript, Node.js, Express, MongoDB, AWS",
      html_url: "https://github.com/trader2544/paulrentals.git",
      homepage: "https://paulrentals.netlify.app",
      stargazers_count: 298,
      forks_count: 89,
      language: "TypeScript",
      topics: ["luxury-rentals", "vehicles", "properties"],
      icon: Car,
      image: "/lovable-uploads/4d656ebd-2524-4973-8f90-ca049f965544.png"
    },
    {
      id: 8,
      name: "AfriGrowth",
      description: "A personalized investment advisory platform for African markets with wealth management tools.",
      fullDescription: "AfriGrowth is a cutting-edge investment advisory platform specifically designed for African markets. It provides comprehensive tools for wealth management, detailed market analysis, and extensive financial education resources.",
      keyFeatures: [
        "Market analysis tools and corporate finance planning",
        "Savings and retirement planning guidance",
        "Financial education resources",
        "Responsive, modern UI"
      ],
      techStack: "TypeScript, React, CSS, Radix UI, Node.js",
      html_url: "https://github.com/trader2544/afrigrowth.git",
      homepage: "https://afrigrowth.netlify.app",
      stargazers_count: 124,
      forks_count: 45,
      language: "TypeScript",
      topics: ["fintech", "investment", "africa"],
      icon: TrendingUp,
      image: "/lovable-uploads/c84b6d6c-0b8c-42af-a8b5-4779c3c0f1f2.png"
    },
    {
      id: 9,
      name: "Eco Track",
      description: "Environmental monitoring platform for researchers, conservationists, and policymakers in Kenya.",
      fullDescription: "Eco Track is a sophisticated environmental monitoring platform designed for researchers, conservationists, and policymakers in Kenya. The application provides real-time environmental data tracking and analysis tools.",
      keyFeatures: [
        "Real-time monitoring of environmental metrics",
        "Geospatial mapping for visualizing data",
        "Alerts for abnormal conditions",
        "Tools for data-driven conservation"
      ],
      techStack: "TypeScript, React, Custom CSS",
      html_url: "https://github.com/trader2544/eco-track",
      homepage: "https://eotrack.netlify.app",
      stargazers_count: 167,
      forks_count: 56,
      language: "TypeScript",
      topics: ["environment", "conservation", "sustainability"],
      icon: Leaf,
      image: "/lovable-uploads/f7b6da4f-1260-4f3e-8c2f-2510fe076664.png"
    },
    {
      id: 10,
      name: "Telvix Digital Solutions",
      description: "Full-service digital agency website providing web/mobile development, AI automation, and SaaS solutions.",
      fullDescription: "Telvix Digital Solutions represents a comprehensive digital agency offering end-to-end technology solutions. The platform showcases their expertise in web and mobile development, AI automation, SaaS solutions, and digital marketing services.",
      keyFeatures: [
        "Web & app development services",
        "AI and automation workflows",
        "SaaS solutions and branding",
        "SEO and digital marketing packages"
      ],
      techStack: "Vite, TypeScript, React, shadcn-ui, Tailwind CSS",
      html_url: "https://github.com/trader2544/Telvix",
      homepage: "https://telvix.tech",
      stargazers_count: 234,
      forks_count: 78,
      language: "TypeScript",
      topics: ["digital-agency", "web-development", "ai"],
      icon: Zap,
      image: "/lovable-uploads/a1750ac5-0b00-4671-b6c9-53a03cbb591a.png"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Our Work
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Featured{' '}
              <span className="text-primary">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of successful digital solutions. From e-commerce platforms to healthcare systems, we deliver excellence.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {portfolioProjects.map((project) => {
              const IconComponent = project.icon;
              return (
                <motion.div key={project.id} variants={itemVariants}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="group cursor-pointer h-full bg-card hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-primary/30 overflow-hidden">
                        <div className="aspect-video overflow-hidden bg-muted">
                          <img 
                            src={project.image} 
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                              <IconComponent className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                            </div>
                            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                              {project.name}
                            </h3>
                          </div>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.topics.slice(0, 3).map((topic, index) => (
                              <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                {topic}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                {project.stargazers_count}
                              </span>
                              <span>{project.language}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="group/btn">
                              View
                              <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <DialogTitle className="text-2xl">{project.name}</DialogTitle>
                            <p className="text-sm text-muted-foreground">{project.techStack}</p>
                          </div>
                        </div>
                      </DialogHeader>
                      <div className="space-y-6">
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <p className="text-muted-foreground">{project.fullDescription}</p>
                        <div>
                          <h4 className="font-semibold mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            {project.keyFeatures.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex gap-3">
                          {project.homepage && (
                            <Button asChild className="flex-1">
                              <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                                <Globe className="w-4 h-4 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                          {project.html_url !== "#" && (
                            <Button variant="outline" asChild className="flex-1">
                              <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                Source Code
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-20 py-16 bg-muted/30 rounded-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and turn your vision into reality.
            </p>
            <Button 
              size="lg"
              className="text-lg px-8 py-6 rounded-full group"
              onClick={() => window.location.href = '/quote'}
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;