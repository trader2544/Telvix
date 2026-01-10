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
import { motion, AnimatePresence } from 'framer-motion';
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
  Loader2,
  ExternalLink,
  Globe,
  ArrowRight,
  Sparkles,
  Link2
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
  website_url: string | null;
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
      toast.error('Please enter a project code');
      return;
    }
    
    setLinking(true);
    try {
      const { data: projectData, error: findError } = await supabase
        .from('projects')
        .select('*')
        .eq('project_code', projectCode.trim().toUpperCase())
        .maybeSingle();
      
      if (findError) throw findError;
      
      if (!projectData) {
        toast.error('Project not found. Please check your project code.');
        return;
      }
      
      if (projectData.user_id && projectData.user_id !== user?.id) {
        toast.error('This project is already linked to another account.');
        return;
      }

      if (projectData.user_id === user?.id) {
        setProject(projectData);
        toast.info('You are already linked to this project.');
        return;
      }

      const { error: updateError } = await supabase
        .from('projects')
        .update({ user_id: user?.id })
        .eq('id', projectData.id);
      
      if (updateError) throw updateError;
      
      toast.success('Project linked successfully! Welcome to your project dashboard.');
      setProject({ ...projectData, user_id: user?.id || null });
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-primary animate-pulse" />;
      case 'review': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'review': return 'Under Review';
      default: return 'Pending';
    }
  };

  const getSuggestionBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Approved</Badge>;
      case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
      case 'implemented': return <Badge className="bg-primary/20 text-primary border-primary/30">Implemented</Badge>;
      default: return <Badge variant="secondary">Pending</Badge>;
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl" />
      </div>

      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Project Dashboard</h1>
            </div>
            <p className="text-muted-foreground">Track your project progress and communicate with our team</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!project ? (
              /* Link Project Card */
              <motion.div
                key="link-project"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-lg mx-auto"
              >
                <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm overflow-hidden relative">
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  
                  <CardHeader className="text-center pb-4 relative">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-2xl shadow-primary/30"
                    >
                      <Link2 className="w-12 h-12 text-primary-foreground" />
                    </motion.div>
                    <CardTitle className="text-2xl">Link Your Project</CardTitle>
                    <CardDescription className="text-base">
                      Enter the project code provided by our team to access your project dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 relative">
                    <div className="space-y-2">
                      <Label htmlFor="projectCode" className="text-sm font-medium">Project Code</Label>
                      <Input
                        id="projectCode"
                        placeholder="e.g., WEB-001"
                        value={projectCode}
                        onChange={(e) => setProjectCode(e.target.value.toUpperCase())}
                        className="text-center font-mono text-xl tracking-[0.3em] h-14 bg-background/50 border-2 focus:border-primary rounded-xl"
                      />
                    </div>
                    <Button 
                      onClick={linkProject} 
                      disabled={linking} 
                      className="w-full gap-2 h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30"
                    >
                      {linking ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                      {linking ? 'Linking...' : 'Link Project'}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Don't have a project code? <a href="/quote" className="text-primary hover:underline">Contact us</a> to get started.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="project-dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Project Overview Card */}
                <Card className="mb-8 overflow-hidden backdrop-blur-sm bg-card/80 border-border/50">
                  <div className="relative">
                    {/* Progress bar at top */}
                    <div className="h-1 bg-muted">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-green-500"
                      />
                    </div>
                    
                    <CardHeader className="pb-4">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-2xl">
                            {getStatusIcon(project.status)}
                          </div>
                          <div>
                            <CardTitle className="text-2xl mb-1">{project.name}</CardTitle>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="font-mono text-xs">{project.project_code}</Badge>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{getStatusLabel(project.status)}</span>
                            </div>
                          </div>
                        </div>
                        {project.website_url && (
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              size="lg"
                              className="gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/20"
                              onClick={() => window.open(project.website_url!, '_blank')}
                            >
                              <Globe className="w-4 h-4" />
                              View Live Site
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {project.description && (
                        <p className="text-muted-foreground">{project.description}</p>
                      )}
                      
                      {/* Progress Section */}
                      <div className="p-4 rounded-2xl bg-muted/30 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Project Progress</span>
                          <span className="font-bold text-primary">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-3" />
                        <p className="text-xs text-muted-foreground">
                          {project.progress < 25 && "🚀 Just getting started - setting up the foundation"}
                          {project.progress >= 25 && project.progress < 50 && "⚡ Making good progress - core features in development"}
                          {project.progress >= 50 && project.progress < 75 && "✨ Past halfway - polishing and adding details"}
                          {project.progress >= 75 && project.progress < 100 && "🎯 Almost there - final touches and testing"}
                          {project.progress === 100 && "🎉 Project completed!"}
                        </p>
                      </div>
                      
                      {project.admin_notes && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-primary/5 rounded-2xl border border-primary/20"
                        >
                          <p className="text-sm font-medium mb-2 flex items-center gap-2 text-primary">
                            <MessageSquare className="w-4 h-4" />
                            Latest Team Update
                          </p>
                          <p className="text-sm text-muted-foreground">{project.admin_notes}</p>
                        </motion.div>
                      )}
                    </CardContent>
                  </div>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="chat" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1 rounded-xl">
                    <TabsTrigger value="chat" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      <MessageSquare className="w-4 h-4" />
                      Messages
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      <Upload className="w-4 h-4" />
                      Resources
                    </TabsTrigger>
                    <TabsTrigger value="suggestions" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      <Lightbulb className="w-4 h-4" />
                      Suggestions
                    </TabsTrigger>
                  </TabsList>

                  {/* Chat Tab */}
                  <TabsContent value="chat">
                    <Card className="backdrop-blur-sm bg-card/80">
                      <CardHeader>
                        <CardTitle>Project Messages</CardTitle>
                        <CardDescription>Chat with our development team about your project</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[400px] pr-4 mb-4">
                          <div className="space-y-4">
                            {messages.length === 0 ? (
                              <div className="text-center py-12 text-muted-foreground">
                                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p className="font-medium">No messages yet</p>
                                <p className="text-sm">Start a conversation with our team!</p>
                              </div>
                            ) : (
                              messages.map((msg, index) => (
                                <motion.div
                                  key={msg.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className={`flex ${msg.is_admin ? 'justify-start' : 'justify-end'}`}
                                >
                                  <div
                                    className={`max-w-[80%] p-4 rounded-2xl ${
                                      msg.is_admin
                                        ? 'bg-muted text-foreground rounded-bl-md'
                                        : 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-br-md shadow-lg shadow-primary/20'
                                    }`}
                                  >
                                    <p className="text-sm">{msg.message}</p>
                                    <p className={`text-xs mt-2 ${msg.is_admin ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>
                                      {msg.is_admin ? '👨‍💻 Telvix Team' : 'You'} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                  </div>
                                </motion.div>
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
                            className="flex-1 rounded-xl bg-background"
                          />
                          <Button onClick={sendMessage} disabled={submitting || !newMessage.trim()} className="rounded-xl px-6">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Resources Tab */}
                  <TabsContent value="resources">
                    <Card className="backdrop-blur-sm bg-card/80">
                      <CardHeader>
                        <CardTitle>Project Resources</CardTitle>
                        <CardDescription>Upload files and assets for your project</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="border-2 border-dashed border-primary/30 rounded-2xl p-6 bg-primary/5">
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
                                placeholder="Brief description of this file"
                                value={resourceDesc}
                                onChange={(e) => setResourceDesc(e.target.value)}
                                className="rounded-xl bg-background"
                              />
                            </div>
                            <Button onClick={uploadResource} disabled={submitting || !resourceFile} className="gap-2 rounded-xl">
                              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                              Upload File
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium">Uploaded Files</h4>
                          {resources.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                              <File className="w-12 h-12 mx-auto mb-4 opacity-50" />
                              <p>No files uploaded yet</p>
                            </div>
                          ) : (
                            resources.map((resource, index) => (
                              <motion.div 
                                key={resource.id} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted/70 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <File className="w-6 h-6 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{resource.file_name}</p>
                                    {resource.description && (
                                      <p className="text-xs text-muted-foreground">{resource.description}</p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(resource.created_at).toLocaleDateString()}
                                  </span>
                                  <Button variant="outline" size="sm" asChild className="rounded-full">
                                    <a href={resource.file_url} target="_blank" rel="noopener noreferrer">
                                      View
                                    </a>
                                  </Button>
                                </div>
                              </motion.div>
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Suggestions Tab */}
                  <TabsContent value="suggestions">
                    <Card className="backdrop-blur-sm bg-card/80">
                      <CardHeader>
                        <CardTitle>Feature Suggestions</CardTitle>
                        <CardDescription>Suggest changes or improvements for your project</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="border-2 border-dashed border-primary/30 rounded-2xl p-6 space-y-4 bg-primary/5">
                          <div className="space-y-2">
                            <Label htmlFor="suggestionTitle">Title</Label>
                            <Input
                              id="suggestionTitle"
                              placeholder="Brief title for your suggestion"
                              value={newSuggestionTitle}
                              onChange={(e) => setNewSuggestionTitle(e.target.value)}
                              className="rounded-xl bg-background"
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
                              className="rounded-xl bg-background resize-none"
                            />
                          </div>
                          <Button 
                            onClick={submitSuggestion} 
                            disabled={submitting || !newSuggestionTitle.trim() || !newSuggestionDesc.trim()}
                            className="gap-2 rounded-xl"
                          >
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
                            Submit Suggestion
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium">Your Suggestions</h4>
                          {suggestions.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                              <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
                              <p>No suggestions submitted yet</p>
                            </div>
                          ) : (
                            suggestions.map((suggestion, index) => (
                              <motion.div 
                                key={suggestion.id} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="border rounded-2xl p-4 space-y-3 hover:border-primary/50 transition-colors bg-background"
                              >
                                <div className="flex items-center justify-between">
                                  <h5 className="font-medium">{suggestion.title}</h5>
                                  {getSuggestionBadge(suggestion.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                                {suggestion.admin_response && (
                                  <div className="mt-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
                                    <p className="text-xs font-medium mb-2 text-primary flex items-center gap-2">
                                      <MessageSquare className="w-3 h-3" />
                                      Team Response
                                    </p>
                                    <p className="text-sm">{suggestion.admin_response}</p>
                                  </div>
                                )}
                                <p className="text-xs text-muted-foreground">
                                  Submitted on {new Date(suggestion.created_at).toLocaleDateString()}
                                </p>
                              </motion.div>
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
