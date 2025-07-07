import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trash2, Edit, Eye } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  created_at: string;
  author_id: string;
}

const Admin = () => {
  const { user, profile, loading } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) {
      navigate('/');
    }
  }, [user, profile, loading, navigate]);

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchBlogPosts();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSubmitting(true);
    
    try {
      const postData = {
        title,
        content,
        excerpt: excerpt || null,
        published: isPublished,
        author_id: user.id,
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
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setExcerpt('');
    setIsPublished(false);
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setExcerpt(post.excerpt || '');
    setIsPublished(post.published);
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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || profile?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your blog posts and content</p>
          </div>

          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create Post</TabsTrigger>
              <TabsTrigger value="manage">Manage Posts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create">
              <Card>
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
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt (Optional)</Label>
                      <Input
                        id="excerpt"
                        placeholder="Brief description of the post"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Write your blog post content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[300px]"
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="published"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="published">Publish immediately</Label>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button type="submit" disabled={submitting}>
                        {submitting ? 'Saving...' : editingPost ? 'Update Post' : 'Create Post'}
                      </Button>
                      {editingPost && (
                        <Button type="button" variant="outline" onClick={resetForm}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="manage">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Posts</CardTitle>
                  <CardDescription>Manage all your blog posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            {post.excerpt && (
                              <p className="text-gray-600 text-sm mt-1">{post.excerpt}</p>
                            )}
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant={post.published ? 'default' : 'secondary'}>
                                {post.published ? 'Published' : 'Draft'}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(post.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => togglePublished(post)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(post)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(post.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {blogPosts.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No blog posts yet. Create your first post!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;