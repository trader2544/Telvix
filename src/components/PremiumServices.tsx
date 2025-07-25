import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, FileText, Zap, Star, Calendar, Download } from 'lucide-react';

const PremiumServices = () => {
  const premiumServices = [
    {
      icon: Video,
      title: "1-on-1 Strategy Session",
      description: "60-minute consultation to discuss your project goals, technology stack, and roadmap.",
      price: "KSh 3,500",
      features: [
        "Personalized project assessment",
        "Technology recommendations",
        "Roadmap planning",
        "Q&A session",
        "Follow-up summary report"
      ],
      popular: true
    },
    {
      icon: FileText,
      title: "Project Audit & Consultation",
      description: "Comprehensive review of your existing project with improvement recommendations.",
      price: "KSh 7,000",
      features: [
        "Code review and analysis",
        "Performance assessment",
        "Security evaluation",
        "Improvement roadmap",
        "Technical documentation"
      ]
    }
  ];

  const digitalResources = [
    {
      icon: Zap,
      title: "n8n Automation Blueprints",
      description: "Ready-to-use n8n workflows from simple to complex business automations.",
      price: "KSh 2,500",
      features: [
        "20+ pre-built workflows",
        "Email automation templates",
        "CRM integration workflows",
        "Social media automation",
        "E-commerce automations",
        "Setup tutorials"
      ]
    },
    {
      icon: FileText,
      title: "Web Development Starter Kit",
      description: "Complete templates and guides for launching your web project.",
      price: "KSh 4,000",
      features: [
        "5 responsive website templates",
        "SEO optimization guide",
        "Performance checklist",
        "Deployment tutorials",
        "Maintenance guidelines"
      ]
    }
  ];

  const handleBookConsultation = (service: string) => {
    window.open(`https://calendly.com/your-calendly-link?service=${encodeURIComponent(service)}`, '_blank');
  };

  const handlePurchaseResource = (resource: string) => {
    // This would integrate with your payment system
    window.open(`mailto:hello@yourdomain.com?subject=Purchase: ${resource}`, '_self');
  };

  return (
    <div className="space-y-8">
      {/* Premium Consultations */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Premium <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Consultations</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {premiumServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className={`relative bg-white/90 backdrop-blur-sm border-0 shadow-lg ${service.popular ? 'ring-2 ring-accent' : ''}`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <IconComponent className="w-5 h-5 text-primary" />
                    <span className="text-base md:text-lg">{service.title}</span>
                  </CardTitle>
                  <div className="text-xl md:text-2xl font-bold text-accent">{service.price}</div>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <p className="text-gray-600 text-sm">{service.description}</p>
                  <ul className="space-y-1.5">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-xs md:text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => handleBookConsultation(service.title)}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-sm"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Session
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Digital Resources */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Digital <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Resources</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {digitalResources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <IconComponent className="w-5 h-5 text-primary" />
                    <span className="text-base md:text-lg">{resource.title}</span>
                  </CardTitle>
                  <div className="text-xl md:text-2xl font-bold text-accent">{resource.price}</div>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                  <ul className="space-y-1.5">
                    {resource.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-xs md:text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => handlePurchaseResource(resource.title)}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white text-sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Purchase & Download
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PremiumServices;
