
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Code, Smartphone, Globe, Database, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Careers = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const jobs = [
    {
      id: 1,
      title: "M-Pesa Integration Setup",
      category: "web",
      location: "Remote (Kenya)",
      type: "Small Gig",
      budget: "KSh 15,000 - 25,000",
      description: "Integrate M-Pesa payment gateway into existing websites or new applications.",
      skills: ["PHP", "JavaScript", "M-Pesa API", "Laravel/React"],
      urgent: true
    },
    {
      id: 2,
      title: "Simple Business Website",
      category: "web",
      location: "Remote (Nigeria)",
      type: "Small Project",
      budget: "₦80,000 - 120,000",
      description: "Create responsive business websites with contact forms and basic SEO.",
      skills: ["HTML", "CSS", "JavaScript", "WordPress"],
      urgent: false
    },
    {
      id: 3,
      title: "Mobile App UI Design",
      category: "design",
      location: "Remote (Kenya)",
      type: "Design Gig",
      budget: "KSh 20,000 - 35,000",
      description: "Design mobile app interfaces using Figma for local businesses.",
      skills: ["Figma", "UI/UX Design", "Mobile Design", "Prototyping"],
      urgent: true
    },
    {
      id: 4,
      title: "WhatsApp Business Integration",
      category: "web",
      location: "Remote (Nigeria)",
      type: "Quick Task",
      budget: "₦25,000 - 40,000",
      description: "Set up WhatsApp Business API for customer communication systems.",
      skills: ["WhatsApp API", "Node.js", "PHP", "JavaScript"],
      urgent: false
    },
    {
      id: 5,
      title: "WordPress Customization",
      category: "web",
      location: "Remote (Kenya)",
      type: "Small Gig",
      budget: "KSh 12,000 - 20,000",
      description: "Customize WordPress themes and add basic e-commerce functionality.",
      skills: ["WordPress", "PHP", "WooCommerce", "CSS"],
      urgent: true
    },
    {
      id: 6,
      title: "Social Media Automation",
      category: "automation",
      location: "Remote (Nigeria)",
      type: "Automation Task",
      budget: "₦30,000 - 50,000",
      description: "Create automated posting systems for social media management.",
      skills: ["Python", "APIs", "Automation", "Social Media"],
      urgent: false
    },
    {
      id: 7,
      title: "Simple Mobile App",
      category: "mobile",
      location: "Remote (Kenya)",
      type: "App Project",
      budget: "KSh 40,000 - 70,000",
      description: "Build basic mobile apps for local businesses using React Native.",
      skills: ["React Native", "JavaScript", "Mobile Development"],
      urgent: true
    },
    {
      id: 8,
      title: "Database Setup & Migration",
      category: "backend",
      location: "Remote (Nigeria)",
      type: "Technical Task",
      budget: "₦35,000 - 60,000",
      description: "Set up databases and migrate data for small to medium businesses.",
      skills: ["MySQL", "PostgreSQL", "Data Migration", "PHP"],
      urgent: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Gigs', icon: Globe },
    { id: 'web', name: 'Web Tasks', icon: Code },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
    { id: 'design', name: 'Design', icon: Zap },
    { id: 'automation', name: 'Automation', icon: Bot },
    { id: 'backend', name: 'Backend', icon: Database }
  ];

  const filteredJobs = selectedCategory === 'all' 
    ? jobs 
    : jobs.filter(job => job.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Small <span className="text-accent">Gigs & Tasks</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Quick projects for talented developers from Kenya and Nigeria
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="w-12 h-12 text-accent mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Remote Work</h3>
                <p className="text-white/80">Work from anywhere in Kenya or Nigeria</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <DollarSign className="w-12 h-12 text-accent mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Local Currency</h3>
                <p className="text-white/80">Payment in KSh and Naira for quick tasks</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Clock className="w-12 h-12 text-accent mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Fast Turnaround</h3>
                <p className="text-white/80">Complete tasks within days, not weeks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              );
            })}
          </div>

          {/* Job Listings */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    {job.urgent && (
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.type}</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-sm font-semibold">{job.budget}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                    {job.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.skills.map((skill) => (
                      <span key={skill} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-accent hover:bg-accent/90">
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Application Process */}
          <div className="mt-16 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-center mb-8">How to Apply</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Submit Portfolio</h3>
                <p className="text-gray-600 text-sm">Send us your best work samples</p>
              </div>
              <div className="text-center">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Quick Chat</h3>
                <p className="text-gray-600 text-sm">Brief discussion about the task</p>
              </div>
              <div className="text-center">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Start Task</h3>
                <p className="text-gray-600 text-sm">Begin working on the project</p>
              </div>
              <div className="text-center">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Get Paid</h3>
                <p className="text-gray-600 text-sm">Receive payment in local currency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
