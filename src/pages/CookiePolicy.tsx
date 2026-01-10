import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Cookie, Settings, BarChart, Shield, Eye, Mail, Sparkles, AlertTriangle } from 'lucide-react';

const sections = [
  {
    icon: Eye,
    title: 'What Are Cookies?',
    content: ['Cookies are small text files that are stored on your computer or mobile device when you visit a website. They help us provide you with a better experience by:'],
    list: [
      'Remembering your preferences and settings',
      'Enabling certain website features and functionality',
      'Helping us understand how you use our website',
      'Providing relevant content and advertisements',
    ],
  },
  {
    icon: Settings,
    title: 'Types of Cookies We Use',
    subsections: [
      {
        title: 'Essential Cookies',
        content: 'These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.',
      },
      {
        title: 'Analytics Cookies',
        content: 'We use these cookies to understand how visitors interact with our website, helping us improve our services and user experience.',
      },
      {
        title: 'Functional Cookies',
        content: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.',
      },
    ],
  },
  {
    icon: BarChart,
    title: 'Third-Party Cookies',
    content: ['We may use third-party services that set cookies on your device. These include:'],
    list: [
      'Google Analytics: To analyze website traffic and user behavior',
      'Social Media Platforms: For social sharing and integration features',
      'Communication Tools: For chat widgets and customer support',
    ],
    footer: 'These third parties have their own privacy policies and cookie practices, which we encourage you to review.',
  },
  {
    icon: Shield,
    title: 'Managing Cookies',
    content: ['You can control and manage cookies in various ways:'],
    list: [
      'Most web browsers allow you to control cookies through their settings',
      'You can set your browser to refuse all cookies or alert you when cookies are being sent',
      'You can delete cookies that have already been set',
      'You can opt out of third-party cookies through their respective websites',
    ],
    warning: 'Disabling certain cookies may affect the functionality of our website and your user experience.',
  },
  {
    icon: Mail,
    title: 'Contact Us',
    content: ['If you have any questions about our use of cookies, please contact us:'],
    contact: {
      email: 'telvixhr@outlook.com',
      phone: '+254741947599',
    },
    footer: 'We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.',
  },
];

const CookiePolicy = () => {
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
              <Cookie className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
            >
              Cookie Policy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Learn about how we use cookies to enhance your browsing experience.
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
                    {section.subsections && (
                      <div className="space-y-4">
                        {section.subsections.map((sub, i) => (
                          <div key={i} className="pl-4 border-l-2 border-primary/30">
                            <h3 className="font-semibold text-foreground mb-2">{sub.title}</h3>
                            <p>{sub.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
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
                    {section.warning && (
                      <div className="flex items-start gap-3 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                        <p className="text-sm"><strong>Note:</strong> {section.warning}</p>
                      </div>
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

export default CookiePolicy;
