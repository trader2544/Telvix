import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RichTextEditor from '@/components/RichTextEditor';
import AdminProjectPanel from '@/components/AdminProjectPanel';
import { motion } from 'framer-motion';
import { 
  Trash2, 
  Edit, 
  Eye, 
  FolderKanban, 
  FileText, 
  Copy, 
  Check,
  Sparkles,
  TrendingUp,
  Users,
  FolderOpen
} from 'lucide-react';

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

interface Project {
  id: string;
  project_code: string;
  name: string;
  status: string;
  user_id: string | null;
}

const Admin = () => {
  const { user, profile, loading } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) {
      navigate('/');
    }
  }, [user, profile, loading, navigate]);

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchBlogPosts();
      fetchProjects();
    }
  }, [profile]);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      toast.error('Error fetching blog posts');
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, project_code, name, status, user_id')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      toast.error('Error fetching projects');
    }
  };

  const copyProjectCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Project code copied! Share this with your client.');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const uploadImage = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${path}-${Math.random()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file);
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);
    
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSubmitting(true);
    setUploadingImages(true);
    
    try {
      let thumbnailUrl = editingPost?.thumbnail_url || null;
      let featuredImageUrl = editingPost?.featured_image_url || null;

      if (thumbnailFile) {
        thumbnailUrl = await uploadImage(thumbnailFile, 'thumbnail');
      }

      if (featuredImageFile) {
        featuredImageUrl = await uploadImage(featuredImageFile, 'featured');
      }

      const postData = {
        title,
        content,
        excerpt: excerpt || null,
        published: isPublished,
        author_id: user.id,
        thumbnail_url: thumbnailUrl,
        featured_image_url: featuredImageUrl,
      };

      let error;
      if (editingPost) {
        ({ error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id));
      } else {
        ({ error } = await supabase
          .from('blog_posts')
          .insert([postData]));
      }
      
      if (error) throw error;
      
      toast.success(editingPost ? 'Post updated successfully!' : 'Post created successfully!');
      resetForm();
      fetchBlogPosts();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
      setUploadingImages(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setExcerpt('');
    setIsPublished(false);
    setEditingPost(null);
    setThumbnailFile(null);
    setFeaturedImageFile(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setExcerpt(post.excerpt || '');
    setIsPublished(post.published);
    setThumbnailFile(null);
    setFeaturedImageFile(null);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
      toast.success('Post deleted successfully!');
      fetchBlogPosts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !post.published })
        .eq('id', post.id);
      
      if (error) throw error;
      fetchBlogPosts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user || profile?.role !== 'admin') {
    return null;
  }

  const linkedProjects = projects.filter(p => p.user_id);
  const unlinkedProjects = projects.filter(p => !p.user_id);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <p className="text-muted-foreground">Manage projects, blog posts, and client communications</p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Projects</p>
                    <p className="text-3xl font-bold text-foreground">{projects.length}</p>
                  </div>
                  <div className="p-3 bg-primary/20 rounded-xl">
                    <FolderOpen className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Linked Clients</p>
                    <p className="text-3xl font-bold text-foreground">{linkedProjects.length}</p>
                  </div>
                  <div className="p-3 bg-green-500/20 rounded-xl">
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Blog Posts</p>
                    <p className="text-3xl font-bold text-foreground">{blogPosts.length}</p>
                  </div>
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Codes Quick Access */}
          {unlinkedProjects.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Copy className="w-5 h-5 text-primary" />
                    Share Project Codes with Clients
                  </CardTitle>
                  <CardDescription>
                    Click to copy a project code and share it with your client so they can link their account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {unlinkedProjects.map((project) => (
                      <motion.button
                        key={project.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => copyProjectCode(project.project_code)}
                        className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border hover:border-primary transition-colors group"
                      >
                        <span className="font-mono font-semibold text-sm">{project.project_code}</span>
                        <span className="text-xs text-muted-foreground">({project.name})</span>
                        {copiedCode === project.project_code ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1 rounded-xl">
              <TabsTrigger value="projects" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <FolderKanban className="w-4 h-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <FileText className="w-4 h-4" />
                Create Post
              </TabsTrigger>
              <TabsTrigger value="manage" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Manage Posts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects">
              <AdminProjectPanel />
            </TabsContent>
            
            <TabsContent value="create">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="backdrop-blur-sm bg-card/80">
                  <CardHeader>
                    <CardTitle>{editingPost ? 'Edit Post' : 'Create New Blog Post'}</CardTitle>
                    <CardDescription>
                      {editingPost ? 'Update your blog post' : 'Write and publish a new blog post'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          placeholder="Enter post title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          className="bg-background"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt (Optional)</Label>
                        <Input
                          id="excerpt"
                          placeholder="Brief description of the post"
                          value={excerpt}
                          onChange={(e) => setExcerpt(e.target.value)}
                          className="bg-background"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="thumbnail">Thumbnail Image</Label>
                          <Input
                            id="thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                          />
                          {editingPost?.thumbnail_url && (
                            <div className="mt-2">
                              <img src={editingPost.thumbnail_url} alt="Current thumbnail" className="w-20 h-20 object-cover rounded-lg" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="featured">Featured Image</Label>
                          <Input
                            id="featured"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFeaturedImageFile(e.target.files?.[0] || null)}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                          />
                          {editingPost?.featured_image_url && (
                            <div className="mt-2">
                              <img src={editingPost.featured_image_url} alt="Current featured image" className="w-20 h-20 object-cover rounded-lg" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <RichTextEditor
                          value={content}
                          onChange={setContent}
                          placeholder="Write your blog post content here..."
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="published"
                          checked={isPublished}
                          onChange={(e) => setIsPublished(e.target.checked)}
                          className="rounded border-border"
                        />
                        <Label htmlFor="published">Publish immediately</Label>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button type="submit" disabled={submitting || uploadingImages} className="rounded-full">
                          {uploadingImages ? 'Uploading Images...' : submitting ? 'Saving...' : editingPost ? 'Update Post' : 'Create Post'}
                        </Button>
                        {editingPost && (
                          <Button type="button" variant="outline" onClick={resetForm} className="rounded-full">
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="manage">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="backdrop-blur-sm bg-card/80">
                  <CardHeader>
                    <CardTitle>Blog Posts</CardTitle>
                    <CardDescription>Manage all your blog posts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blogPosts.map((post, index) => (
                        <motion.div 
                          key={post.id} 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border rounded-xl p-4 hover:border-primary/50 transition-colors bg-background"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-4 flex-1">
                              {post.thumbnail_url && (
                                <img 
                                  src={post.thumbnail_url} 
                                  alt={post.title}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              )}
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{post.title}</h3>
                                {post.excerpt && (
                                  <p className="text-muted-foreground text-sm mt-1 line-clamp-1">{post.excerpt}</p>
                                )}
                                <div className="flex items-center space-x-2 mt-2">
                                  <Badge variant={post.published ? 'default' : 'secondary'} className="rounded-full">
                                    {post.published ? 'Published' : 'Draft'}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(post.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => togglePublished(post)}
                                className="rounded-full"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(post)}
                                className="rounded-full"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(post.id)}
                                className="rounded-full"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {blogPosts.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p className="font-medium">No blog posts yet</p>
                          <p className="text-sm">Create your first post!</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
