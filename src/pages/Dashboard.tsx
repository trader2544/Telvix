import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  FolderOpen, 
  MessageSquare, 
  Upload, 
  Lightbulb, 
  Send, 
  File, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface Project {
  id: string;
  project_code: string;
  user_id: string | null;
  name: string;
  description: string | null;
  status: string;
  progress: number;
  admin_notes: string | null;
  created_at: string;
}

interface ProjectMessage {
  id: string;
  message: string;
  is_admin: boolean;
  created_at: string;
  sender_id: string;
}

interface ProjectResource {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  description: string | null;
  created_at: string;
}

interface ProjectSuggestion {
  id: string;
  title: string;
  description: string;
  status: string;
  admin_response: string | null;
  created_at: string;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [projectCode, setProjectCode] = useState('');
  const [messages, setMessages] = useState<ProjectMessage[]>([]);
  const [resources, setResources] = useState<ProjectResource[]>([]);
  const [suggestions, setSuggestions] = useState<ProjectSuggestion[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newSuggestionTitle, setNewSuggestionTitle] = useState('');
  const [newSuggestionDesc, setNewSuggestionDesc] = useState('');
  const [resourceFile, setResourceFile] = useState<File | null>(null);
  const [resourceDesc, setResourceDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [linking, setLinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserProject();
    }
  }, [user]);

  useEffect(() => {
    if (project) {
      fetchMessages();
      fetchResources();
      fetchSuggestions();
    }
  }, [project]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchUserProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();
      
      if (error) throw error;
      setProject(data);
    } catch (error: any) {
      console.error('Error fetching project:', error);
    }
  };

  const linkProject = async () => {
    if (!projectCode.trim()) {
      toast.error('Please enter a project ID');
      return;
    }
    
    setLinking(true);
    try {
      // First find the project
      const { data: projectData, error: findError } = await supabase
        .from('projects')
        .select('*')
        .eq('project_code', projectCode.trim())
        .maybeSingle();
      
      if (findError) throw findError;
      
      if (!projectData) {
        toast.error('Project not found. Please check your project ID.');
        return;
      }
      
      if (projectData.user_id && projectData.user_id !== user?.id) {
        toast.error('This project is already linked to another user.');
        return;
      }

      // Link the project to the user
      const { error: updateError } = await supabase
        .from('projects')
        .update({ user_id: user?.id })
        .eq('id', projectData.id);
      
      if (updateError) throw updateError;
      
      toast.success('Project linked successfully!');
      setProject({ ...projectData });
      setProjectCode('');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLinking(false);
    }
  };

  const fetchMessages = async () => {
    if (!project) return;
    try {
      const { data, error } = await supabase
        .from('project_messages')
        .select('*')
        .eq('project_id', project.id)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchResources = async () => {
    if (!project) return;
    try {
      const { data, error } = await supabase
        .from('project_resources')
        .select('*')
        .eq('project_id', project.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setResources(data || []);
    } catch (error: any) {
      console.error('Error fetching resources:', error);
    }
  };

  const fetchSuggestions = async () => {
    if (!project) return;
    try {
      const { data, error } = await supabase
        .from('project_suggestions')
        .select('*')
        .eq('project_id', project.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSuggestions(data || []);
    } catch (error: any) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !project || !user) return;
    
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('project_messages')
        .insert({
          project_id: project.id,
          sender_id: user.id,
          message: newMessage.trim(),
          is_admin: false
        });
      
      if (error) throw error;
      
      setNewMessage('');
      fetchMessages();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const uploadResource = async () => {
    if (!resourceFile || !project || !user) return;
    
    setSubmitting(true);
    try {
      const fileExt = resourceFile.name.split('.').pop();
      const fileName = `${project.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('project-resources')
        .upload(fileName, resourceFile);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('project-resources')
        .getPublicUrl(fileName);
      
      const { error: insertError } = await supabase
        .from('project_resources')
        .insert({
          project_id: project.id,
          user_id: user.id,
          file_name: resourceFile.name,
          file_url: publicUrl,
          file_type: resourceFile.type,
          description: resourceDesc || null
        });
      
      if (insertError) throw insertError;
      
      toast.success('Resource uploaded successfully!');
      setResourceFile(null);
      setResourceDesc('');
      fetchResources();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const submitSuggestion = async () => {
    if (!newSuggestionTitle.trim() || !newSuggestionDesc.trim() || !project || !user) return;
    
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('project_suggestions')
        .insert({
          project_id: project.id,
          user_id: user.id,
          title: newSuggestionTitle.trim(),
          description: newSuggestionDesc.trim()
        });
      
      if (error) throw error;
      
      toast.success('Suggestion submitted successfully!');
      setNewSuggestionTitle('');
      setNewSuggestionDesc('');
      fetchSuggestions();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'review': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getSuggestionBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
      case 'implemented': return <Badge className="bg-blue-500">Implemented</Badge>;
      default: return <Badge variant="secondary">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Project Dashboard</h1>
            <p className="text-muted-foreground">View your project progress and communicate with our team</p>
          </div>

          {!project ? (
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <FolderOpen className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Link Your Project</CardTitle>
                <CardDescription>
                  Enter your project ID to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectCode">Project ID</Label>
                  <Input
                    id="projectCode"
                    placeholder="Enter your project ID (e.g., PRJ-001)"
                    value={projectCode}
                    onChange={(e) => setProjectCode(e.target.value)}
                  />
                </div>
                <Button onClick={linkProject} disabled={linking} className="w-full">
                  {linking ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {linking ? 'Linking...' : 'Link Project'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Project Overview */}
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FolderOpen className="w-5 h-5" />
                        {project.name}
                      </CardTitle>
                      <CardDescription>Project ID: {project.project_code}</CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(project.status)} text-white`}>
                      {project.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.description && (
                    <p className="text-muted-foreground">{project.description}</p>
                  )}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-3" />
                  </div>
                  {project.admin_notes && (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Admin Notes:</p>
                      <p className="text-sm text-muted-foreground">{project.admin_notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tabs for different sections */}
              <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Resources
                  </TabsTrigger>
                  <TabsTrigger value="suggestions" className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Suggestions
                  </TabsTrigger>
                </TabsList>

                {/* Chat Tab */}
                <TabsContent value="chat">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Communication</CardTitle>
                      <CardDescription>Chat with our team about your project</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px] pr-4 mb-4">
                        <div className="space-y-4">
                          {messages.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                              <p>No messages yet. Start the conversation!</p>
                            </div>
                          ) : (
                            messages.map((msg) => (
                              <div
                                key={msg.id}
                                className={`flex ${msg.is_admin ? 'justify-start' : 'justify-end'}`}
                              >
                                <div
                                  className={`max-w-[80%] p-3 rounded-lg ${
                                    msg.is_admin
                                      ? 'bg-muted text-foreground'
                                      : 'bg-primary text-primary-foreground'
                                  }`}
                                >
                                  <p className="text-sm">{msg.message}</p>
                                  <p className={`text-xs mt-1 ${msg.is_admin ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>
                                    {new Date(msg.created_at).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                      </ScrollArea>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                        />
                        <Button onClick={sendMessage} disabled={submitting || !newMessage.trim()}>
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Resources Tab */}
                <TabsContent value="resources">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Resources</CardTitle>
                      <CardDescription>Upload files and resources for your project</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="border-2 border-dashed rounded-lg p-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="resourceFile">Select File</Label>
                            <Input
                              id="resourceFile"
                              type="file"
                              onChange={(e) => setResourceFile(e.target.files?.[0] || null)}
                              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="resourceDesc">Description (Optional)</Label>
                            <Input
                              id="resourceDesc"
                              placeholder="Brief description of this resource"
                              value={resourceDesc}
                              onChange={(e) => setResourceDesc(e.target.value)}
                            />
                          </div>
                          <Button onClick={uploadResource} disabled={submitting || !resourceFile}>
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                            Upload Resource
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Uploaded Resources</h4>
                        {resources.length === 0 ? (
                          <p className="text-center py-8 text-muted-foreground">No resources uploaded yet</p>
                        ) : (
                          resources.map((resource) => (
                            <div key={resource.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div className="flex items-center gap-3">
                                <File className="w-5 h-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium text-sm">{resource.file_name}</p>
                                  {resource.description && (
                                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  {new Date(resource.created_at).toLocaleDateString()}
                                </span>
                                <Button variant="ghost" size="sm" asChild>
                                  <a href={resource.file_url} target="_blank" rel="noopener noreferrer">
                                    View
                                  </a>
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Suggestions Tab */}
                <TabsContent value="suggestions">
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Suggestions</CardTitle>
                      <CardDescription>Suggest changes or improvements for your project</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="border rounded-lg p-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="suggestionTitle">Title</Label>
                          <Input
                            id="suggestionTitle"
                            placeholder="Brief title for your suggestion"
                            value={newSuggestionTitle}
                            onChange={(e) => setNewSuggestionTitle(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="suggestionDesc">Description</Label>
                          <Textarea
                            id="suggestionDesc"
                            placeholder="Describe your suggestion in detail..."
                            value={newSuggestionDesc}
                            onChange={(e) => setNewSuggestionDesc(e.target.value)}
                            rows={4}
                          />
                        </div>
                        <Button 
                          onClick={submitSuggestion} 
                          disabled={submitting || !newSuggestionTitle.trim() || !newSuggestionDesc.trim()}
                        >
                          {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Lightbulb className="w-4 h-4 mr-2" />}
                          Submit Suggestion
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Your Suggestions</h4>
                        {suggestions.length === 0 ? (
                          <p className="text-center py-8 text-muted-foreground">No suggestions submitted yet</p>
                        ) : (
                          suggestions.map((suggestion) => (
                            <div key={suggestion.id} className="border rounded-lg p-4 space-y-2">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium">{suggestion.title}</h5>
                                {getSuggestionBadge(suggestion.status)}
                              </div>
                              <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                              {suggestion.admin_response && (
                                <div className="mt-2 p-3 bg-muted rounded-lg">
                                  <p className="text-xs font-medium mb-1">Admin Response:</p>
                                  <p className="text-sm">{suggestion.admin_response}</p>
                                </div>
                              )}
                              <p className="text-xs text-muted-foreground">
                                Submitted on {new Date(suggestion.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
