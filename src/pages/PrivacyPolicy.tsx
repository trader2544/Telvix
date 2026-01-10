import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Shield, Eye, Database, UserCheck, Lock, Mail, Sparkles } from 'lucide-react';

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: [
      'We collect information you provide directly to us, such as when you:',
    ],
    list: [
      'Contact us through our website forms',
      'Subscribe to our newsletters or updates',
      'Request quotes or consultations',
      'Apply for career opportunities',
    ],
    footer: 'This may include your name, email address, phone number, company information, and project details.',
  },
  {
    icon: Database,
    title: 'How We Use Your Information',
    content: ['We use the information we collect to:'],
    list: [
      'Respond to your inquiries and provide customer support',
      'Send you project updates and communications',
      'Process job applications and recruitment',
      'Improve our services and website functionality',
      'Comply with legal obligations',
    ],
  },
  {
    icon: UserCheck,
    title: 'Information Sharing',
    content: ['We do not sell, trade, or otherwise transfer your personal information to third parties except:'],
    list: [
      'With your explicit consent',
      'To trusted service providers who assist us in operating our website',
      'When required by law or to protect our rights',
      'In connection with a business transfer or merger',
    ],
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: ['We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:'],
    list: [
      'SSL encryption for data transmission',
      'Secure servers and databases',
      'Regular security audits and updates',
      'Limited access to personal information',
    ],
  },
  {
    icon: Mail,
    title: 'Contact Us',
    content: ['If you have any questions about this Privacy Policy or our data practices, please contact us:'],
    contact: {
      email: 'telvixhr@outlook.com',
      phone: '+254741947599',
    },
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/50 rounded-3xl mb-6 shadow-2xl shadow-primary/30"
            >
              <Shield className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground mt-4"
            >
              Last updated: {new Date().toLocaleDateString()}
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-sm bg-card/50 border border-border/50 rounded-3xl p-6 md:p-8 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">{section.title}</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    {section.content?.map((text, i) => (
                      <p key={i}>{text}</p>
                    ))}
                    {section.list && (
                      <ul className="list-none space-y-2 pl-4">
                        {section.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Sparkles className="w-4 h-4 text-primary mt-1 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.footer && <p>{section.footer}</p>}
                    {section.contact && (
                      <div className="bg-muted/50 p-4 rounded-xl border border-border/50">
                        <p><strong>Email:</strong> {section.contact.email}</p>
                        <p><strong>Phone:</strong> {section.contact.phone}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
