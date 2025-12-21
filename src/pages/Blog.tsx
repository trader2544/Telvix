import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOEnhancements from '@/components/SEOEnhancements';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, ArrowRight, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  created_at: string;
  author_id: string;
  thumbnail_url: string | null;
  featured_image_url: string | null;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch published blog posts from Supabase
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ['published-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    }
  });

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Telvix Blog",
    "description": "Stay updated with the latest trends in web development, AI automation, and digital transformation.",
    "url": "https://telvix.co.ke/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Telvix",
      "logo": {
        "@type": "ImageObject",
        "url": "https://telvix.co.ke/logo.png"
      }
    },
    "blogPost": filteredPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || "",
      "datePublished": post.created_at,
      "author": {
        "@type": "Person",
        "name": post.profiles?.full_name || "Telvix Team"
      },
      "image": post.featured_image_url || post.thumbnail_url || "",
      "url": `https://telvix.co.ke/blog/${post.id}`
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOEnhancements
        title="Telvix Blog - Digital Insights & Industry Expertise | Web Development Kenya"
        description="Stay updated with the latest trends in web development, AI automation, and digital transformation. Expert insights from Telvix's team of professionals in Kenya."
        keywords="digital agency blog, web development insights, AI automation trends, digital transformation tips, Kenya tech blog, software development Kenya"
      />
      
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Telvix Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover the latest insights, trends, and expert advice in digital transformation, 
              web development, and AI automation from Kenya's leading digital agency.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 backdrop-blur-sm"
                aria-label="Search blog articles"
              />
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id}>
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        {post.thumbnail_url || post.featured_image_url ? (
                          <img
                            src={post.thumbnail_url || post.featured_image_url || ''}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <span className="text-4xl">📝</span>
                          </div>
                        )}
                      </div>
                      <CardHeader className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">
                            Blog
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3 mr-1" />
                            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                          </div>
                        </div>
                        <CardTitle className="text-xl group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {post.excerpt && (
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center text-sm text-muted-foreground">
                            {post.profiles?.avatar_url ? (
                              <img 
                                src={post.profiles.avatar_url} 
                                alt={post.profiles.full_name || 'Author'} 
                                className="w-6 h-6 rounded-full mr-2"
                              />
                            ) : (
                              <User className="w-4 h-4 mr-1" />
                            )}
                            <span>{post.profiles?.full_name || 'Telvix Team'}</span>
                          </div>
                          <Link to={`/blog/${post.id}`} aria-label={`Read more about ${post.title}`}>
                            <Button variant="ghost" size="sm" className="group/btn">
                              Read More
                              <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No Articles Found</h2>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  {searchTerm 
                    ? "No articles match your search. Try different keywords."
                    : "Stay tuned! Our team is working on amazing content for you."
                  }
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
