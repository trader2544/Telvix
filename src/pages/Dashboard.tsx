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
import { FolderOpen, MessageSquare, Upload, Lightbulb, Send, File, Clock, CheckCircle2, AlertCircle, Loader2, ExternalLink, Globe, ArrowRight, Sparkles, Link2, Image, FileText, Paperclip, X } from 'lucide-react';
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
  attachment_url?: string;
  attachment_name?: string;
  attachment_type?: string;
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
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [projectCode, setProjectCode] = useState('');
  const [messages, setMessages] = useState<ProjectMessage[]>([]);
  const [resources, setResources] = useState<ProjectResource[]>([]);
  const [suggestions, setSuggestions] = useState<ProjectSuggestion[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newSuggestionTitle, setNewSuggestionTitle] = useState('');
  const [newSuggestionDesc, setNewSuggestionDesc] = useState('');
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [linking, setLinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  const fetchUserProject = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('projects').select('*').eq('user_id', user?.id).maybeSingle();
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
      const {
        data: projectData,
        error: findError
      } = await supabase.from('projects').select('*').eq('project_code', projectCode.trim().toUpperCase()).maybeSingle();
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
      const {
        error: updateError
      } = await supabase.from('projects').update({
        user_id: user?.id
      }).eq('id', projectData.id);
      if (updateError) throw updateError;
      toast.success('Project linked successfully! Welcome to your project dashboard.');
      setProject({
        ...projectData,
        user_id: user?.id || null
      });
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
      const {
        data,
        error
      } = await supabase.from('project_messages').select('*').eq('project_id', project.id).order('created_at', {
        ascending: true
      });
      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
    }
  };
  const fetchResources = async () => {
    if (!project) return;
    try {
      const {
        data,
        error
      } = await supabase.from('project_resources').select('*').eq('project_id', project.id).order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setResources(data || []);
    } catch (error: any) {
      console.error('Error fetching resources:', error);
    }
  };
  const fetchSuggestions = async () => {
    if (!project) return;
    try {
      const {
        data,
        error
      } = await supabase.from('project_suggestions').select('*').eq('project_id', project.id).order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setSuggestions(data || []);
    } catch (error: any) {
      console.error('Error fetching suggestions:', error);
    }
  };
  const sendMessage = async () => {
    if (!newMessage.trim() && !attachmentFile || !project || !user) return;
    setSubmitting(true);
    try {
      let attachmentUrl = '';
      let attachmentName = '';
      let attachmentType = '';

      // Upload attachment if present
      if (attachmentFile) {
        const fileExt = attachmentFile.name.split('.').pop();
        const fileName = `${project.id}/${Date.now()}.${fileExt}`;
        const {
          error: uploadError
        } = await supabase.storage.from('project-resources').upload(fileName, attachmentFile);
        if (uploadError) throw uploadError;
        const {
          data: {
            publicUrl
          }
        } = supabase.storage.from('project-resources').getPublicUrl(fileName);
        attachmentUrl = publicUrl;
        attachmentName = attachmentFile.name;
        attachmentType = attachmentFile.type;

        // Also save as a resource
        await supabase.from('project_resources').insert({
          project_id: project.id,
          user_id: user.id,
          file_name: attachmentFile.name,
          file_url: publicUrl,
          file_type: attachmentFile.type,
          description: newMessage.trim() || 'Shared in chat'
        });
      }
      const messageContent = newMessage.trim() || (attachmentFile ? `📎 Shared a file: ${attachmentFile.name}` : '');
      const {
        error
      } = await supabase.from('project_messages').insert({
        project_id: project.id,
        sender_id: user.id,
        message: messageContent,
        is_admin: false
      });
      if (error) throw error;
      setNewMessage('');
      setAttachmentFile(null);
      fetchMessages();
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
      const {
        error
      } = await supabase.from('project_suggestions').insert({
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
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-primary animate-pulse" />;
      case 'review':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'review':
        return 'Under Review';
      default:
        return 'Pending';
    }
  };
  const getSuggestionBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'implemented':
        return <Badge className="bg-primary/20 text-primary border-primary/30">Implemented</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };
  const getFileIcon = (type: string | null) => {
    if (type?.startsWith('image/')) return <Image className="w-4 h-4 text-green-500" />;
    if (type?.includes('pdf')) return <FileText className="w-4 h-4 text-red-500" />;
    return <File className="w-4 h-4 text-blue-500" />;
  };
  const isImageFile = (type: string | null) => type?.startsWith('image/');
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div animate={{
        rotate: 360
      }} transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }} className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>;
  }
  if (!user) return null;
  return <div className="min-h-screen bg-background relative overflow-hidden">
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
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">Project Dashboard</h1>
            </div>
            <p className="text-muted-foreground">Track your project progress and communicate with our team</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!project ? (/* Link Project Card */
          <motion.div key="link-project" initial={{
            opacity: 0,
            scale: 0.95
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.95
          }} className="max-w-lg mx-auto">
                <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  <CardHeader className="text-center pb-4 relative">
                    <CardTitle className="text-2xl">Link Your Project</CardTitle>
                    <CardDescription className="text-base">
                      Enter the project code provided by our team to access your project dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 relative">
                    <div className="space-y-2">
                      <Label htmlFor="projectCode" className="text-sm font-medium">Project Code</Label>
                      <Input id="projectCode" placeholder="e.g., WEB-001" value={projectCode} onChange={e => setProjectCode(e.target.value.toUpperCase())} className="text-center font-mono text-xl tracking-[0.3em] h-14 bg-background/50 border-2 focus:border-primary rounded-xl" />
                    </div>
                    <Button onClick={linkProject} disabled={linking} className="w-full gap-2 h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30">
                      {linking ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                      {linking ? 'Linking...' : 'Link Project'}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Don't have a project code? <a href="/quote" className="text-primary hover:underline">Contact us</a> to get started.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>) : <motion.div key="project-dashboard" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }}>
                {/* Project Overview Card */}
                <Card className="mb-8 overflow-hidden backdrop-blur-sm bg-card/80 border-border/50">
                  <div className="relative">
                    <div className="h-1 bg-muted">
                      <motion.div initial={{
                    width: 0
                  }} animate={{
                    width: `${project.progress}%`
                  }} transition={{
                    duration: 1,
                    ease: "easeOut"
                  }} className="h-full bg-gradient-to-r from-primary to-green-500" />
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
                        {project.website_url && <motion.div whileHover={{
                      scale: 1.02
                    }} whileTap={{
                      scale: 0.98
                    }}>
                            <Button size="lg" className="gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/20" onClick={() => window.open(project.website_url!, '_blank')}>
                              <Globe className="w-4 h-4" />
                              View Live Site
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </motion.div>}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {project.description && <p className="text-muted-foreground">{project.description}</p>}
                      
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
                      
                      {project.admin_notes && <motion.div initial={{
                    opacity: 0,
                    y: 10
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} className="p-4 bg-primary/5 rounded-2xl border border-primary/20">
                          <p className="text-sm font-medium mb-2 flex items-center gap-2 text-primary">
                            <MessageSquare className="w-4 h-4" />
                            Latest Team Update
                          </p>
                          <p className="text-sm text-muted-foreground">{project.admin_notes}</p>
                        </motion.div>}
                    </CardContent>
                  </div>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="chat" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 p-1 rounded-xl">
                    <TabsTrigger value="chat" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      <MessageSquare className="w-4 h-4" />
                      Messages & Files
                    </TabsTrigger>
                    <TabsTrigger value="suggestions" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      <Lightbulb className="w-4 h-4" />
                      Suggestions
                    </TabsTrigger>
                  </TabsList>

                  {/* Chat Tab with integrated file uploads */}
                  <TabsContent value="chat">
                    <Card className="backdrop-blur-sm bg-card/80 border-0 shadow-xl">
                      <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Project Conversation</CardTitle>
                            <CardDescription>Chat with our team and share files</CardDescription>
                          </div>
                          <div className="ml-auto flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs text-muted-foreground">Team Online</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ScrollArea className="h-[450px] p-4">
                          <div className="space-y-4">
                            {messages.length === 0 ? <div className="text-center py-16">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4">
                                  <MessageSquare className="w-8 h-8 text-primary" />
                                </div>
                                <p className="font-medium text-foreground">Start the conversation!</p>
                                <p className="text-sm text-muted-foreground mt-1">Send a message or share files with our team</p>
                              </div> : messages.map((msg, index) => <motion.div key={msg.id} initial={{
                          opacity: 0,
                          y: 10
                        }} animate={{
                          opacity: 1,
                          y: 0
                        }} transition={{
                          delay: index * 0.03
                        }} className={`flex ${msg.is_admin ? 'justify-start' : 'justify-end'}`}>
                                  <div className={`max-w-[80%] ${msg.is_admin ? 'order-2' : 'order-1'}`}>
                                    {/* Avatar */}
                                    {msg.is_admin && <div className="flex items-center gap-2 mb-1">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                                          <span className="text-xs text-white font-bold">T</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">Telvix Team</span>
                                      </div>}
                                    <div className={`p-4 rounded-2xl ${msg.is_admin ? 'bg-muted/80 text-foreground rounded-tl-md' : 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-tr-md shadow-lg shadow-primary/20'}`}>
                                      <p className="text-sm leading-relaxed text-destructive-foreground">{msg.message}</p>
                                      <div className={`flex items-center gap-2 mt-2 ${msg.is_admin ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>
                                        <span className="text-xs">
                                          {new Date(msg.created_at).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                        </span>
                                        {!msg.is_admin && <CheckCircle2 className="w-3 h-3" />}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>)}
                            <div ref={messagesEndRef} />
                          </div>
                        </ScrollArea>

                        {/* Shared Files Quick View */}
                        {resources.length > 0 && <div className="px-4 py-3 border-t border-border/50 bg-muted/20">
                            <p className="text-xs font-medium text-muted-foreground mb-2">Recent Files ({resources.length})</p>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                              {resources.slice(0, 5).map(resource => <a key={resource.id} href={resource.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background hover:bg-muted transition-colors shrink-0">
                                  {getFileIcon(resource.file_type)}
                                  <span className="text-xs truncate max-w-[100px]">{resource.file_name}</span>
                                </a>)}
                            </div>
                          </div>}

                        {/* Attachment Preview */}
                        {attachmentFile && <div className="px-4 py-2 border-t border-border/50 bg-primary/5">
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-background">
                              {getFileIcon(attachmentFile.type)}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{attachmentFile.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(attachmentFile.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                              {isImageFile(attachmentFile.type) && <img src={URL.createObjectURL(attachmentFile)} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />}
                              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setAttachmentFile(null)}>
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>}

                        {/* Message Input */}
                        <div className="p-4 border-t border-border/50 bg-background/50">
                          <div className="flex items-end gap-2">
                            <input type="file" ref={fileInputRef} className="hidden" onChange={e => setAttachmentFile(e.target.files?.[0] || null)} accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar" />
                            <Button variant="ghost" size="icon" className="shrink-0 rounded-full hover:bg-primary/10" onClick={() => fileInputRef.current?.click()}>
                              <Paperclip className="w-5 h-5 text-muted-foreground" />
                            </Button>
                            <div className="flex-1 relative">
                              <Textarea placeholder="Type a message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())} className="min-h-[44px] max-h-32 rounded-2xl bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary pr-12 resize-none" rows={1} />
                            </div>
                            <Button onClick={sendMessage} disabled={submitting || !newMessage.trim() && !attachmentFile} className="shrink-0 rounded-full w-11 h-11 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 text-center">
                            💡 Attach images, PDFs, and documents directly in chat
                          </p>
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
                            <Input id="suggestionTitle" placeholder="Brief title for your suggestion" value={newSuggestionTitle} onChange={e => setNewSuggestionTitle(e.target.value)} className="rounded-xl bg-background" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="suggestionDesc">Description</Label>
                            <Textarea id="suggestionDesc" placeholder="Describe your suggestion in detail..." value={newSuggestionDesc} onChange={e => setNewSuggestionDesc(e.target.value)} rows={4} className="rounded-xl bg-background resize-none" />
                          </div>
                          <Button onClick={submitSuggestion} disabled={submitting || !newSuggestionTitle.trim() || !newSuggestionDesc.trim()} className="gap-2 rounded-xl">
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
                            Submit Suggestion
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium">Your Suggestions</h4>
                          {suggestions.length === 0 ? <div className="text-center py-12 text-muted-foreground">
                              <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
                              <p>No suggestions submitted yet</p>
                            </div> : suggestions.map((suggestion, index) => <motion.div key={suggestion.id} initial={{
                        opacity: 0,
                        y: 10
                      }} animate={{
                        opacity: 1,
                        y: 0
                      }} transition={{
                        delay: index * 0.05
                      }} className="border rounded-2xl p-4 space-y-3 hover:border-primary/50 transition-colors bg-background">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-medium">{suggestion.title}</h5>
                                  {getSuggestionBadge(suggestion.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                                {suggestion.admin_response && <div className="mt-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
                                    <p className="text-xs font-medium mb-2 text-primary flex items-center gap-2">
                                      <MessageSquare className="w-3 h-3" />
                                      Team Response
                                    </p>
                                    <p className="text-sm">{suggestion.admin_response}</p>
                                  </div>}
                                <p className="text-xs text-muted-foreground">
                                  Submitted on {new Date(suggestion.created_at).toLocaleDateString()}
                                </p>
                              </motion.div>)}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>}
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Dashboard;