import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { FileText, Users, CreditCard, AlertTriangle, Scale, Phone } from 'lucide-react';
const sections = [{
  icon: Users,
  title: 'Acceptance of Terms',
  content: ['By accessing and using Telvix\'s services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.', 'These terms apply to all visitors, users, and others who access or use our services.']
}, {
  icon: CreditCard,
  title: 'Services and Payment',
  content: ['Telvix provides digital development services including:'],
  list: ['Web application development', 'Mobile application development', 'SaaS solutions and platforms', 'AI integration and automation', 'Freelance developer placement'],
  footer: 'Payment terms and project specifications will be outlined in individual project agreements. All payments are due according to the agreed schedule.'
}, {
  icon: AlertTriangle,
  title: 'Freelancer Services',
  content: ['Our freelancer placement service is currently available for:'],
  list: ['Kenyan developers and digital professionals', 'Nigerian developers and digital professionals'],
  footer: 'All freelancers are vetted for quality and professionalism. Project assignments are based on availability and skill match. Telvix acts as an intermediary and is not directly responsible for freelancer performance, though we provide support and mediation when needed.'
}, {
  icon: Scale,
  title: 'Limitation of Liability',
  content: ['In no event shall Telvix, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.', 'Our liability is limited to the amount paid by you for the specific service in question. We provide services "as is" and make no warranties, express or implied.']
}, {
  icon: Phone,
  title: 'Contact Information',
  content: ['For questions about these Terms of Service, please contact us:'],
  contact: {
    email: 'telvixhr@outlook.com',
    phone: '+254741947599'
  },
  footer: 'We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of any changes.'
}];
const TermsOfService = () => {
  return <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <Header />
      
      <main className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Terms of Service
            </motion.h1>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Please read these terms carefully before using our services.
            </motion.p>
            <motion.p initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.3
          }} className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-8">
              {sections.map((section, index) => <motion.div key={section.title} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} className="backdrop-blur-sm bg-card/50 border border-border/50 rounded-3xl p-6 md:p-8 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                    
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">{section.title}</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    {section.content?.map((text, i) => <p key={i}>{text}</p>)}
                    {section.list && <ul className="list-none space-y-2 pl-4">
                        {section.list.map((item, i) => <li key={i} className="flex items-start gap-3">
                            
                            <span>{item}</span>
                          </li>)}
                      </ul>}
                    {section.footer && <p>{section.footer}</p>}
                    {section.contact && <div className="bg-muted/50 p-4 rounded-xl border border-border/50">
                        <p><strong>Email:</strong> {section.contact.email}</p>
                        <p><strong>Phone:</strong> {section.contact.phone}</p>
                      </div>}
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default TermsOfService;