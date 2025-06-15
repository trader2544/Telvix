import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Send, CheckCircle, PhoneCall, Calculator, Clock, HelpCircle, Star } from 'lucide-react';
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
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userCurrency, setUserCurrency] = useState('USD');
  
  const [formData, setFormData] = useState({
    service: '',
    priceRange: '',
    email: '',
    phone: '',
    projectDetails: ''
  });

  // Get user's location and set currency
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // Set currency based on country
        if (data.country_code === 'KE') {
          setUserCurrency('KSh');
        } else if (data.country_code === 'NG') {
          setUserCurrency('₦');
        } else if (data.country_code === 'UG') {
          setUserCurrency('UGX');
        } else if (data.country_code === 'TZ') {
          setUserCurrency('TZS');
        } else {
          setUserCurrency('USD');
        }
      } catch (error) {
        console.log('Could not detect location, using USD as default');
        setUserCurrency('USD');
      }
    };

    getUserLocation();
  }, []);

  // Get service from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    if (service) {
      setFormData(prev => ({ ...prev, service: decodeURIComponent(service) }));
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceSelect = (service: string) => {
    setFormData(prev => ({ ...prev, service }));
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

      await window.emailjs.send(
        'service_nzx6w0k',
        'template_krkmosf',
        templateParams
      );

      setIsSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you within 24 hours via call or email.",
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/50">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="mb-8">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Quote Request Submitted!
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Thank you for your interest in our services. We'll review your requirements and contact you within 24 hours via call or email.
                </p>
                <div className="space-y-4">
                  <Button 
                    onClick={() => navigate('/')}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 mr-4"
                  >
                    Back to Home
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/portfolio')}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    View Our Portfolio
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/50">
      <Header />
      
      {/* Floating Phone Call Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={handlePhoneCall}
          size="lg"
          className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
          title="Call us now"
        >
          <PhoneCall className="w-6 h-6" />
        </Button>
      </div>
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-primary mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Get Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Free Quote</span>
              </h1>
              <p className="text-xl text-gray-600">
                Use our interactive tools to estimate costs, timelines, and find the perfect service for your needs.
              </p>
            </div>

            <Tabs defaultValue="quote" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="quote" className="flex items-center gap-1">
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Quote</span>
                </TabsTrigger>
                <TabsTrigger value="calculator" className="flex items-center gap-1">
                  <Calculator className="w-4 h-4" />
                  <span className="hidden sm:inline">Calculator</span>
                </TabsTrigger>
                <TabsTrigger value="timeline" className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="hidden sm:inline">Timeline</span>
                </TabsTrigger>
                <TabsTrigger value="quiz" className="flex items-center gap-1">
                  <HelpCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Quiz</span>
                </TabsTrigger>
                <TabsTrigger value="premium" className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span className="hidden sm:inline">Premium</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="quote">
                <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Service Needed *
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="w-full h-12 border-2 border-gray-200 focus:border-primary rounded-xl px-4 bg-white"
                        >
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Budget Range ({userCurrency}) *
                        </label>
                        <Input
                          type="text"
                          name="priceRange"
                          placeholder={`Enter your budget in ${userCurrency}`}
                          value={formData.priceRange}
                          onChange={handleChange}
                          required
                          className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          placeholder="+254 700 000 000"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Project Details *
                        </label>
                        <Textarea
                          name="projectDetails"
                          placeholder="Please describe your project requirements, timeline, and any specific features you need..."
                          value={formData.projectDetails}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="border-2 border-gray-200 focus:border-primary rounded-xl resize-none"
                        />
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-sm text-blue-800">
                          <strong>Response Time:</strong> We'll respond within 24 hours via call or email with a detailed quote and project timeline.
                        </p>
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Submitting...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="w-5 h-5 mr-2" />
                            Submit Quote Request
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calculator">
                <InteractiveCostCalculator userCurrency={userCurrency} />
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Quote;
