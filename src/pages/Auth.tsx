import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff, RefreshCw, Loader2, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import telvixLogo from '@/assets/telvix-logo.png';
const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return {
    question: `${num1} + ${num2} = ?`,
    answer: num1 + num2
  };
};
const FloatingOrb = ({
  delay,
  size,
  x,
  y
}: {
  delay: number;
  size: number;
  x: string;
  y: string;
}) => <motion.div className="absolute rounded-full bg-gradient-to-br from-primary/30 to-primary/10 blur-xl" style={{
  width: size,
  height: size,
  left: x,
  top: y
}} animate={{
  y: [0, -30, 0],
  x: [0, 15, 0],
  scale: [1, 1.1, 1],
  opacity: [0.3, 0.6, 0.3]
}} transition={{
  duration: 8,
  delay,
  repeat: Infinity,
  ease: "easeInOut"
}} />;
const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [activeTab, setActiveTab] = useState('signin');
  const {
    signIn,
    signUp,
    user
  } = useAuth();
  const navigate = useNavigate();
  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
  }, []);
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        error
      } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Successfully signed in!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (parseInt(captchaInput) !== captcha.answer) {
      toast.error('Incorrect captcha answer');
      refreshCaptcha();
      return;
    }
    setLoading(true);
    try {
      const {
        error
      } = await signUp(email, password, fullName);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Please check your email to confirm your account');
      }
    } catch (error) {
      toast.error('An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };
  const features = [{
    icon: Zap,
    text: "Track project progress in real-time"
  }, {
    icon: Shield,
    text: "Secure communication with our team"
  }, {
    icon: Sparkles,
    text: "Suggest changes and improvements"
  }];
  return <div className="min-h-screen flex relative overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <FloatingOrb delay={0} size={300} x="10%" y="20%" />
        <FloatingOrb delay={2} size={200} x="70%" y="60%" />
        <FloatingOrb delay={4} size={150} x="80%" y="10%" />
        <FloatingOrb delay={1} size={250} x="20%" y="70%" />
        <FloatingOrb delay={3} size={180} x="50%" y="30%" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Left Side - Branding (Desktop) */}
      <motion.div initial={{
      opacity: 0,
      x: -50
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      duration: 0.8
    }} className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-16">
        
        
        <motion.h1 className="text-5xl font-bold text-foreground mb-6" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }}>
          Welcome to your
          <span className="block text-primary">Project Hub</span>
        </motion.h1>
        
        <motion.p className="text-xl text-muted-foreground mb-12 max-w-md" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.5
      }}>
          Access your project dashboard, track progress, and collaborate seamlessly with our team.
        </motion.p>

        <div className="space-y-6">
          {features.map((feature, index) => <motion.div key={index} className="flex items-center gap-4" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.6 + index * 0.1
        }}>
              
              <span className="text-foreground/80">{feature.text}</span>
            </motion.div>)}
        </div>
      </motion.div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 30,
        scale: 0.95
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }} className="w-full max-w-md">
          {/* Glassmorphic Card */}
          <div className="relative">
            {/* Glow effect behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl opacity-70" />
            
            <div className="relative bg-card/70 backdrop-blur-2xl border border-border/50 rounded-3xl p-8 shadow-2xl">
              {/* Mobile Logo */}
              <motion.div className="lg:hidden flex justify-center mb-8" initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              delay: 0.2,
              type: "spring"
            }}>
                <img src={telvixLogo} alt="Telvix" className="h-12 w-auto" />
              </motion.div>

              <div className="text-center mb-8">
                <motion.h2 className="text-2xl font-bold text-foreground" initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3
              }}>
                  {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
                </motion.h2>
                <motion.p className="text-muted-foreground mt-2" initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4
              }}>
                  {activeTab === 'signin' ? 'Sign in to access your dashboard' : 'Join us and start your project journey'}
                </motion.p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/30 p-1.5 rounded-2xl backdrop-blur-sm">
                  <TabsTrigger value="signin" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300 font-medium">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300 font-medium">
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <AnimatePresence mode="wait">
                  <TabsContent value="signin" key="signin">
                    <motion.form initial={{
                    opacity: 0,
                    x: -20
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} exit={{
                    opacity: 0,
                    x: 20
                  }} transition={{
                    duration: 0.3
                  }} onSubmit={handleSignIn} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email" className="text-foreground font-medium">Email</Label>
                        <div className="relative group">
                          <Input id="signin-email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required className="h-12 rounded-xl bg-muted/30 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all pl-4" />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password" className="text-foreground font-medium">Password</Label>
                        <div className="relative group">
                          <Input id="signin-password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required className="h-12 rounded-xl bg-muted/30 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all pl-4 pr-12" />
                          <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                          </Button>
                        </div>
                      </div>
                      <Button type="submit" className="w-full h-12 rounded-xl group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300" disabled={loading}>
                        {loading ? <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Signing in...
                          </> : <>
                            Sign In
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>}
                      </Button>
                    </motion.form>
                  </TabsContent>
                  
                  <TabsContent value="signup" key="signup">
                    <motion.form initial={{
                    opacity: 0,
                    x: 20
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} exit={{
                    opacity: 0,
                    x: -20
                  }} transition={{
                    duration: 0.3
                  }} onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-foreground font-medium">Full Name</Label>
                        <Input id="signup-name" type="text" placeholder="Enter your full name" value={fullName} onChange={e => setFullName(e.target.value)} required className="h-12 rounded-xl bg-muted/30 border-border/50 focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-foreground font-medium">Email</Label>
                        <Input id="signup-email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required className="h-12 rounded-xl bg-muted/30 border-border/50 focus:border-primary transition-colors" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="text-foreground font-medium text-sm">Password</Label>
                          <div className="relative">
                            <Input id="signup-password" type={showPassword ? 'text' : 'password'} placeholder="Create password" value={password} onChange={e => setPassword(e.target.value)} required className="h-12 rounded-xl bg-muted/30 border-border/50 focus:border-primary transition-colors pr-10" />
                            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-confirm-password" className="text-foreground font-medium text-sm">Confirm</Label>
                          <div className="relative">
                            <Input id="signup-confirm-password" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="h-12 rounded-xl bg-muted/30 border-border/50 focus:border-primary transition-colors pr-10" />
                            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-2 hover:bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                              {showConfirmPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Captcha */}
                      <motion.div className="p-4 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 backdrop-blur-sm" initial={{
                      opacity: 0,
                      scale: 0.95
                    }} animate={{
                      opacity: 1,
                      scale: 1
                    }} transition={{
                      delay: 0.2
                    }}>
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-foreground font-medium flex items-center gap-2">
                            <Shield className="w-4 h-4 text-primary" />
                            Security Check
                          </Label>
                          <Button type="button" variant="ghost" size="sm" onClick={refreshCaptcha} className="h-8 px-2 hover:bg-primary/10">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="px-5 py-3 bg-primary/10 rounded-xl border border-primary/20 font-mono text-lg font-bold text-foreground select-none">
                            {captcha.question}
                          </div>
                          <Input type="number" placeholder="?" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} required className="w-20 h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary text-center font-bold text-lg" />
                        </div>
                      </motion.div>

                      <Button type="submit" className="w-full h-12 rounded-xl group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300" disabled={loading}>
                        {loading ? <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating account...
                          </> : <>
                            Create Account
                            <Sparkles className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                          </>}
                      </Button>
                    </motion.form>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>

              {/* Footer */}
              <motion.div className="mt-8 text-center" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.5
            }}>
                <p className="text-xs text-muted-foreground">
                  By continuing, you agree to our{' '}
                  <a href="/terms-of-service" className="text-primary hover:underline">Terms</a>
                  {' '}and{' '}
                  <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>;
};
export default Auth;