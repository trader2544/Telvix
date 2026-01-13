import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Send, CheckCircle, PhoneCall, Calculator, Clock, HelpCircle, Star, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveCostCalculator from '@/components/InteractiveCostCalculator';
import ProjectTimelineEstimator from '@/components/ProjectTimelineEstimator';
import ServiceRecommendationQuiz from '@/components/ServiceRecommendationQuiz';
import PremiumServices from '@/components/PremiumServices';
declare global {
  interface Window {
    emailjs: any;
  }
}
const Quote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userCurrency, setUserCurrency] = useState('KSh');
  const [formData, setFormData] = useState({
    service: '',
    priceRange: '',
    email: '',
    phone: '',
    projectDetails: ''
  });
  useEffect(() => {
    setUserCurrency('KSh');
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    if (service) {
      setFormData(prev => ({
        ...prev,
        service: decodeURIComponent(service)
      }));
    }
  }, [location]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleServiceSelect = (service: string) => {
    setFormData(prev => ({
      ...prev,
      service
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const templateParams = {
        service: formData.service,
        price_range: formData.priceRange,
        email: formData.email,
        phone: formData.phone,
        project_details: formData.projectDetails,
        currency: userCurrency
      };
      await window.emailjs.send('service_nzx6w0k', 'template_krkmosf', templateParams);
      setIsSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you within 24 hours via call or email."
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handlePhoneCall = () => {
    window.open('tel:+254741947599', '_self');
  };
  if (isSubmitted) {
    return <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.5
          }} className="max-w-2xl mx-auto text-center py-20">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Quote Request Submitted!
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Thank you for your interest. We'll review your requirements and contact you within 24 hours via call or email.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate('/')} className="group">
                  Back to Home
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/portfolio')}>
                  View Our Portfolio
                </Button>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>;
  }
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Floating Phone Call Button */}
      <motion.div initial={{
      scale: 0
    }} animate={{
      scale: 1
    }} transition={{
      delay: 0.5,
      type: 'spring'
    }} className="fixed bottom-6 left-6 z-50">
        
      </motion.div>
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Get Started
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Get Your{' '}
                <span className="text-primary">Free Quote</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Use our interactive tools to estimate costs, timelines, and find the perfect service for your needs.
              </p>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }}>
              <Tabs defaultValue="quote" className="space-y-8">
                <TabsList className="grid w-full grid-cols-5 bg-muted/50 p-1 rounded-xl">
                  <TabsTrigger value="quote" className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <Send className="w-4 h-4" />
                    <span className="text-xs">Quote</span>
                  </TabsTrigger>
                  <TabsTrigger value="calculator" className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <Calculator className="w-4 h-4" />
                    <span className="text-xs">Cost</span>
                  </TabsTrigger>
                  <TabsTrigger value="premium" className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <Star className="w-4 h-4" />
                    <span className="text-xs">Pro</span>
                  </TabsTrigger>
                  <TabsTrigger value="quiz" className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-xs">Quiz</span>
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Time</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="quote">
                  <Card className="border border-border/50 shadow-lg">
                    <CardContent className="p-8">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Service Needed *
                          </label>
                          <select name="service" value={formData.service} onChange={handleChange} required className="w-full h-12 border border-border rounded-xl px-4 bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                            <option value="">Select a service</option>
                            <option value="Web Design & Development">Web Design & Development</option>
                            <option value="AI & Automation Solutions">AI & Automation Solutions</option>
                            <option value="SaaS Development">SaaS Development</option>
                            <option value="E-commerce Solutions">E-commerce Solutions</option>
                            <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="Custom Software Development">Custom Software Development</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Other">Other (Please specify in details)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Budget Range (KSh) *
                          </label>
                          <Input type="text" name="priceRange" placeholder="Enter your budget in KSh" value={formData.priceRange} onChange={handleChange} required className="h-12 rounded-xl" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Email Address *
                            </label>
                            <Input type="email" name="email" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} required className="h-12 rounded-xl" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Phone Number *
                            </label>
                            <Input type="tel" name="phone" placeholder="+254 700 000 000" value={formData.phone} onChange={handleChange} required className="h-12 rounded-xl" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Project Details *
                          </label>
                          <Textarea name="projectDetails" placeholder="Please describe your project requirements, timeline, and any specific features you need..." value={formData.projectDetails} onChange={handleChange} required rows={5} className="rounded-xl resize-none" />
                        </div>

                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                          <p className="text-sm text-foreground">
                            <strong>Response Time:</strong> We'll respond within 24 hours via call or email with a detailed quote and project timeline.
                          </p>
                        </div>

                        <Button type="submit" size="lg" className="w-full h-14 text-lg rounded-xl group" disabled={isLoading}>
                          {isLoading ? <div className="flex items-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                              Submitting...
                            </div> : <div className="flex items-center">
                              <Send className="w-5 h-5 mr-2" />
                              Submit Quote Request
                              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="calculator">
                  <InteractiveCostCalculator userCurrency="KSh" />
                </TabsContent>

                <TabsContent value="timeline">
                  <ProjectTimelineEstimator />
                </TabsContent>

                <TabsContent value="quiz">
                  <ServiceRecommendationQuiz onServiceSelect={handleServiceSelect} />
                </TabsContent>

                <TabsContent value="premium">
                  <PremiumServices />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default Quote;