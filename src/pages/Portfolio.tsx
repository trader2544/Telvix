import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github, Star, GitFork, Globe, Code2, Smartphone, ShoppingBag, Bot, Zap } from 'lucide-react';

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

const Portfolio = () => {
  const [githubUsername, setGithubUsername] = useState('');

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

  // Demo projects with better descriptions
  const demoProjects = [
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include product management, user authentication, shopping cart, and payment processing.",
      html_url: "https://github.com/demo/ecommerce-platform",
      homepage: "https://ecommerce-demo.digitel.co.ke",
      stargazers_count: 245,
      forks_count: 78,
      language: "TypeScript",
      topics: ["react", "nodejs", "ecommerce", "stripe"],
      icon: ShoppingBag,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "AI Chat Application",
      description: "Real-time chat application powered by AI with natural language processing capabilities. Built with React, Socket.io, and OpenAI API integration.",
      html_url: "https://github.com/demo/ai-chat-app",
      homepage: "https://ai-chat.digitel.co.ke",
      stargazers_count: 189,
      forks_count: 52,
      language: "JavaScript",
      topics: ["ai", "chat", "socketio", "openai"],
      icon: Bot,
      image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "SaaS Dashboard",
      description: "Modern SaaS dashboard with analytics, user management, and subscription handling. Features dark/light mode, responsive design, and real-time data visualization.",
      html_url: "https://github.com/demo/saas-dashboard",
      homepage: "https://saas-dashboard.digitel.co.ke",
      stargazers_count: 156,
      forks_count: 34,
      language: "TypeScript",
      topics: ["saas", "dashboard", "analytics", "subscription"],
      icon: Zap,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Mobile App UI Kit",
      description: "Comprehensive mobile app UI kit with 50+ screens, animations, and components. Built with React Native and Expo for cross-platform compatibility.",
      html_url: "https://github.com/demo/mobile-ui-kit",
      homepage: "https://mobile-ui.digitel.co.ke",
      stargazers_count: 298,
      forks_count: 89,
      language: "JavaScript",
      topics: ["react-native", "ui-kit", "mobile", "expo"],
      icon: Smartphone,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Portfolio Website",
      description: "Responsive portfolio website with modern design, smooth animations, and optimized performance. Built with React, Tailwind CSS, and Framer Motion.",
      html_url: "https://github.com/demo/portfolio-website",
      homepage: "https://portfolio.digitel.co.ke",
      stargazers_count: 124,
      forks_count: 45,
      language: "TypeScript",
      topics: ["portfolio", "react", "tailwind", "animation"],
      icon: Globe,
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "Automation Tools",
      description: "Collection of automation tools and scripts for web scraping, API integrations, and workflow automation. Includes Zapier integrations and custom APIs.",
      html_url: "https://github.com/demo/automation-tools",
      homepage: "https://automation.digitel.co.ke",
      stargazers_count: 167,
      forks_count: 56,
      language: "Python",
      topics: ["automation", "zapier", "api", "workflow"],
      icon: Code2,
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const projectsToShow = repositories && repositories.length > 0 ? repositories : demoProjects;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-primary via-primary/90 to-accent text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
              Our <span className="text-accent">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 animate-slide-up">
              Discover our innovative digital solutions that transform businesses and create exceptional user experiences
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Web Development</span>
              <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Mobile Apps</span>
              <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">SaaS Solutions</span>
              <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">AI Integration</span>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
                Each project represents our commitment to excellence and innovation in digital solutions
              </p>
            </div>

            {isLoading && (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading amazing projects...</p>
              </div>
            )}

            {error && (
              <div className="text-center mb-8">
                <p className="text-amber-600 mb-2">Showcasing our demo projects</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsToShow.map((project, index) => {
                const IconComponent = 'icon' in project ? project.icon : Code2;
                const liveUrl = project.homepage || `https://demo-${project.name.toLowerCase().replace(/\s+/g, '-')}.digitel.co.ke`;
                
                return (
                  <Card 
                    key={project.id} 
                    className="group relative bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 rounded-3xl overflow-hidden animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={'image' in project ? project.image : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"}
                        alt={project.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-white text-sm">{project.stargazers_count}</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                          <GitFork className="w-4 h-4 text-blue-400" />
                          <span className="text-white text-sm">{project.forks_count}</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {project.description || 'An innovative digital solution crafted with modern technologies.'}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        {project.language && (
                          <span className="inline-block bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                            {project.language}
                          </span>
                        )}
                        <div className="text-xs text-gray-500">
                          {new Date().getFullYear()}
                        </div>
                      </div>
                      
                      {project.topics && project.topics.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {project.topics.slice(0, 3).map((topic) => (
                            <span key={topic} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              #{topic}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                          onClick={() => window.open(project.html_url, '_blank')}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                          onClick={() => window.open(liveUrl, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up">
              Let's collaborate and bring your digital vision to life with our expertise
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={scrollToTop}
              className="px-8 py-4 text-lg bg-white text-primary hover:bg-white/90 font-semibold"
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
