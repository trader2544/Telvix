
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Wallet, Code, Smartphone, Globe, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Careers = () => {
  const gigs = [
    {
      title: "M-Pesa Integration Developer",
      location: "Kenya (Remote)",
      type: "Freelance",
      budget: "KSh 15,000 - 30,000",
      currency: "KSh",
      icon: Wallet,
      description: "Integrate M-Pesa payment gateway into existing web applications.",
      skills: ["PHP", "Node.js", "M-Pesa API", "MySQL"],
      duration: "1-2 weeks"
    },
    {
      title: "React Frontend Developer", 
      location: "Nigeria (Remote)",
      type: "Freelance",
      budget: "₦50,000 - 80,000",
      currency: "₦",
      icon: Code,
      description: "Build responsive React components for e-commerce platform.",
      skills: ["React", "TypeScript", "Tailwind CSS", "Redux"],
      duration: "2-3 weeks"
    },
    {
      title: "WordPress Plugin Developer",
      location: "Kenya (Remote)", 
      type: "Freelance",
      budget: "KSh 20,000 - 40,000",
      currency: "KSh",
      icon: Globe,
      description: "Create custom WordPress plugin for rental management system.",
      skills: ["WordPress", "PHP", "MySQL", "JavaScript"],
      duration: "1-2 weeks"
    },
    {
      title: "Mobile App UI Designer",
      location: "Nigeria (Remote)",
      type: "Freelance", 
      budget: "₦40,000 - 70,000",
      currency: "₦",
      icon: Smartphone,
      description: "Design modern UI/UX for Flutter mobile application.",
      skills: ["Figma", "Adobe XD", "UI/UX", "Mobile Design"],
      duration: "1-2 weeks"
    },
    {
      title: "Database Optimization Specialist",
      location: "Kenya (Remote)",
      type: "Freelance",
      budget: "KSh 25,000 - 45,000", 
      currency: "KSh",
      icon: Zap,
      description: "Optimize MySQL database performance for high-traffic application.",
      skills: ["MySQL", "Database Design", "Performance Tuning", "Indexing"],
      duration: "1 week"
    },
    {
      title: "API Integration Developer",
      location: "Nigeria (Remote)",
      type: "Freelance",
      budget: "₦60,000 - 100,000",
      currency: "₦", 
      icon: Code,
      description: "Integrate third-party APIs for fintech application.",
      skills: ["Node.js", "Express", "REST APIs", "Authentication"],
      duration: "2-3 weeks"
    }
  ];

  const benefits = [
    "Flexible working hours",
    "Remote work opportunities", 
    "Competitive project rates",
    "Skill development programs",
    "Direct client communication",
    "Portfolio building projects"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Freelance <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Opportunities</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join our network of talented developers from Kenya and Nigeria. Work on exciting projects with competitive rates and flexible schedules.
            </p>
          </div>

          {/* Available Gigs */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Available Gigs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gigs.map((gig, index) => {
                const IconComponent = gig.icon;
                return (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mr-4">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {gig.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {gig.location}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {gig.description}
                      </p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm">
                          <Wallet className="w-4 h-4 text-green-600 mr-2" />
                          <span className="font-semibold text-green-600">{gig.budget}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 text-blue-600 mr-2" />
                          <span className="text-gray-600">{gig.duration}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {gig.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                        onClick={() => window.open('https://wa.me/254741947599', '_blank')}
                      >
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Work With Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Our Team?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Send us your portfolio and let's discuss how we can work together on exciting projects.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg"
              onClick={() => window.open('https://wa.me/254741947599', '_blank')}
            >
              Contact Us on WhatsApp
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
