
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
      title: "Frontend React Developer",
      category: "web",
      location: "Remote (Kenya/Nigeria)",
      type: "Freelance",
      budget: "$800 - $1,200",
      description: "Build modern React applications with TypeScript and Tailwind CSS for international clients.",
      skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript"],
      urgent: true
    },
    {
      id: 2,
      title: "Mobile App Developer",
      category: "mobile",
      location: "Remote (Kenya/Nigeria)",
      type: "Project-based",
      budget: "$1,500 - $2,500",
      description: "Develop cross-platform mobile applications using React Native or Flutter.",
      skills: ["React Native", "Flutter", "Mobile UI/UX", "API Integration"],
      urgent: false
    },
    {
      id: 3,
      title: "Full Stack MERN Developer",
      category: "fullstack",
      location: "Remote (Kenya/Nigeria)",
      type: "Freelance",
      budget: "$1,200 - $2,000",
      description: "Build complete web applications using MongoDB, Express, React, and Node.js stack.",
      skills: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs"],
      urgent: true
    },
    {
      id: 4,
      title: "WordPress Developer",
      category: "web",
      location: "Remote (Kenya/Nigeria)",
      type: "Part-time",
      budget: "$500 - $800",
      description: "Create custom WordPress themes and plugins for small to medium businesses.",
      skills: ["WordPress", "PHP", "MySQL", "CSS", "JavaScript"],
      urgent: false
    },
    {
      id: 5,
      title: "UI/UX Designer & Developer",
      category: "design",
      location: "Remote (Kenya/Nigeria)",
      type: "Freelance",
      budget: "$700 - $1,100",
      description: "Design and implement user interfaces for web and mobile applications.",
      skills: ["Figma", "Adobe XD", "HTML/CSS", "Responsive Design", "Prototyping"],
      urgent: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Jobs', icon: Globe },
    { id: 'web', name: 'Web Development', icon: Code },
    { id: 'mobile', name: 'Mobile Apps', icon: Smartphone },
    { id: 'fullstack', name: 'Full Stack', icon: Database },
    { id: 'design', name: 'UI/UX Design', icon: Zap }
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
              Join Our <span className="text-accent">Remote Team</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Exclusive opportunities for talented developers from Kenya and Nigeria
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="w-12 h-12 text-accent mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Remote First</h3>
                <p className="text-white/80">Work from anywhere in Kenya or Nigeria</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <DollarSign className="w-12 h-12 text-accent mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Competitive Pay</h3>
                <p className="text-white/80">Fair compensation in USD for quality work</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Clock className="w-12 h-12 text-accent mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Flexible Hours</h3>
                <p className="text-white/80">Choose your own working schedule</p>
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
                <h3 className="font-semibold mb-2">Technical Interview</h3>
                <p className="text-gray-600 text-sm">Quick skills assessment call</p>
              </div>
              <div className="text-center">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Test Project</h3>
                <p className="text-gray-600 text-sm">Small paid test assignment</p>
              </div>
              <div className="text-center">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Start Working</h3>
                <p className="text-gray-600 text-sm">Join our remote team!</p>
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
