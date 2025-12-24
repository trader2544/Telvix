import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  Eye,
  Lightbulb
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
      
      toast.success('Project created successfully!');
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

  const getUserName = (userId: string | null) => {
    if (!userId) return 'Unassigned';
    const userProfile = users.find(u => u.user_id === userId);
    return userProfile?.full_name || 'Unknown User';
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Management</h2>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Create a new project for a client</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="projectCode">Project ID *</Label>
                <Input
                  id="projectCode"
                  placeholder="e.g., PRJ-001"
                  value={newProjectCode}
                  onChange={(e) => setNewProjectCode(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  placeholder="Project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectDesc">Description</Label>
                <Textarea
                  id="projectDesc"
                  placeholder="Project description..."
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectUrl">Website URL</Label>
                <Input
                  id="projectUrl"
                  placeholder="https://example.com"
                  value={newProjectUrl}
                  onChange={(e) => setNewProjectUrl(e.target.value)}
                />
              </div>
              <Button onClick={createProject} disabled={submitting} className="w-full">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Create Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FolderOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No projects yet. Create your first project!</p>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FolderOpen className="w-5 h-5" />
                      {project.name}
                    </CardTitle>
                    <CardDescription>ID: {project.project_code}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(project.status)} text-white`}>
                      {project.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{project.progress}%</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{getUserName(project.user_id)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openChat(project)}>
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openSuggestions(project)}>
                      <Lightbulb className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openEditProject(project)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteProject(project.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={!!selectedProject && !showChatDialog && !showSuggestionsDialog} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update project details and assign to a user</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
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
              <Label>Admin Notes</Label>
              <Textarea
                placeholder="Notes visible to the user..."
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Website URL</Label>
              <Input
                placeholder="https://example.com"
                value={editWebsiteUrl}
                onChange={(e) => setEditWebsiteUrl(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => selectedProject && updateProject(selectedProject.id)} 
              disabled={submitting} 
              className="w-full"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Update Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={(open) => { setShowChatDialog(open); if (!open) setSelectedProject(null); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chat - {selectedProject?.name}</DialogTitle>
            <DialogDescription>Communicate with the client</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No messages yet</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.is_admin ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.is_admin
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.is_admin ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {msg.is_admin ? 'Admin' : 'Client'} • {new Date(msg.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="flex gap-2 pt-4">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendAdminMessage()}
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
            <DialogTitle>Suggestions - {selectedProject?.name}</DialogTitle>
            <DialogDescription>Review and respond to client suggestions</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {suggestions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No suggestions yet</p>
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

  return (
    <Card>
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{suggestion.title}</h4>
          <Badge variant={
            status === 'approved' ? 'default' :
            status === 'rejected' ? 'destructive' :
            status === 'implemented' ? 'secondary' : 'outline'
          }>
            {status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
        <div className="space-y-2">
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
            placeholder="Your response..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={2}
          />
          <Button 
            size="sm" 
            onClick={() => onUpdate(suggestion.id, status, response)}
          >
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProjectPanel;
