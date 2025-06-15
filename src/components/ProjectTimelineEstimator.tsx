
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Calendar } from 'lucide-react';

const ProjectTimelineEstimator = () => {
  const [projectType, setProjectType] = useState('');
  const [complexity, setComplexity] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [timeline, setTimeline] = useState<{ weeks: number; phases: string[] } | null>(null);

  const timelineData = {
    'Web Design & Development': {
      simple: { solo: 4, team: 2, phases: ['Design', 'Development', 'Testing', 'Launch'] },
      medium: { solo: 8, team: 4, phases: ['Research', 'Design', 'Development', 'Testing', 'Launch'] },
      complex: { solo: 16, team: 8, phases: ['Discovery', 'Architecture', 'Design', 'Development', 'Testing', 'Launch'] }
    },
    'AI & Automation Solutions': {
      simple: { solo: 6, team: 3, phases: ['Analysis', 'Setup', 'Integration', 'Testing'] },
      medium: { solo: 12, team: 6, phases: ['Research', 'Development', 'Training', 'Integration', 'Testing'] },
      complex: { solo: 20, team: 10, phases: ['Discovery', 'Architecture', 'Development', 'Training', 'Integration', 'Testing'] }
    },
    'SaaS Development': {
      simple: { solo: 12, team: 6, phases: ['Planning', 'MVP Development', 'Testing', 'Launch'] },
      medium: { solo: 24, team: 12, phases: ['Discovery', 'Architecture', 'Development', 'Testing', 'Beta', 'Launch'] },
      complex: { solo: 40, team: 20, phases: ['Research', 'Architecture', 'Development', 'Testing', 'Beta', 'Launch', 'Scale'] }
    }
  };

  const calculateTimeline = () => {
    if (!projectType || !complexity || !teamSize) return;

    const data = timelineData[projectType as keyof typeof timelineData]?.[complexity as keyof typeof timelineData['Web Design & Development']];
    if (!data) return;

    const weeks = teamSize === 'solo' ? data.solo : data.team;
    setTimeline({ weeks, phases: data.phases });
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Clock className="w-5 h-5" />
          Project Timeline Estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Project Type</label>
          <Select value={projectType} onValueChange={setProjectType}>
            <SelectTrigger>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Web Design & Development">Web Design & Development</SelectItem>
              <SelectItem value="AI & Automation Solutions">AI & Automation Solutions</SelectItem>
              <SelectItem value="SaaS Development">SaaS Development</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Complexity</label>
          <Select value={complexity} onValueChange={setComplexity}>
            <SelectTrigger>
              <SelectValue placeholder="Select complexity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="complex">Complex</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Team Size</label>
          <Select value={teamSize} onValueChange={setTeamSize}>
            <SelectTrigger>
              <SelectValue placeholder="Select team size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solo">Solo Developer</SelectItem>
              <SelectItem value="team">Full Team</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={calculateTimeline} className="w-full bg-gradient-to-r from-primary to-accent">
          Estimate Timeline
        </Button>

        {timeline && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Estimated Timeline</span>
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-3">
              {timeline.weeks} weeks ({Math.ceil(timeline.weeks / 4)} months)
            </div>
            <div>
              <p className="font-medium text-blue-800 mb-2">Project Phases:</p>
              <div className="flex flex-wrap gap-2">
                {timeline.phases.map((phase, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                    {index + 1}. {phase}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectTimelineEstimator;
