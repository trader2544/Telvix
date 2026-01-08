import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import SEOEnhancements from '@/components/SEOEnhancements';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Share2, Clock, ArrowRight } from 'lucide-react';

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

  const parseContent = (content: string) => {
    if (!content) return '';
    
    let html = content
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3 text-foreground">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-foreground">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4 text-foreground">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<u class="underline">$1</u>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<figure class="my-6"><img src="$2" alt="$1" class="w-full max-w-3xl mx-auto rounded-xl" loading="lazy" /><figcaption class="text-center text-sm text-muted-foreground mt-2">$1</figcaption></figure>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline transition-colors" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">$1</blockquote>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-muted-foreground leading-relaxed">')
      .replace(/\n/g, '<br />');
    
    return `<p class="mb-4 text-muted-foreground leading-relaxed">${html}</p>`;
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📄</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you are looking for does not exist or has been removed.</p>
            <Link to="/blog">
              <Button className="group">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>
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

  return (
    <div className="min-h-screen bg-background">
      <SEOEnhancements
        title={`${post.title} | Telvix Blog`}
        description={post.excerpt || `Read ${post.title} on Telvix Blog`}
        keywords={`${post.title}, blog, technology, web development`}
        image={post.featured_image_url || post.thumbnail_url || ''}
      />
      
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Featured Image */}
        {post.featured_image_url && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-64 md:h-96 lg:h-[500px] relative overflow-hidden"
          >
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </motion.div>
        )}
        
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="py-8"
          >
            <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </motion.div>
          
          {/* Article Header */}
          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center">
                {post.profiles?.avatar_url ? (
                  <img
                    src={post.profiles.avatar_url}
                    alt={post.profiles.full_name || 'Author'}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-foreground">{post.profiles?.full_name || 'Telvix Team'}</p>
                  <p className="text-sm">Author</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={post.created_at}>{publishedDate}</time>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{getReadingTime(post.content)}</span>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleShare} className="ml-auto">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
            
            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-4">
                {post.excerpt}
              </p>
            )}
          </motion.header>
          
          {/* Article Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: parseContent(post.content) }}
          />
          
          {/* Post Footer */}
          <motion.footer 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground">
                Thank you for reading! Share this article if you found it helpful.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
                <Link to="/blog">
                  <Button className="group">
                    More Articles
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.footer>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;