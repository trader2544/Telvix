import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOEnhancements from '@/components/SEOEnhancements';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            profiles (
              full_name,
              avatar_url
            )
          `)
          .eq('id', id)
          .eq('published', true)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">{error || 'The requested blog post could not be found.'}</p>
            <Button onClick={() => navigate('/blog')}>
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Convert tags from string to array for rendering
  const tagsArray = typeof post.tags === 'string' ? post.tags.split(',').map((tag: string) => tag.trim()) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOEnhancements 
        title={post.title}
        description={post.excerpt || post.title}
        keywords="blog, telvix, technology, web development"
        ogImage={post.featured_image_url || "/lovable-uploads/93789e97-518e-4b25-a28f-bb7947f42d2c.png"}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog')}
            className="mb-8 hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blog
          </Button>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {post.featured_image_url && (
              <div className="aspect-video w-full">
                <img 
                  src={post.featured_image_url} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                {post.profiles?.avatar_url && (
                  <img 
                    src={post.profiles.avatar_url} 
                    alt={post.profiles.full_name || 'Author'}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-800">
                    {post.profiles?.full_name || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(post.created_at), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>
              
              {tagsArray.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {tagsArray.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
