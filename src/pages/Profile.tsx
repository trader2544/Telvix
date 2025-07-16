
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Eye, Plus, X } from 'lucide-react';

const Profile = () => {
  const { user, profile, updateProfile, signOut, loading } = useAuth();
  const [fullName, setFullName] = useState('');
  const [updating, setUpdating] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      // Load project IDs from profile or localStorage as fallback
      const savedProjectIds = localStorage.getItem(`projectIds_${user?.id}`) || '[]';
      try {
        setProjectIds(JSON.parse(savedProjectIds));
      } catch {
        setProjectIds([]);
      }
    }
  }, [profile, user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      const { error } = await updateProfile({ full_name: fullName });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error('An error occurred while updating profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleAddProjectId = () => {
    if (projectId.trim() && !projectIds.includes(projectId.trim())) {
      const newProjectIds = [...projectIds, projectId.trim()];
      setProjectIds(newProjectIds);
      localStorage.setItem(`projectIds_${user?.id}`, JSON.stringify(newProjectIds));
      setProjectId('');
      toast.success('Project ID added successfully!');
    } else if (projectIds.includes(projectId.trim())) {
      toast.error('Project ID already exists');
    } else {
      toast.error('Please enter a valid project ID');
    }
  };

  const handleRemoveProjectId = (idToRemove: string) => {
    const newProjectIds = projectIds.filter(id => id !== idToRemove);
    setProjectIds(newProjectIds);
    localStorage.setItem(`projectIds_${user?.id}`, JSON.stringify(newProjectIds));
    toast.success('Project ID removed successfully!');
  };

  const handleViewProgress = (id: string) => {
    // This would typically navigate to a project progress page or open a modal
    toast.info(`Viewing progress for project: ${id}`);
    // Future implementation: navigate(`/project-progress/${id}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Profile Settings</span>
                <Badge variant={profile?.role === 'admin' ? 'default' : 'secondary'}>
                  {profile?.role || 'user'}
                </Badge>
              </CardTitle>
              <CardDescription>
                Manage your account settings and personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user.email || ''} disabled />
              </div>
              
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                
                <Button type="submit" disabled={updating}>
                  {updating ? 'Updating...' : 'Update Profile'}
                </Button>
              </form>
              
              <div className="pt-4 border-t">
                <Button variant="destructive" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Project Progress Tracking Card */}
          <Card>
            <CardHeader>
              <CardTitle>Project Progress Tracking</CardTitle>
              <CardDescription>
                Add project IDs to track your project progress and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Project ID Section */}
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Label htmlFor="projectId">Project ID</Label>
                    <Input
                      id="projectId"
                      type="text"
                      placeholder="Enter project ID"
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddProjectId()}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddProjectId} size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Project IDs List */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-gray-700">Your Projects</h4>
                {projectIds.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No project IDs added yet.</p>
                    <p className="text-sm">Add a project ID above to start tracking progress.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {projectIds.map((id, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <span className="font-mono text-sm text-gray-800">{id}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewProgress(id)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Progress
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveProjectId(id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {projectIds.length > 0 && (
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <p><strong>Note:</strong> Project progress tracking allows you to monitor the status of your commissioned projects. Contact us for detailed progress reports and updates.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
