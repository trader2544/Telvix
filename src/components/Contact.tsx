
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your interest. We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', company: '', message: '' });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get Your <span className="text-primary">Free Quote</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your digital transformation? Let's discuss your project and how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="animate-slide-up">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-primary mt-1">📧</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">info@digitelagency.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-primary mt-1">📞</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">+1-555-DIGITEL</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-primary mt-1">🌍</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Global Reach</h4>
                  <p className="text-gray-600">Serving clients worldwide with 24/7 support</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors cursor-pointer">
                  📘
                </div>
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors cursor-pointer">
                  🐦
                </div>
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors cursor-pointer">
                  💼
                </div>
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors cursor-pointer">
                  📷
                </div>
              </div>
            </div>
          </div>

          <div className="animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>
              
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12"
                />
              </div>
              
              <div>
                <Input
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="h-12"
                />
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder="Tell us about your project... *"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 text-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
