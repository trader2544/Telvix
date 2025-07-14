import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Github, Globe, Smartphone, Code, Zap, ShoppingBag, TrendingUp, Calendar, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Elso Boutique',
      category: 'E-commerce',
      description: 'A luxury fashion e-commerce platform featuring curated collections and premium shopping experience.',
      image: '/lovable-uploads/a1750ac5-0b00-4671-b6c9-53a03cbb591a.png',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      liveUrl: 'https://elsoboutique.co.ke',
      githubUrl: 'https://github.com/trader2544/elso-boutique',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Rabbit Hole Fitness Lab',
      category: 'Fitness & Education',
      description: 'An interactive platform exploring fitness science, calisthenics, and nutrition with evidence-based guides.',
      image: '/lovable-uploads/0083ef7e-4274-4cdf-86ac-ddf6b59accd5.png',
      technologies: ['Vite', 'TypeScript', 'React', 'shadcn-ui', 'Tailwind CSS', 'Supabase'],
      liveUrl: 'https://rabbithole.fitness',
      githubUrl: 'https://github.com/trader2544/rabbit-hole-fitness-lab',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'MJS Products',
      category: 'Construction & Design',
      description: 'A top-tier architectural and construction firm website reflecting their values, portfolio, and professionalism.',
      image: '/lovable-uploads/78339dfa-9d7b-42f1-8336-5185e1ccc0c6.png',
      technologies: ['Vite', 'TypeScript', 'React', 'shadcn-ui', 'Tailwind CSS'],
      liveUrl: 'https://mjsprods.co.ke',
      githubUrl: 'https://github.com/trader2544/mjs-prods',
      status: 'completed'
    },
    {
      id: 4,
      title: 'PharmaSync Pro AI',
      category: 'SaaS – Healthcare',
      description: 'A pharmacy and clinic management platform for Kenyan healthcare providers with inventory and analytics.',
      image: '/lovable-uploads/18572de8-2218-4d81-8c05-e83cc4169dec.png',
      technologies: ['Vite', 'TypeScript', 'React', 'shadcn-ui', 'Tailwind CSS'],
      liveUrl: 'https://pharma-sync.netlify.app',
      githubUrl: 'https://github.com/trader2544/pharma-sync-pro-ai',
      status: 'in-progress'
    },
    {
      id: 5,
      title: 'Kwa Kamande Space',
      category: 'Real Estate',
      description: 'A modern real estate platform showcasing premium properties with virtual tours and advanced search capabilities.',
      image: '/lovable-uploads/27cca01b-8a73-410d-9248-5b05149fd158.png',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://kwakamande.co.ke',
      githubUrl: 'https://github.com/trader2544/kwa-kamande',
      status: 'completed'
    },
    {
      id: 6,
      title: 'Paul Rentals',
      category: 'Rental Management',
      description: 'Comprehensive rental management system for property owners with tenant tracking and payment processing.',
      image: '/placeholder.svg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      liveUrl: 'https://paulrentals.demo.com',
      githubUrl: 'https://github.com/trader2544/paul-rentals',
      status: 'completed'
    },
    {
      id: 7,
      title: 'AfriGrowth Capital',
      category: 'Financial Services',
      description: 'Investment platform connecting African entrepreneurs with global investors and funding opportunities.',
      image: '/placeholder.svg',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      liveUrl: 'https://afrigrowth.demo.com',
      githubUrl: 'https://github.com/trader2544/afrigrowth',
      status: 'completed'
    },
    {
      id: 8,
      title: 'EcoTrack Kenya',
      category: 'Environmental',
      description: 'Environmental monitoring dashboard tracking carbon footprint and sustainability metrics for Kenyan businesses.',
      image: '/placeholder.svg',
      technologies: ['Vue.js', 'TypeScript', 'Chart.js', 'Firebase'],
      liveUrl: 'https://ecotrack.demo.com',
      githubUrl: 'https://github.com/trader2544/ecotrack',
      status: 'completed'
    },
    {
      id: 9,
      title: 'Portfolio Template',
      category: 'Developer Portfolio',
      description: 'A customizable, responsive personal portfolio designed to showcase projects, experience, and contact info.',
      image: '/placeholder.svg',
      technologies: ['Vite', 'TypeScript', 'React', 'shadcn-ui', 'Tailwind CSS'],
      liveUrl: 'https://patrick1portfolio.netlify.app',
      githubUrl: 'https://github.com/trader2544/portfolio-',
      status: 'completed'
    },
    {
      id: 10,
      title: 'Telvix Digital Solutions',
      category: 'Digital Agency',
      description: 'Website for a full-service digital agency providing solutions in web/mobile development, AI automation, and SaaS.',
      image: '/placeholder.svg',
      technologies: ['Vite', 'TypeScript', 'React', 'shadcn-ui', 'Tailwind CSS'],
      liveUrl: 'https://telvix.tech',
      githubUrl: 'https://github.com/trader2544/Telvix',
      status: 'completed'
    },
    {
      id: 11,
      title: 'SkyNet Aerospace',
      category: 'Aerospace',
      description: 'Advanced aerospace engineering solutions with drone technology and satellite communication systems.',
      image: '/placeholder.svg',
      technologies: ['React', 'TypeScript', 'Three.js', 'WebGL'],
      liveUrl: 'https://skynet.demo.com',
      githubUrl: 'https://github.com/trader2544/skynet',
      status: 'completed'
    },
    {
      id: 12,
      title: 'NuchoBlackHatey',
      category: 'Cybersecurity',
      description: 'Cybersecurity platform offering penetration testing services and security audits for enterprise clients.',
      image: '/placeholder.svg',
      technologies: ['Python', 'Django', 'React', 'PostgreSQL'],
      liveUrl: 'https://nuchoblackhatey.demo.com',
      githubUrl: 'https://github.com/trader2544/nuchoblackhatey',
      status: 'completed'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: Globe },
    { id: 'E-commerce', name: 'E-commerce', icon: ShoppingBag },
    { id: 'SaaS – Healthcare', name: 'SaaS', icon: Code },
    { id: 'Real Estate', name: 'Real Estate', icon: TrendingUp },
    { id: 'Fitness & Education', name: 'Education', icon: Zap },
    { id: 'Mobile App', name: 'Mobile Apps', icon: Smartphone }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'in-progress':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            In Progress
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary via-primary/90 to-accent text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 md:mb-8 animate-fade-in">
              Our <span className="text-accent">Portfolio</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-4xl mx-auto mb-6 md:mb-8 animate-slide-up">
              Showcasing our latest projects and innovative solutions
            </p>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:inline">{category.name}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        {getStatusBadge(project.status)}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <Badge variant="outline">{project.category}</Badge>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button asChild size="sm" className="flex-1">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
