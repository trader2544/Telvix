import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, Send, PhoneCall } from 'lucide-react';
declare global {
  interface Window {
    emailjs: any;
  }
}
const Contact = () => {
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      };
      await window.emailjs.send('service_nzx6w0k', 'template_krkmosf', templateParams);
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon."
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleWhatsApp = () => {
    window.open('https://wa.me/254741947599', '_blank');
  };
  const handlePhoneCall = () => {
    window.open('tel:+254741947599', '_self');
  };
  return <section id="contact" className="mobile-spacing bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Let's Start Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Digital Journey</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Ready to transform your business? Get in touch with our expert team and let's discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Get In Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Phone</p>
                    <p className="text-xs text-gray-600">+254 741 947 599</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email</p>
                    <p className="text-xs text-gray-600">telvixhr@outlook.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Location</p>
                    <p className="text-xs text-gray-600">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                
                
              </div>
            </div>
          </div>

          <div>
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-xl">
              <CardContent className="p-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-2">
                    <div>
                      <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="h-9 border-2 border-gray-200 focus:border-primary rounded-lg text-sm" />
                    </div>
                    <div>
                      <Input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="h-9 border-2 border-gray-200 focus:border-primary rounded-lg text-sm" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-2">
                    <div>
                      <Input type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} className="h-9 border-2 border-gray-200 focus:border-primary rounded-lg text-sm" />
                    </div>
                    <div>
                      <Input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="h-9 border-2 border-gray-200 focus:border-primary rounded-lg text-sm" />
                    </div>
                  </div>
                  
                  <div>
                    <Textarea name="message" placeholder="Tell us about your project..." value={formData.message} onChange={handleChange} required rows={3} className="border-2 border-gray-200 focus:border-primary rounded-lg resize-none text-sm" />
                  </div>
                  
                  <Button type="submit" size="sm" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-2 text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" disabled={isLoading}>
                    {isLoading ? <div className="flex items-center">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div> : <div className="flex items-center">
                        <Send className="w-3 h-3 mr-2" />
                        Send Message
                      </div>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;