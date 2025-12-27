import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  CheckCircle2
} from 'lucide-react';

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
  const [suggestions, setSuggestions] = useState<ProjectSuggestion[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [showSuggestionsDialog, setShowSuggestionsDialog] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // New project form
  const [newProjectCode, setNewProjectCode] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectUrl, setNewProjectUrl] = useState('');

  // Edit project form
  const [editStatus, setEditStatus] = useState('');
  const [editProgress, setEditProgress] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editUserId, setEditUserId] = useState('');
  const [editWebsiteUrl, setEditWebsiteUrl] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      const { error } = await supabase
        .from('projects')
        .update({
          status: editStatus,
          progress: parseInt(editProgress) || 0,
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
    setEditProgress(project.progress.toString());
    setEditNotes(project.admin_notes || '');
    setEditUserId(project.user_id || '');
    setEditWebsiteUrl(project.website_url || '');
  };

  const openChat = (project: Project) => {
    setSelectedProject(project);
    setShowChatDialog(true);
    fetchMessages(project.id);
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

  const getUserName = (userId: string | null) => {
    if (!userId) return 'Not Linked';
    const userProfile = users.find(u => u.user_id === userId);
    return userProfile?.full_name || 'Client';
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Management</h2>
          <p className="text-muted-foreground">Create and manage client web development projects</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Create a project and share the code with your client to link their account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectCode">Project Code *</Label>
                  <Input
                    id="projectCode"
                    placeholder="e.g., WEB-001"
                    value={newProjectCode}
                    onChange={(e) => setNewProjectCode(e.target.value.toUpperCase())}
                  />
                  <p className="text-xs text-muted-foreground">Client uses this to link their account</p>
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
                <p className="text-xs text-muted-foreground">Client can preview the site using this URL</p>
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
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex">
                {/* Left colored bar */}
                <div className={`w-1.5 ${getStatusColor(project.status)}`} />
                
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg truncate">{project.name}</h3>
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
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                          {project.description}
                        </p>
                      )}
                      
                      {/* Progress bar */}
                      <div className="flex items-center gap-3 mb-3">
                        <Progress value={project.progress} className="h-2 flex-1" />
                        <span className="text-sm font-medium text-muted-foreground w-12">
                          {project.progress}%
                        </span>
                      </div>
                      
                      {/* Status and user info */}
                      <div className="flex items-center gap-4 text-sm">
                        <Badge className={`${getStatusColor(project.status)} text-white`}>
                          {getStatusLabel(project.status)}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Users className="w-3.5 h-3.5" />
                          <span>{getUserName(project.user_id)}</span>
                          {project.user_id && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </div>
                        {project.website_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 gap-1.5 text-primary"
                            onClick={() => window.open(project.website_url!, '_blank')}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Preview Site
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex flex-col gap-1">
                      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => openChat(project)}>
                        <MessageSquare className="w-4 h-4" />
                        Chat
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => openSuggestions(project)}>
                        <Lightbulb className="w-4 h-4" />
                        Suggestions
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => openEditProject(project)}>
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" className="gap-1.5" onClick={() => deleteProject(project.id)}>
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={!!selectedProject && !showChatDialog && !showSuggestionsDialog} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Project: {selectedProject?.name}</DialogTitle>
            <DialogDescription>Update project details, status, and website URL</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
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
                <Label>Progress (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={editProgress}
                  onChange={(e) => setEditProgress(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Website Preview URL</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
              <p className="text-xs text-muted-foreground">This URL will be shown to the client as "View Site" button</p>
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
            <Button 
              onClick={() => selectedProject && updateProject(selectedProject.id)} 
              disabled={submitting} 
              className="w-full"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={(open) => { setShowChatDialog(open); if (!open) setSelectedProject(null); }}>
        <DialogContent className="max-w-2xl h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chat - {selectedProject?.name}
            </DialogTitle>
            <DialogDescription>
              Communicate with {getUserName(selectedProject?.user_id || null)} about this project
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 py-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.is_admin ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.is_admin
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : 'bg-muted text-foreground rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.is_admin ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {msg.is_admin ? 'You' : 'Client'} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="flex gap-2 pt-4 border-t">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendAdminMessage()}
              className="flex-1"
            />
            <Button onClick={sendAdminMessage} disabled={submitting || !newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Suggestions Dialog */}
      <Dialog open={showSuggestionsDialog} onOpenChange={(open) => { setShowSuggestionsDialog(open); if (!open) setSelectedProject(null); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Suggestions - {selectedProject?.name}
            </DialogTitle>
            <DialogDescription>Review and respond to client suggestions</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
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