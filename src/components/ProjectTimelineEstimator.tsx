import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const ProjectTimelineEstimator = () => {
  const [selectedService, setSelectedService] = useState('');
  const [projectSize, setProjectSize] = useState('');
  const [timeline, setTimeline] = useState<any>(null);
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const services = ['Web Design & Development', 'AI & Automation Solutions', 'SaaS Development', 'E-commerce Solutions', 'Mobile App Development', 'Custom Software Development'];
  const projectSizes = ['Small', 'Medium', 'Large', 'Enterprise'];
  const calculateTimeline = () => {
    const timelines: any = {
      'Web Design & Development': {
        'Small': {
          weeks: '1-2',
          phases: ['Design', 'Development', 'Testing']
        },
        'Medium': {
          weeks: '2-4',
          phases: ['Planning', 'Design', 'Development', 'Testing']
        },
        'Large': {
          weeks: '4-8',
          phases: ['Planning', 'Design', 'Development', 'Testing', 'Launch']
        },
        'Enterprise': {
          weeks: '8-12',
          phases: ['Strategy', 'Planning', 'Design', 'Development', 'Testing', 'Launch']
        }
      },
      'AI & Automation Solutions': {
        'Small': {
          weeks: '1-2',
          phases: ['Analysis', 'Setup', 'Testing']
        },
        'Medium': {
          weeks: '2-3',
          phases: ['Analysis', 'Development', 'Integration', 'Testing']
        },
        'Large': {
          weeks: '3-6',
          phases: ['Planning', 'Development', 'Integration', 'Testing', 'Optimization']
        },
        'Enterprise': {
          weeks: '6-10',
          phases: ['Strategy', 'Architecture', 'Development', 'Integration', 'Testing', 'Deployment']
        }
      },
      'SaaS Development': {
        'Small': {
          weeks: '2-4',
          phases: ['MVP Planning', 'Development', 'Testing']
        },
        'Medium': {
          weeks: '4-8',
          phases: ['Planning', 'Core Development', 'Features', 'Testing']
        },
        'Large': {
          weeks: '8-16',
          phases: ['Architecture', 'Core Development', 'Features', 'Testing', 'Launch']
        },
        'Enterprise': {
          weeks: '16-24',
          phases: ['Strategy', 'Architecture', 'Development', 'Advanced Features', 'Testing', 'Launch']
        }
      },
      'E-commerce Solutions': {
        'Small': {
          weeks: '2-3',
          phases: ['Setup', 'Design', 'Testing']
        },
        'Medium': {
          weeks: '3-6',
          phases: ['Planning', 'Design', 'Development', 'Testing']
        },
        'Large': {
          weeks: '6-10',
          phases: ['Planning', 'Design', 'Development', 'Integration', 'Testing']
        },
        'Enterprise': {
          weeks: '10-16',
          phases: ['Strategy', 'Architecture', 'Development', 'Integration', 'Testing', 'Launch']
        }
      },
      'Mobile App Development': {
        'Small': {
          weeks: '3-6',
          phases: ['Design', 'Development', 'Testing']
        },
        'Medium': {
          weeks: '6-12',
          phases: ['Planning', 'Design', 'Development', 'Testing']
        },
        'Large': {
          weeks: '12-20',
          phases: ['Planning', 'Design', 'Development', 'Testing', 'Launch']
        },
        'Enterprise': {
          weeks: '20-32',
          phases: ['Strategy', 'Architecture', 'Development', 'Testing', 'Launch', 'Maintenance']
        }
      },
      'Custom Software Development': {
        'Small': {
          weeks: '3-6',
          phases: ['Analysis', 'Development', 'Testing']
        },
        'Medium': {
          weeks: '6-12',
          phases: ['Planning', 'Development', 'Integration', 'Testing']
        },
        'Large': {
          weeks: '12-24',
          phases: ['Architecture', 'Development', 'Integration', 'Testing', 'Deployment']
        },
        'Enterprise': {
          weeks: '24-40',
          phases: ['Strategy', 'Architecture', 'Development', 'Testing', 'Deployment', 'Support']
        }
      }
    };
    setTimeline(timelines[selectedService]?.[projectSize]);
  };
  const resetEstimator = () => {
    setSelectedService('');
    setProjectSize('');
    setTimeline(null);
  };
  if (!user) {
    return <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Clock className="w-5 h-5" />
            Project Timeline Estimator
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">
              Login Required 🔐
            </h3>
            <p className="text-blue-600 mb-6">
              Please sign in to access our project timeline estimator and get realistic timelines for your projects.
            </p>
            <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-6">
              Sign In to Estimate Timeline ⏰
            </Button>
          </div>
        </CardContent>
      </Card>;
  }
  if (timeline) {
    return <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Timeline Estimate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">
              {timeline.weeks} weeks
            </h3>
            <p className="text-blue-600 text-sm mb-4">
              Estimated timeline for {selectedService} ({projectSize} project)
            </p>
            
            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-blue-800">Project Phases:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {timeline.phases.map((phase: string, index: number) => <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {phase}
                  </span>)}
              </div>
            </div>

            <div className="space-y-2">
              <Button onClick={resetEstimator} variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
                Calculate Another Timeline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>;
  }
  return <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          
          Project Timeline Estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Service Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {services.map(service => <Button key={service} variant={selectedService === service ? "default" : "outline"} className="text-left justify-start h-auto p-3" onClick={() => setSelectedService(service)}>
                <div className="flex items-center gap-2">
                  {service.includes('AI') || service.includes('SaaS')}
                  <span className="text-sm">{service}</span>
                </div>
              </Button>)}
          </div>
        </div>

        {selectedService && <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Project Size
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {projectSizes.map(size => <Button key={size} variant={projectSize === size ? "default" : "outline"} onClick={() => setProjectSize(size)} className="text-sm">
                  {size}
                </Button>)}
            </div>
          </div>}

        {selectedService && projectSize && <Button onClick={calculateTimeline} className="w-full bg-gradient-to-r from-primary to-accent">
            <Calendar className="w-4 h-4 mr-2" />
            Calculate Timeline
          </Button>}
      </CardContent>
    </Card>;
};
export default ProjectTimelineEstimator;