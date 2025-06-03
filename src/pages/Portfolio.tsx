
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';

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

  // For demo purposes, we'll use a placeholder username
  // In a real implementation, this would be configured by the user
  useEffect(() => {
    setGithubUsername('octocat'); // Replace with actual connected GitHub username
  }, []);

  const { data: repositories, isLoading, error } = useQuery({
    queryKey: ['repositories', githubUsername],
    queryFn: async () => {
      if (!githubUsername) return [];
      const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=12`);
      if (!response.ok) throw new Error('Failed to fetch repositories');
      return response.json() as Repository[];
    },
    enabled: !!githubUsername,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-slide-up">
              Explore our latest projects and innovations from our GitHub repositories
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading projects...</p>
              </div>
            )}

            {error && (
              <div className="text-center">
                <p className="text-red-600 mb-4">Failed to load repositories</p>
                <p className="text-gray-600 text-sm">Using demo data instead</p>
              </div>
            )}

            {repositories && repositories.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {repositories.map((repo, index) => (
                  <Card 
                    key={repo.id} 
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                          {repo.name}
                        </h3>
                        <div className="flex space-x-1 text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span className="text-sm">{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GitFork className="w-4 h-4" />
                            <span className="text-sm">{repo.forks_count}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {repo.description || 'No description available'}
                      </p>
                      
                      {repo.language && (
                        <div className="mb-4">
                          <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                            {repo.language}
                          </span>
                        </div>
                      )}
                      
                      {repo.topics && repo.topics.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-1">
                          {repo.topics.slice(0, 3).map((topic) => (
                            <span key={topic} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => window.open(repo.html_url, '_blank')}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                        {repo.homepage && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => window.open(repo.homepage, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && (!repositories || repositories.length === 0) && (
              <div className="text-center py-16">
                <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No repositories found</h3>
                <p className="text-gray-600">Connect your GitHub account to display your projects</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's collaborate on your next digital innovation
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={scrollToTop}
              className="px-8 py-4 text-lg"
            >
              Contact Us Today
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
