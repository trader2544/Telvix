
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 pt-20 pb-8">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Helmet>
        <title>Blog - Telvix | Web Development Insights & Tips</title>
        <meta name="description" content="Discover the latest insights, tips, and updates from the Telvix team. Stay updated with web development trends, best practices, and industry news." />
        <meta property="og:title" content="Blog - Telvix | Web Development Insights & Tips" />
        <meta property="og:description" content="Discover the latest insights, tips, and updates from the Telvix team. Stay updated with web development trends, best practices, and industry news." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://telvix.app/blog" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Blog - Telvix | Web Development Insights & Tips" />
        <meta name="twitter:description" content="Discover the latest insights, tips, and updates from the Telvix team. Stay updated with web development trends, best practices, and industry news." />
        <link rel="canonical" href="https://telvix.app/blog" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
            <p className="text-xl text-gray-600">
              Insights, tips, and updates from the Telvix team
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <Card 
                key={post.id} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
                onClick={() => handlePostClick(post.id)}
              >
                {post.thumbnail_url && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.thumbnail_url} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {new Date(post.created_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </Badge>
                  </div>
                  {post.excerpt && (
                    <CardDescription className="text-sm line-clamp-3 mt-2">
                      {post.excerpt}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div 
                    className="prose prose-sm prose-gray max-w-none line-clamp-4 text-muted-foreground"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content.replace(/\n/g, '<br />').substring(0, 200) + '...'
                    }}
                  />
                  <div className="mt-4 pt-4 border-t">
                    <span className="text-xs text-muted-foreground">
                      {Math.ceil(post.content.length / 1000)} min read
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {blogPosts.length === 0 && (
              <div className="text-center py-12 col-span-full">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  No posts yet
                </h2>
                <p className="text-gray-600">
                  Check back soon for our latest insights and updates!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
