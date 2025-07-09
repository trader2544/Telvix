
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOEnhancements from '@/components/SEOEnhancements';

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

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBlogPost(id);
    }
  }, [id]);

  const fetchBlogPost = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .eq('published', true)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          setNotFound(true);
        } else {
          console.error('Error fetching blog post:', error);
        }
        return;
      }
      
      setBlogPost(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    const wordCount = textContent.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const sharePost = async () => {
    if (navigator.share && blogPost) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.excerpt || '',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const processContent = (content: string) => {
    // Convert markdown-style formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-lg shadow-md my-4 max-w-full h-auto" loading="lazy">')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-6">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-gray-900 mt-12 mb-8">$1</h1>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary pl-4 italic text-gray-700 my-4">$1</blockquote>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
      .replace(/^- (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/(<li class="mb-2">.*<\/li>)/s, '<ul class="list-disc list-inside my-4 space-y-2">$1</ul>')
      .replace(/^\d+\. (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/\n/g, '<br />');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 pt-20 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
              <div className="aspect-video bg-gray-300 rounded-lg mb-8"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !blogPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <SEOEnhancements 
          title="Post Not Found - Telvix Blog"
          description="The blog post you're looking for doesn't exist or has been removed."
        />
        <Header />
        <main className="container mx-auto px-4 pt-20 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const extractTextFromContent = (htmlContent: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const metaDescription = blogPost.excerpt || extractTextFromContent(blogPost.content).substring(0, 160);
  const keywords = [
    'web development',
    'programming',
    'tutorial',
    'guide',
    blogPost.title.toLowerCase().split(' ').slice(0, 3)
  ].flat().filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <SEOEnhancements 
        title={`${blogPost.title} - Telvix Blog`}
        description={metaDescription}
        keywords={keywords}
        image={blogPost.featured_image_url || blogPost.thumbnail_url || 'https://telvix.app/og-image.jpg'}
        url={`https://telvix.app/blog/${blogPost.id}`}
        type="article"
        publishedTime={blogPost.created_at}
        modifiedTime={blogPost.created_at}
        author="Telvix Team"
      />
      
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          <article>
            {blogPost.featured_image_url && (
              <div className="aspect-video overflow-hidden rounded-lg mb-8 shadow-lg">
                <img 
                  src={blogPost.featured_image_url} 
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {blogPost.title}
              </h1>
              
              {blogPost.excerpt && (
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {blogPost.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={blogPost.created_at}>
                    {formatDate(blogPost.created_at)}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {calculateReadTime(blogPost.content)} min read
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Telvix Team
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={sharePost}
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </header>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div 
                className="prose prose-lg prose-gray max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold 
                  prose-p:text-gray-700 prose-p:leading-relaxed 
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline 
                  prose-strong:text-gray-900 
                  prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-100 prose-pre:border
                  prose-img:rounded-lg prose-img:shadow-md
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                  prose-ul:list-disc prose-ol:list-decimal
                  prose-li:mb-2"
                dangerouslySetInnerHTML={{ 
                  __html: processContent(blogPost.content)
                }}
              />
            </div>

            {/* Call to action */}
            <div className="border-t pt-8 bg-white rounded-lg p-8 shadow-sm">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to start your project?
                </h3>
                <p className="text-gray-600 mb-4">
                  Get in touch with our team to discuss how we can help bring your ideas to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate('/quote')}>
                    Get a Quote
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/blog')}>
                    Read More Articles
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
