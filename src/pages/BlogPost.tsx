import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import SEOEnhancements from '@/components/SEOEnhancements';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Share2, Clock } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: async () => {
      if (!id) throw new Error('No post ID provided');
      
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
      return data;
    },
    enabled: !!id
  });

  // Convert markdown-style content to HTML
  const parseContent = (content: string) => {
    if (!content) return '';
    
    let html = content
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3 text-gray-800">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-800">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Underline
      .replace(/<u>(.*?)<\/u>/g, '<u class="underline">$1</u>')
      // Images - make them responsive and visible
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<figure class="my-6"><img src="$2" alt="$1" class="w-full max-w-3xl mx-auto rounded-lg shadow-lg" loading="lazy" /><figcaption class="text-center text-sm text-gray-500 mt-2">$1</figcaption></figure>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:text-accent underline transition-colors" target="_blank" rel="noopener noreferrer">$1</a>')
      // Lists
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 italic my-4 text-gray-600">$1</blockquote>')
      // Line breaks
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
      .replace(/\n/g, '<br />');
    
    return `<p class="mb-4 text-gray-700 leading-relaxed">${html}</p>`;
  };

  // Estimate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt || '',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📄</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you are looking for does not exist or has been removed.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const publishedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || "",
    "image": post.featured_image_url || post.thumbnail_url || "",
    "datePublished": post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "author": {
      "@type": "Person",
      "name": post.profiles?.full_name || "Telvix Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Telvix",
      "logo": {
        "@type": "ImageObject",
        "url": "https://telvix.co.ke/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://telvix.co.ke/blog/${post.id}`
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOEnhancements
        title={`${post.title} | Telvix Blog`}
        description={post.excerpt || `Read ${post.title} on Telvix Blog - Expert insights on web development and digital transformation in Kenya.`}
        keywords={`${post.title}, blog, technology, web development, Kenya, digital transformation`}
        image={post.featured_image_url || post.thumbnail_url || ''}
      />
      
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <Header />
      
      <main className="pt-20">
        {/* Featured Image */}
        {post.featured_image_url && (
          <div className="w-full h-64 md:h-96 lg:h-[500px] relative overflow-hidden">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center text-primary hover:text-accent transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          {/* Article Header */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              {/* Author */}
              <div className="flex items-center">
                {post.profiles?.avatar_url ? (
                  <img
                    src={post.profiles.avatar_url}
                    alt={post.profiles.full_name || 'Author'}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-800">{post.profiles?.full_name || 'Telvix Team'}</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>
              
              {/* Date */}
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={post.created_at}>{publishedDate}</time>
              </div>
              
              {/* Reading Time */}
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{getReadingTime(post.content)}</span>
              </div>
              
              {/* Share Button */}
              <Button variant="outline" size="sm" onClick={handleShare} className="ml-auto">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
            
            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-primary pl-4 italic">
                {post.excerpt}
              </p>
            )}
          </header>
          
          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-primary prose-img:rounded-lg prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: parseContent(post.content) }}
          />
          
          {/* Post Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-600">
                Thank you for reading! Share this article if you found it helpful.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
                <Link to="/blog">
                  <Button>
                    More Articles
                  </Button>
                </Link>
              </div>
            </div>
          </footer>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
