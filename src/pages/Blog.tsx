
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOEnhancements from '@/components/SEOEnhancements';
import { useNavigate } from 'react-router-dom';
import { initializeSampleBlogPosts } from '@/utils/initializeBlogPosts';

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
    const initializeAndFetchPosts = async () => {
      // Initialize sample posts if none exist
      await initializeSampleBlogPosts();
      // Then fetch all posts
      await fetchBlogPosts();
    };

    initializeAndFetchPosts();
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

  const extractTextFromContent = (htmlContent: string) => {
    // Remove HTML tags and get plain text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <SEOEnhancements 
          title="Blog - Telvix | Loading..."
          description="Loading the latest insights and updates from Telvix team"
        />
        <Header />
        <main className="container mx-auto px-4 pt-20 pb-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <SEOEnhancements 
        title="Blog - Telvix | Web Development Insights & Tips"
        description="Discover the latest insights, tips, and updates from the Telvix team. Stay updated with web development trends, best practices, and industry news."
        keywords={['web development blog', 'React tutorials', 'JavaScript tips', 'Node.js guides', 'TypeScript best practices', 'web design trends']}
        url="https://telvix.app/blog"
        type="website"
      />
      
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, tips, and updates from the Telvix team. Stay ahead with the latest in web development, design trends, and technology innovations.
            </p>
          </div>

          {blogPosts.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {blogPosts.map((post) => (
                <article key={post.id}>
                  <Card 
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer h-full flex flex-col"
                    onClick={() => handlePostClick(post.id)}
                  >
                    {post.thumbnail_url && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={post.thumbnail_url} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3 flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <CardTitle className="text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <Badge variant="secondary" className="shrink-0 text-xs">
                          {new Date(post.created_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </Badge>
                      </div>
                      {post.excerpt && (
                        <CardDescription className="text-sm line-clamp-3 mt-2">
                          {post.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0 mt-auto">
                      <div className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {extractTextFromContent(post.content).substring(0, 150)}...
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-xs text-muted-foreground">
                          {Math.ceil(extractTextFromContent(post.content).length / 200)} min read
                        </span>
                        <span className="text-xs text-primary font-medium group-hover:underline">
                          Read more →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No posts yet
              </h2>
              <p className="text-gray-600">
                Check back soon for our latest insights and updates!
              </p>
            </div>
          )}

          {/* Additional SEO content */}
          <section className="mt-16 bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About Our Blog
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to the Telvix blog, where we share our expertise in web development, mobile applications, 
              and digital transformation. Our team of experienced developers and designers regularly publish 
              articles covering the latest trends in React, Node.js, TypeScript, and modern web technologies. 
              Whether you're a beginner looking to learn the basics or an experienced developer seeking advanced 
              techniques, our blog provides valuable insights to help you build better digital experiences.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
