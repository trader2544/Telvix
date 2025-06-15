
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calculator, DollarSign } from 'lucide-react';

const InteractiveCostCalculator = ({ userCurrency }: { userCurrency: string }) => {
  const [projectType, setProjectType] = useState('');
  const [complexity, setComplexity] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [estimatedCost, setEstimatedCost] = useState<{ min: number; max: number } | null>(null);

  const basePrices = {
    'Web Design & Development': { simple: 500, medium: 1500, complex: 3500 },
    'AI & Automation Solutions': { simple: 800, medium: 2000, complex: 5000 },
    'SaaS Development': { simple: 2000, medium: 5000, complex: 12000 },
    'E-commerce Solutions': { simple: 800, medium: 2500, complex: 6000 },
    'Mobile App Development': { simple: 1500, medium: 4000, complex: 10000 },
    'Custom Software Development': { simple: 2000, medium: 6000, complex: 15000 }
  };

  const featureMultipliers = {
    'User Authentication': 1.2,
    'Payment Integration': 1.3,
    'Admin Dashboard': 1.4,
    'API Integration': 1.2,
    'Real-time Features': 1.5,
    'Advanced Analytics': 1.3
  };

  const calculateCost = () => {
    if (!projectType || !complexity) return;

    const basePrice = basePrices[projectType as keyof typeof basePrices]?.[complexity as keyof typeof basePrices['Web Design & Development']] || 1000;
    let multiplier = 1;

    features.forEach(feature => {
      multiplier *= featureMultipliers[feature as keyof typeof featureMultipliers] || 1;
    });

    const rushMultiplier = timeline === 'rush' ? 1.5 : timeline === 'standard' ? 1 : 0.9;
    
    const finalPrice = basePrice * multiplier * rushMultiplier;
    setEstimatedCost({
      min: Math.round(finalPrice * 0.8),
      max: Math.round(finalPrice * 1.2)
    });
  };

  const handleFeatureToggle = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Calculator className="w-5 h-5" />
          Interactive Cost Calculator
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
              <SelectItem value="E-commerce Solutions">E-commerce Solutions</SelectItem>
              <SelectItem value="Mobile App Development">Mobile App Development</SelectItem>
              <SelectItem value="Custom Software Development">Custom Software Development</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Complexity Level</label>
          <Select value={complexity} onValueChange={setComplexity}>
            <SelectTrigger>
              <SelectValue placeholder="Select complexity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple (Basic features)</SelectItem>
              <SelectItem value="medium">Medium (Standard features)</SelectItem>
              <SelectItem value="complex">Complex (Advanced features)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Additional Features</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(featureMultipliers).map(feature => (
              <Button
                key={feature}
                variant={features.includes(feature) ? "default" : "outline"}
                size="sm"
                onClick={() => handleFeatureToggle(feature)}
                className="text-xs"
              >
                {feature}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Timeline</label>
          <Select value={timeline} onValueChange={setTimeline}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flexible">Flexible (3+ months) - 10% discount</SelectItem>
              <SelectItem value="standard">Standard (1-3 months)</SelectItem>
              <SelectItem value="rush">Rush (Under 1 month) - 50% premium</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={calculateCost} className="w-full bg-gradient-to-r from-primary to-accent">
          Calculate Estimate
        </Button>

        {estimatedCost && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Estimated Cost Range</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {userCurrency} {estimatedCost.min.toLocaleString()} - {userCurrency} {estimatedCost.max.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 mt-2">
              *This is an estimate. Final pricing may vary based on specific requirements.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveCostCalculator;
