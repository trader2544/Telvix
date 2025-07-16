
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Github, Star, GitFork, Globe, Code2, Smartphone, ShoppingBag, Bot, Zap, Shield, Car, TrendingUp, Leaf, Newspaper, Building2, Dumbbell, Pill, User } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

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
  const [githubUsername, setGithubUsername] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  useEffect(() => {
    setGithubUsername('octocat');
  }, []);

  const { data: repositories, isLoading, error } = useQuery({
    queryKey: ['repositories', githubUsername],
    queryFn: async (): Promise<Repository[]> => {
      if (!githubUsername) return [];
      const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=12`);
      if (!response.ok) throw new Error('Failed to fetch repositories');
      return await response.json();
    },
    enabled: !!githubUsername,
  });

  // Real portfolio projects with uploaded images - reordered as requested
  const portfolioProjects: ProjectDetails[] = [
    {
      id: 1,
      name: "Elso Boutique",
      description: "A modern e-commerce platform celebrating Kenyan craftsmanship, connecting shoppers with unique, high-quality local products while empowering artisans with robust seller tools.",
      fullDescription: "Elso Boutique is a sophisticated e-commerce platform that showcases the finest Kenyan craftsmanship. From handwoven baskets to contemporary fashion and specialty foods, the platform connects global shoppers with authentic local artisans while providing comprehensive seller management tools.",
      keyFeatures: [
        "Curated marketplace for handwoven baskets, fashion, and specialty foods",
        "Fast, secure shopping with M-Pesa integration and intuitive navigation",
        "Seller dashboards for inventory and customer management",
        "Personalized recommendations and responsive support"
      ],
      techStack: "Vite, TypeScript, React, Tailwind CSS, shadcn-ui",
      html_url: "https://github.com/trader2544/atelier-rose-commerce-kenya.git",
      homepage: "https://elso-atelier.com",
      stargazers_count: 189,
      forks_count: 52,
      language: "TypeScript",
      topics: ["ecommerce", "kenya", "craftsmanship", "marketplace"],
      icon: ShoppingBag,
      image: "/lovable-uploads/800f1963-e15d-431c-93b2-0438d92c9417.png"
    },
    {
      id: 2,
      name: "Rabbit Hole Fitness Lab",
      description: "An interactive platform exploring fitness science, calisthenics, and nutrition. Features evidence-based guides, step-by-step tutorials, and tools for tracking training and recovery.",
      fullDescription: "Rabbit Hole Fitness Lab is a comprehensive fitness and education platform that combines scientific research with practical application. The platform offers evidence-based guides, progressive calisthenics programs, and interactive tools for fitness enthusiasts and professionals.",
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
      topics: ["fitness", "education", "calisthenics", "health"],
      icon: Dumbbell,
      image: "/lovable-uploads/27cca01b-8a73-410d-9248-5b05149fd158.png"
    },
    {
      id: 3,
      name: "MJS Products Limited",
      description: "MJS Products Limited is a top-tier architectural and construction firm in Nairobi, Kenya. This site reflects their values, portfolio, and professionalism in residential and commercial projects.",
      fullDescription: "MJS Products Limited represents excellence in architectural design and construction services across Kenya. The website showcases their comprehensive portfolio of residential and commercial projects, highlighting their commitment to quality craftsmanship and innovative design solutions.",
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
      topics: ["construction", "architecture", "kenya", "design"],
      icon: Building2,
      image: "/lovable-uploads/18572de8-2218-4d81-8c05-e83cc4169dec.png"
    },
    {
      id: 4,
      name: "PharmaSync Pro AI",
      description: "A pharmacy and clinic management platform for Kenyan healthcare providers. Streamlines inventory, billing, patient records, and analytics—all in a single web dashboard.",
      fullDescription: "PharmaSync Pro AI is a comprehensive healthcare management platform designed specifically for Kenyan healthcare providers. It combines pharmacy management, clinic operations, and patient care into a unified system with advanced analytics and AI-powered insights.",
      keyFeatures: [
        "Inventory and sales tracking",
        "Patient medical records & prescriptions",
        "User roles with branch control",
        "Switchable Clinic/Pharmacy modes",
        "Analytics dashboard"
      ],
      techStack: "Vite, TypeScript, React, shadcn-ui, Tailwind CSS",
      html_url: "https://github.com/trader2544/pharma-sync-pro-ai",
      homepage: "https://pharma-sync.netlify.app",
      stargazers_count: 198,
      forks_count: 67,
      language: "TypeScript",
      topics: ["healthcare", "pharmacy", "saas", "kenya"],
      icon: Pill,
      image: "/lovable-uploads/78339dfa-9d7b-42f1-8336-5185e1ccc0c6.png"
    },
    {
      id: 5,
      name: "Kwa Kamande Space",
      description: "A web application for managing rental spaces, offering tools for landlords and tenants to handle rent payments, maintenance requests, and property announcements.",
      fullDescription: "Kwa Kamande Space is a comprehensive rental management platform designed to streamline property management for both landlords and tenants. The platform offers intuitive dashboards, automated payment tracking, and efficient communication tools.",
      keyFeatures: [
        "Tenant dashboard for house assignments, rent status, and maintenance requests",
        "Admin tools for rent tracking, tenant management, and monthly stats",
        "Maintenance request system for tenants and admins",
        "Announcement system for targeted or property-wide updates"
      ],
      techStack: "React, TypeScript, Vite, Tailwind CSS, shadcn-ui, Radix UI, Supabase",
      html_url: "https://github.com/trader2544/kwa-space-manager.git",
      homepage: "https://kwakamande.space",
      stargazers_count: 156,
      forks_count: 34,
      language: "TypeScript",
      topics: ["property-management", "rental", "dashboard", "supabase"],
      icon: Globe,
      image: "/lovable-uploads/75ecb35e-46da-4797-96de-0c0bd5d64bf8.png"
    },
    {
      id: 6,
      name: "Paul Rentals",
      description: "A platform for managing and automating luxury car and property rentals in Nairobi, Kenya, with a focus on premium service for high-profile clients.",
      fullDescription: "Paul Rentals is an exclusive platform designed for luxury car and property rentals in Nairobi. The platform caters to high-profile clients seeking premium vehicles and properties with seamless booking experiences and VIP service.",
      keyFeatures: [
        "Easy property and vehicle listing with online booking and payment",
        "Calendar synchronization for availability tracking",
        "Admin dashboard with analytics for bookings and revenue",
        "VIP service with 24/7 support for distinguished clients"
      ],
      techStack: "React, TypeScript, Node.js, Express, MongoDB, Firebase, Docker, AWS",
      html_url: "https://github.com/trader2544/paulrentals.git",
      homepage: "https://paulrentals.netlify.app",
      stargazers_count: 298,
      forks_count: 89,
      language: "TypeScript",
      topics: ["luxury-rentals", "vehicles", "properties", "nairobi"],
      icon: Car,
      image: "/lovable-uploads/4d656ebd-2524-4973-8f90-ca049f965544.png"
    },
    {
      id: 7,
      name: "AfriGrowth",
      description: "A personalized investment advisory platform for African markets, offering tools for wealth management, market analysis, and financial education.",
      fullDescription: "AfriGrowth is a cutting-edge investment advisory platform specifically designed for African markets. It provides comprehensive tools for wealth management, detailed market analysis, and extensive financial education resources to empower investors across the continent.",
      keyFeatures: [
        "Market analysis tools and corporate finance planning",
        "Savings and retirement planning guidance",
        "Financial education resources for users",
        "Responsive, modern UI for seamless user experience"
      ],
      techStack: "TypeScript, React, CSS, Radix UI, Lucide React, Node.js",
      html_url: "https://github.com/trader2544/afrigrowth.git",
      homepage: "https://afrigrowth.netlify.app",
      stargazers_count: 124,
      forks_count: 45,
      language: "TypeScript",
      topics: ["fintech", "investment", "africa", "wealth-management"],
      icon: TrendingUp,
      image: "/lovable-uploads/c84b6d6c-0b8c-42af-a8b5-4779c3c0f1f2.png"
    },
    {
      id: 8,
      name: "Eco Track",
      description: "A private web application for tracking and managing environmental and sustainability activities in Kenya, designed for researchers, conservationists, and policymakers.",
      fullDescription: "Eco Track is a sophisticated environmental monitoring platform designed for researchers, conservationists, and policymakers in Kenya. The application provides real-time environmental data tracking and analysis tools to support conservation efforts and policy-making.",
      keyFeatures: [
        "Real-time monitoring of environmental metrics (temperature, air quality, rainfall)",
        "Geospatial mapping for visualizing environmental data",
        "Alerts for abnormal environmental conditions",
        "Tools for data-driven conservation and community empowerment"
      ],
      techStack: "TypeScript, React, Custom CSS",
      html_url: "https://github.com/trader2544/eco-track",
      homepage: "https://eotrack.netlify.app",
      stargazers_count: 167,
      forks_count: 56,
      language: "TypeScript",
      topics: ["environment", "conservation", "kenya", "sustainability"],
      icon: Leaf,
      image: "/lovable-uploads/f7b6da4f-1260-4f3e-8c2f-2510fe076664.png"
    },
    {
      id: 9,
      name: "Portfolio Template",
      description: "A customizable, responsive personal portfolio designed to showcase your projects, experience, and contact info in a polished format.",
      fullDescription: "Portfolio Template is a modern, fully responsive personal portfolio solution designed for developers, designers, and creative professionals. The template offers clean aesthetics, smooth animations, and easy customization options to help professionals showcase their work effectively.",
      keyFeatures: [
        "Project gallery with links and images",
        "'About Me' storytelling section",
        "Contact and social media integration",
        "Easy to modify layout and content"
      ],
      techStack: "Vite, TypeScript, React, shadcn-ui, Tailwind CSS",
      html_url: "https://github.com/trader2544/portfolio-",
      homepage: "https://patrick1portfolio.netlify.app",
      stargazers_count: 89,
      forks_count: 23,
      language: "TypeScript",
      topics: ["portfolio", "template", "responsive", "developer"],
      icon: User,
      image: "/lovable-uploads/0083ef7e-4274-4cdf-86ac-ddf6b59accd5.png"
    },
    {
      id: 10,
      name: "Telvix Digital Solutions",
      description: "Website for a full-service digital agency providing solutions in web/mobile development, AI automation, SaaS, and digital marketing.",
      fullDescription: "Telvix Digital Solutions represents a comprehensive digital agency offering end-to-end technology solutions. The platform showcases their expertise in web and mobile development, AI automation, SaaS solutions, and comprehensive digital marketing services for businesses of all sizes.",
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
      topics: ["digital-agency", "web-development", "ai", "saas"],
      icon: Zap,
      image: "/lovable-uploads/a1750ac5-0b00-4671-b6c9-53a03cbb591a.png"
    },
    {
      id: 11,
      name: "SkyNet",
      description: "A modern platform combining news aggregation with VPN sales and management, offering secure browsing and real-time updates.",
      fullDescription: "SkyNet is an innovative platform that combines comprehensive news aggregation with VPN services. It offers users real-time news updates while providing secure browsing capabilities through integrated VPN services, creating a complete digital information and security solution.",
      keyFeatures: [
        "Real-time news aggregation and intelligent categorization",
        "VPN purchase and subscription management",
        "Secure browsing with integrated VPN services",
        "Customizable alerts and notifications"
      ],
      techStack: "Python/Node.js (backend), React/Vue.js (frontend), MongoDB/PostgreSQL, VPN and news APIs",
      html_url: "https://github.com/trader2544/newskynet",
      homepage: "https://skynetoffical.netlify.app",
      stargazers_count: 203,
      forks_count: 67,
      language: "JavaScript",
      topics: ["news", "vpn", "aggregation", "security"],
      icon: Newspaper,
      image: "/lovable-uploads/4ec2be6e-7e3b-4e44-b57e-171dc5bd4c10.png"
    },
    {
      id: 12,
      name: "NuchoBlackHatey",
      description: "A web platform delivering secure, high-speed VPN configuration files for private and region-unlocked internet access, supporting OpenVPN and WireGuard protocols.",
      fullDescription: "NuchoBlackHatey is a comprehensive VPN platform that provides users with secure, high-speed internet access through carefully optimized configuration files. The platform supports both OpenVPN and WireGuard protocols, ensuring compatibility across all major devices and operating systems.",
      keyFeatures: [
        "Pre-configured .ovpn and .conf files for seamless setup",
        "Cross-platform compatibility (Windows, macOS, Linux, iOS, Android)",
        "Optimized for apps like HTTP Custom, HTTP Injector, and Dark Tunnel",
        "Free and premium plans with 24/7 support and setup guides"
      ],
      techStack: "HTML, CSS, JavaScript (static site)",
      html_url: "https://github.com/trader2544/nucho_blackhatey.site.git",
      homepage: "http://nuchoblackhatey.ct.ws",
      stargazers_count: 245,
      forks_count: 78,
      language: "JavaScript",
      topics: ["vpn", "security", "privacy", "networking"],
      icon: Shield,
      image: "/lovable-uploads/3c7281a2-ebad-4c8a-b44b-77093874a604.png"
    }
  ];

  const projectsToShow = repositories && repositories.length > 0 ? repositories : portfolioProjects;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/50">
      <Header />
      
      <main className="pt-16">
        {/* Projects Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 animate-fade-in">
                Featured Projects
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
                Each project represents our commitment to excellence and innovation in digital solutions
              </p>
            </div>

            {isLoading && (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading amazing projects...</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {portfolioProjects.map((project, index) => {
                const IconComponent = project.icon;
                
                return (
                  <Card 
                    key={project.id} 
                    className="group relative bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl overflow-hidden animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Project Image */}
                    <div className="relative h-32 md:h-40 overflow-hidden">
                      <img 
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-2 left-2">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-white text-xs">{project.stargazers_count}</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                          <GitFork className="w-3 h-3 text-blue-400" />
                          <span className="text-white text-xs">{project.forks_count}</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {project.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        {project.language && (
                          <span className="inline-block bg-gradient-to-r from-primary to-accent text-white px-2 py-1 rounded-full text-xs font-medium">
                            {project.language}
                          </span>
                        )}
                        <div className="text-xs text-gray-500">
                          {new Date().getFullYear()}
                        </div>
                      </div>
                      
                      {project.topics && project.topics.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1">
                          {project.topics.slice(0, 2).map((topic) => (
                            <span key={topic} className="inline-block bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-full text-xs">
                              #{topic}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex space-x-1 mb-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-xs py-1.5"
                          onClick={() => window.open(project.html_url, '_blank')}
                        >
                          <Github className="w-3 h-3 mr-1" />
                          Code
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 border-primary text-primary hover:bg-primary hover:text-white text-xs py-1.5"
                          onClick={() => window.open(project.homepage, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Live
                        </Button>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="w-full text-primary hover:bg-primary/10 text-xs py-1.5"
                            onClick={() => setSelectedProject(project)}
                          >
                            More Info
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-3">
                              <IconComponent className="w-8 h-8" />
                              {project.name}
                            </DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-6">
                            <img 
                              src={project.image}
                              alt={project.name}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            
                            <div>
                              <h4 className="text-lg font-semibold mb-2">About</h4>
                              <p className="text-gray-600 leading-relaxed">{project.fullDescription}</p>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                              <ul className="space-y-2">
                                {project.keyFeatures.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-600">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold mb-2">Tech Stack</h4>
                              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{project.techStack}</p>
                            </div>

                            <div className="flex gap-3 pt-4">
                              <Button 
                                className="flex-1"
                                onClick={() => window.open(project.homepage, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Visit Live Site
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => window.open(project.html_url, '_blank')}
                              >
                                <Github className="w-4 h-4 mr-2" />
                                View Code
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto animate-slide-up">
              Let's collaborate and bring your digital vision to life with our expertise
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={scrollToTop}
              className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-white text-primary hover:bg-white/90 font-semibold"
            >
              Start Your Project Today
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
