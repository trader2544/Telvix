import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { User, Mail, Shield, LogOut, Loader2, Sparkles, Save } from 'lucide-react';
const Profile = () => {
  const {
    user,
    profile,
    updateProfile,
    signOut,
    loading
  } = useAuth();
  const [fullName, setFullName] = useState('');
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
    }
  }, [profile]);
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const {
        error
      } = await updateProfile({
        full_name: fullName
      });
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
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };
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
  if (!user) {
    return null;
  }
  return <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="mb-8 text-center">
            
            <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and personal information</p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }}>
            <Card className="backdrop-blur-sm bg-card/80 border-border/50 overflow-hidden">
              {/* Avatar Section */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 flex flex-col items-center">
                
                
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Email (Read-only) */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input value={user.email || ''} disabled className="bg-muted/50 border-border/50 rounded-xl" />
                  <p className="text-xs text-muted-foreground">Your email address cannot be changed</p>
                </div>
                
                {/* Update Profile Form */}
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input id="fullName" type="text" placeholder="Enter your full name" value={fullName} onChange={e => setFullName(e.target.value)} className="rounded-xl" />
                  </div>
                  
                  <Button type="submit" disabled={updating} className="w-full rounded-xl h-12 gap-2">
                    {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {updating ? 'Updating...' : 'Save Changes'}
                  </Button>
                </form>
                
                <div className="pt-4 border-t border-border/50">
                  <Button variant="destructive" onClick={handleSignOut} className="w-full rounded-xl h-12 gap-2">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Profile;