import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOEnhancements from '@/components/SEOEnhancements';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, ArrowRight, Eye, Tag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}
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
  category_id: string | null;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  };
  blog_categories?: {
    name: string;
    slug: string;
  } | null;
}
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch categories
  const {
    data: categories = []
  } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('blog_categories').select('id, name, slug').order('name');
      if (error) throw error;
      return data as BlogCategory[];
    }
  });
  const {
    data: blogPosts = [],
    isLoading
  } = useQuery({
    queryKey: ['published-blog-posts'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('blog_posts').select(`
          *,
          profiles (
            full_name,
            avatar_url
          ),
          blog_categories (
            name,
            slug
          )
        `).eq('published', true).order('created_at', {
        ascending: false
      });
      if (error) throw error;
      return data as BlogPost[];
    }
  });
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Telvix Blog",
    "description": "Stay updated with the latest trends in web development, AI automation, and digital transformation.",
    "url": "https://telvix.co.ke/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Telvix"
    }
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  return <div className="min-h-screen bg-background">
      <SEOEnhancements title="Telvix Blog - Digital Insights & Industry Expertise | Web Development Kenya" description="Stay updated with the latest trends in web development, AI automation, and digital transformation." keywords="digital agency blog, web development insights, AI automation trends, Kenya tech blog" />
      
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <Header />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Insights &{' '}
              <span className="text-primary">Articles</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover the latest insights, trends, and expert advice in digital transformation, web development, and AI automation.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input type="text" placeholder="Search articles..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-12 h-12 rounded-xl bg-muted/50" aria-label="Search blog articles" />
            </div>

            {/* Category Filter */}
            {categories.length > 0 && <div className="flex flex-wrap justify-center gap-2">
                <button onClick={() => setSelectedCategory(null)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!selectedCategory ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                  All
                </button>
                {categories.map(category => <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category.id ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                    {category.name}
                  </button>)}
              </div>}
          </motion.div>
        </section>

        {/* Blog Posts Grid */}
        <section className="container mx-auto px-4">
          {isLoading ? <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div> : filteredPosts.length > 0 ? <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => <motion.article key={post.id} variants={itemVariants}>
                  <Link to={`/blog/${post.id}`} className="block h-full">
                    <Card className="group h-full bg-card hover:shadow-xl transition-all duration-500 border border-border/50 hover:border-primary/30 overflow-hidden flex flex-col cursor-pointer">
                      <div className="aspect-video overflow-hidden bg-muted">
                        {post.thumbnail_url || post.featured_image_url ? <img src={post.thumbnail_url || post.featured_image_url || ''} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" /> : <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                            <span className="text-4xl">📝</span>
                          </div>}
                      </div>
                      <CardHeader className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          {post.blog_categories ? <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                              <Tag className="w-3 h-3 mr-1" />
                              {post.blog_categories.name}
                            </Badge> : <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                              Blog
                            </Badge>}
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3 mr-1" />
                            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                          </div>
                        </div>
                        <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {post.excerpt && <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                            {post.excerpt}
                          </p>}
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center text-sm text-muted-foreground">
                            {post.profiles?.avatar_url ? <img src={post.profiles.avatar_url} alt={post.profiles.full_name || 'Author'} className="w-6 h-6 rounded-full mr-2" /> : <User className="w-4 h-4 mr-2" />}
                            <span>{post.profiles?.full_name || 'Telvix Team'}</span>
                          </div>
                          <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                            Read More
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.article>)}
            </motion.div> : <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center py-20">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">No Articles Found</h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                {searchTerm || selectedCategory ? "No articles match your search. Try different keywords or categories." : "Stay tuned! Our team is working on amazing content for you."}
              </p>
            </motion.div>}
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Blog;