import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { 
  Plus, 
  Edit, 
  Trash2, 
  MessageSquare, 
  Send, 
  Users,
  FolderOpen,
  Loader2,
  ExternalLink,
  Lightbulb,
  Globe,
  Copy,
  CheckCircle2,
  Paperclip,
  Image,
  FileText,
  Download,
  X,
  Link2,
  Share2,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  project_code: string;
  name: string;
  description: string | null;
  status: string;
  progress: number;
  user_id: string | null;
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
  user_id: string;
}

interface ProjectSuggestion {
  id: string;
  title: string;
  description: string;
  status: string;
  admin_response: string | null;
  created_at: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
}

const AdminProjectPanel = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<ProjectMessage[]>([]);
  const [resources, setResources] = useState<ProjectResource[]>([]);
  const [suggestions, setSuggestions] = useState<ProjectSuggestion[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [showSuggestionsDialog, setShowSuggestionsDialog] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New project form
  const [newProjectCode, setNewProjectCode] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectUrl, setNewProjectUrl] = useState('');

  // Edit project form
  const [editStatus, setEditStatus] = useState('');
  const [editProgress, setEditProgress] = useState(0);
  const [editNotes, setEditNotes] = useState('');
  const [editUserId, setEditUserId] = useState('');
  const [editWebsiteUrl, setEditWebsiteUrl] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, resources]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast.error('Error fetching projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, user_id, full_name')
        .neq('role', 'admin');
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchMessages = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('project_messages')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchResources = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('project_resources')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setResources(data || []);
    } catch (error: any) {
      console.error('Error fetching resources:', error);
    }
  };

  const fetchSuggestions = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('project_suggestions')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSuggestions(data || []);
    } catch (error: any) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const createProject = async () => {
    if (!newProjectCode.trim() || !newProjectName.trim()) {
      toast.error('Please fill in required fields');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('projects')
        .insert({
          project_code: newProjectCode.trim(),
          name: newProjectName.trim(),
          description: newProjectDesc.trim() || null,
          website_url: newProjectUrl.trim() || null
        });
      
      if (error) throw error;
      
      toast.success('Project created successfully! Share the project code with your client.');
      setNewProjectCode('');
      setNewProjectName('');
      setNewProjectDesc('');
      setNewProjectUrl('');
      setShowCreateDialog(false);
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const updateProject = async (projectId: string) => {
    setSubmitting(true);
    try {
      // Auto-update status based on progress
      let autoStatus = editStatus;
      if (editProgress === 100) autoStatus = 'completed';
      else if (editProgress >= 80) autoStatus = 'review';
      else if (editProgress > 0) autoStatus = 'in_progress';

      const { error } = await supabase
        .from('projects')
        .update({
          status: autoStatus,
          progress: editProgress,
          admin_notes: editNotes || null,
          user_id: editUserId || null,
          website_url: editWebsiteUrl || null
        })
        .eq('id', projectId);
      
      if (error) throw error;
      
      toast.success('Project updated successfully!');
      setSelectedProject(null);
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);
      
      if (error) throw error;
      
      toast.success('Project deleted successfully!');
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const sendAdminMessage = async () => {
    if (!newMessage.trim() || !selectedProject || !user) return;
    
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('project_messages')
        .insert({
          project_id: selectedProject.id,
          sender_id: user.id,
          message: newMessage.trim(),
          is_admin: true
        });
      
      if (error) throw error;
      
      setNewMessage('');
      fetchMessages(selectedProject.id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedProject || !user) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${selectedProject.id}/${Date.now()}_${file.name}`;
        
        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('project-resources')
          .upload(fileName, file);
        
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('project-resources')
          .getPublicUrl(fileName);
        
        // Save to database
        const { error: dbError } = await supabase
          .from('project_resources')
          .insert({
            project_id: selectedProject.id,
            user_id: user.id,
            file_name: file.name,
            file_url: publicUrl,
            file_type: file.type,
            description: `Uploaded by admin`
          });
        
        if (dbError) throw dbError;
      }
      
      toast.success('Files uploaded successfully!');
      fetchResources(selectedProject.id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const updateSuggestionStatus = async (suggestionId: string, status: string, response: string) => {
    try {
      const { error } = await supabase
        .from('project_suggestions')
        .update({ status, admin_response: response || null })
        .eq('id', suggestionId);
      
      if (error) throw error;
      
      toast.success('Suggestion updated!');
      if (selectedProject) {
        fetchSuggestions(selectedProject.id);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const copyProjectCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Project code copied to clipboard!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const openEditProject = (project: Project) => {
    setSelectedProject(project);
    setEditStatus(project.status);
    setEditProgress(project.progress);
    setEditNotes(project.admin_notes || '');
    setEditUserId(project.user_id || '');
    setEditWebsiteUrl(project.website_url || '');
  };

  const openChat = (project: Project) => {
    setSelectedProject(project);
    setShowChatDialog(true);
    fetchMessages(project.id);
    fetchResources(project.id);
  };

  const openSuggestions = (project: Project) => {
    setSelectedProject(project);
    setShowSuggestionsDialog(true);
    fetchSuggestions(project.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'review': return 'bg-yellow-500';
      default: return 'bg-gray-500';
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

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getUserName = (userId: string | null) => {
    if (!userId) return 'Not Linked';
    const userProfile = users.find(u => u.user_id === userId);
    return userProfile?.full_name || 'Client';
  };

  const getFileIcon = (fileType: string | null) => {
    if (!fileType) return <FileText className="w-4 h-4" />;
    if (fileType.startsWith('image/')) return <Image className="w-4 h-4 text-blue-500" />;
    if (fileType.includes('pdf')) return <FileText className="w-4 h-4 text-red-500" />;
    return <FileText className="w-4 h-4 text-muted-foreground" />;
  };

  // Combine messages and resources for unified chat view
  const getChatItems = () => {
    const items: Array<{
      type: 'message' | 'resource';
      data: ProjectMessage | ProjectResource;
      timestamp: Date;
    }> = [
      ...messages.map(m => ({ type: 'message' as const, data: m, timestamp: new Date(m.created_at) })),
      ...resources.map(r => ({ type: 'resource' as const, data: r, timestamp: new Date(r.created_at) }))
    ];
    return items.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Project Management
          </h2>
          <p className="text-sm text-muted-foreground">Create and manage client web development projects</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Create a project and share the code with your client to link their account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectCode">Project Code *</Label>
                  <Input
                    id="projectCode"
                    placeholder="e.g., WEB-001"
                    value={newProjectCode}
                    onChange={(e) => setNewProjectCode(e.target.value.toUpperCase())}
                  />
                  <p className="text-xs text-muted-foreground">Client uses this to link</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name *</Label>
                  <Input
                    id="projectName"
                    placeholder="Client Website"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectUrl">Website Preview URL</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="projectUrl"
                      placeholder="https://preview.example.com"
                      value={newProjectUrl}
                      onChange={(e) => setNewProjectUrl(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectDesc">Description</Label>
                <Textarea
                  id="projectDesc"
                  placeholder="Brief project description..."
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  rows={3}
                />
              </div>
              <Button onClick={createProject} disabled={submitting} className="w-full">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                Create Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4">
        {projects.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FolderOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground text-center max-w-sm mb-4">
                Create your first project and share the code with your client
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: getStatusColor(project.status).replace('bg-', '') === 'green-500' ? '#22c55e' : getStatusColor(project.status).replace('bg-', '') === 'blue-500' ? '#3b82f6' : getStatusColor(project.status).replace('bg-', '') === 'yellow-500' ? '#eab308' : '#6b7280' }}>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Project Header */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                        <h3 className="font-semibold text-base sm:text-lg truncate">{project.name}</h3>
                        <Badge variant="outline" className="shrink-0 font-mono text-xs">
                          {project.project_code}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0"
                          onClick={() => copyProjectCode(project.project_code)}
                        >
                          {copiedCode === project.project_code ? (
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      
                      {project.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                      
                      {/* Enhanced Progress Section */}
                      <div className="bg-muted/30 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Project Progress</span>
                          <span className={`text-lg font-bold ${project.progress === 100 ? 'text-green-500' : 'text-primary'}`}>
                            {project.progress}%
                          </span>
                        </div>
                        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`absolute inset-y-0 left-0 ${getProgressColor(project.progress)} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>Start</span>
                          <span>In Progress</span>
                          <span>Review</span>
                          <span>Done</span>
                        </div>
                      </div>
                      
                      {/* Status, User, and URL info */}
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <Badge className={`${getStatusColor(project.status)} text-white`}>
                          {getStatusLabel(project.status)}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Users className="w-3.5 h-3.5" />
                          <span className="text-xs sm:text-sm">{getUserName(project.user_id)}</span>
                          {project.user_id && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </div>
                        {project.website_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 gap-1.5 text-primary text-xs"
                            onClick={() => window.open(project.website_url!, '_blank')}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Preview
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex flex-wrap lg:flex-col gap-2">
                      <Button variant="outline" size="sm" className="gap-1.5 flex-1 lg:flex-none" onClick={() => openChat(project)}>
                        <MessageSquare className="w-4 h-4" />
                        <span className="hidden sm:inline">Chat</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1.5 flex-1 lg:flex-none" onClick={() => openSuggestions(project)}>
                        <Lightbulb className="w-4 h-4" />
                        <span className="hidden sm:inline">Ideas</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1.5 flex-1 lg:flex-none" onClick={() => openEditProject(project)}>
                        <Edit className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button variant="destructive" size="sm" className="gap-1.5 flex-1 lg:flex-none" onClick={() => deleteProject(project.id)}>
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={!!selectedProject && !showChatDialog && !showSuggestionsDialog} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-primary" />
              Edit: {selectedProject?.name}
            </DialogTitle>
            <DialogDescription>Update project details, progress, and website URL</DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="details" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="community">Social</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Website Preview URL</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="https://preview.example.com"
                      value={editWebsiteUrl}
                      onChange={(e) => setEditWebsiteUrl(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {editWebsiteUrl && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(editWebsiteUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Assign to User</Label>
                <Select value={editUserId} onValueChange={setEditUserId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {users.map((u) => (
                      <SelectItem key={u.user_id} value={u.user_id}>
                        {u.full_name || u.user_id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Admin Notes (Visible to Client)</Label>
                <Textarea
                  placeholder="Notes about the project status..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">{editProgress}%</div>
                  <p className="text-sm text-muted-foreground">Project Completion</p>
                </div>
                
                <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute inset-y-0 left-0 ${getProgressColor(editProgress)} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${editProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                <Slider
                  value={[editProgress]}
                  onValueChange={(value) => setEditProgress(value[0])}
                  max={100}
                  step={5}
                  className="py-4"
                />
                
                <div className="grid grid-cols-4 gap-2">
                  {[0, 25, 50, 75, 100].map((val) => (
                    <Button
                      key={val}
                      variant={editProgress === val ? "default" : "outline"}
                      size="sm"
                      onClick={() => setEditProgress(val)}
                      className="text-xs"
                    >
                      {val}%
                    </Button>
                  ))}
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium text-sm">Progress Milestones</h4>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${editProgress >= 25 ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                      <span>25% - Design & Planning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${editProgress >= 50 ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                      <span>50% - Development</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${editProgress >= 75 ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                      <span>75% - Testing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${editProgress >= 100 ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                      <span>100% - Launch Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="space-y-4 pt-4">
              <div className="text-center py-6">
                <Share2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h4 className="font-semibold mb-2">Social & Community</h4>
                <p className="text-sm text-muted-foreground mb-6">
                  Connect project to social platforms for updates
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="gap-2" disabled>
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </Button>
                  <Button variant="outline" className="gap-2" disabled>
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </Button>
                  <Button variant="outline" className="gap-2" disabled>
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  <Button variant="outline" className="gap-2" disabled>
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  Social integrations coming soon! Add your handles to enable automatic project updates.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <Button 
            onClick={() => selectedProject && updateProject(selectedProject.id)} 
            disabled={submitting} 
            className="w-full mt-4"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>

      {/* Enhanced Chat Dialog with File Uploads */}
      <Dialog open={showChatDialog} onOpenChange={(open) => { setShowChatDialog(open); if (!open) setSelectedProject(null); }}>
        <DialogContent className="max-w-3xl h-[85vh] sm:h-[700px] flex flex-col p-0 gap-0">
          {/* Chat Header */}
          <div className="px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-primary/5 to-primary/10">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="block">{selectedProject?.name}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    with {getUserName(selectedProject?.user_id || null)}
                  </span>
                </div>
              </DialogTitle>
            </DialogHeader>
          </div>
          
          {/* Messages Area */}
          <ScrollArea className="flex-1 px-4 sm:px-6">
            <div className="py-4 space-y-3">
              <AnimatePresence>
                {getChatItems().length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                      <MessageSquare className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                  </motion.div>
                ) : (
                  getChatItems().map((item, index) => {
                    if (item.type === 'message') {
                      const msg = item.data as ProjectMessage;
                      return (
                        <motion.div
                          key={`msg-${msg.id}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.02 }}
                          className={`flex ${msg.is_admin ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] sm:max-w-[75%] p-3 sm:p-4 rounded-2xl shadow-sm ${
                              msg.is_admin
                                ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-sm'
                                : 'bg-card border border-border text-foreground rounded-bl-sm'
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                            <p className={`text-[10px] sm:text-xs mt-2 ${msg.is_admin ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {msg.is_admin ? 'You' : 'Client'} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </motion.div>
                      );
                    } else {
                      const res = item.data as ProjectResource;
                      const isAdmin = res.description?.includes('admin');
                      return (
                        <motion.div
                          key={`res-${res.id}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.02 }}
                          className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl shadow-sm ${
                              isAdmin
                                ? 'bg-primary/10 border border-primary/20 rounded-br-sm'
                                : 'bg-muted border border-border rounded-bl-sm'
                            }`}
                          >
                            {res.file_type?.startsWith('image/') ? (
                              <div className="space-y-2">
                                <img 
                                  src={res.file_url} 
                                  alt={res.file_name}
                                  className="max-w-full rounded-lg max-h-48 object-cover"
                                />
                                <div className="flex items-center justify-between">
                                  <span className="text-xs truncate max-w-[150px]">{res.file_name}</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => window.open(res.file_url, '_blank')}
                                  >
                                    <Download className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3 p-2 bg-background/50 rounded-lg">
                                {getFileIcon(res.file_type)}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{res.file_name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(res.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 shrink-0"
                                  onClick={() => window.open(res.file_url, '_blank')}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    }
                  })
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Input Area */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2 items-end">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 h-10 w-10"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Paperclip className="w-4 h-4" />
                )}
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendAdminMessage()}
                  className="pr-12"
                />
              </div>
              <Button 
                onClick={sendAdminMessage} 
                disabled={submitting || !newMessage.trim()}
                size="icon"
                className="shrink-0 h-10 w-10"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Attach images, PDFs, or documents • Press Enter to send
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Suggestions Dialog */}
      <Dialog open={showSuggestionsDialog} onOpenChange={(open) => { setShowSuggestionsDialog(open); if (!open) setSelectedProject(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Suggestions - {selectedProject?.name}
            </DialogTitle>
            <DialogDescription>Review and respond to client suggestions</DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 py-4">
              {suggestions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No suggestions from client yet</p>
                </div>
              ) : (
                suggestions.map((suggestion) => (
                  <SuggestionCard 
                    key={suggestion.id} 
                    suggestion={suggestion} 
                    onUpdate={updateSuggestionStatus} 
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Separate component for suggestions to handle individual state
const SuggestionCard = ({ 
  suggestion, 
  onUpdate 
}: { 
  suggestion: ProjectSuggestion; 
  onUpdate: (id: string, status: string, response: string) => void;
}) => {
  const [response, setResponse] = useState(suggestion.admin_response || '');
  const [status, setStatus] = useState(suggestion.status);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
      case 'implemented': return <Badge className="bg-blue-500">Implemented</Badge>;
      default: return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <Card>
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{suggestion.title}</h4>
          {getStatusBadge(status)}
        </div>
        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
        <p className="text-xs text-muted-foreground">
          Submitted: {new Date(suggestion.created_at).toLocaleDateString()}
        </p>
        <div className="space-y-2 pt-2 border-t">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="implemented">Implemented</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Your response to the client..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={2}
          />
          <Button 
            size="sm" 
            onClick={() => onUpdate(suggestion.id, status, response)}
            className="w-full"
          >
            Update Suggestion
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProjectPanel;