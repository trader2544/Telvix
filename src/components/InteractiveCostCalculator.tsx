import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Calculator, DollarSign, CheckCircle } from 'lucide-react';

const InteractiveCostCalculator = ({ userCurrency = 'KSh' }: { userCurrency?: string }) => {
  const [selectedService, setSelectedService] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [complexity, setComplexity] = useState(1);
  const [timeline, setTimeline] = useState(1);
  const [estimate, setEstimate] = useState<any>(null);

  const services = [
    { name: 'Web Design & Development', basePrice: 15000 },
    { name: 'AI & Automation Solutions', basePrice: 25000 },
    { name: 'SaaS Development', basePrice: 45000 },
    { name: 'E-commerce Solutions', basePrice: 30000 },
    { name: 'Mobile App Development', basePrice: 55000 },
    { name: 'Custom Software Development', basePrice: 40000 }
  ];

  const availableFeatures = [
    { name: 'Responsive Design', price: 5000 },
    { name: 'SEO Optimization', price: 8000 },
    { name: 'Payment Integration', price: 10000 },
    { name: 'User Authentication', price: 7000 },
    { name: 'Admin Dashboard', price: 15000 },
    { name: 'API Integration', price: 10000 },
    { name: 'Database Setup', price: 8000 },
    { name: 'SSL Certificate', price: 2000 }
  ];

  const complexityMultipliers = [1, 1.3, 1.6, 2.0, 2.5];
  const timelineMultipliers = [1.2, 1, 0.9, 0.8];

  const calculateEstimate = () => {
    const service = services.find(s => s.name === selectedService);
    if (!service) return;

    let basePrice = service.basePrice;
    
    // Add feature costs
    const featureCosts = features.reduce((total, featureName) => {
      const feature = availableFeatures.find(f => f.name === featureName);
      return total + (feature?.price || 0);
    }, 0);

    // Apply multipliers
    const complexityMultiplier = complexityMultipliers[complexity - 1];
    const timelineMultiplier = timelineMultipliers[timeline - 1];

    const totalCost = (basePrice + featureCosts) * complexityMultiplier * timelineMultiplier;

    setEstimate({
      basePrice,
      featureCosts,
      complexityMultiplier,
      timelineMultiplier,
      totalCost: Math.round(totalCost)
    });
  };

  const toggleFeature = (featureName: string) => {
    setFeatures(prev => 
      prev.includes(featureName) 
        ? prev.filter(f => f !== featureName)
        : [...prev, featureName]
    );
  };

  const resetCalculator = () => {
    setSelectedService('');
    setFeatures([]);
    setComplexity(1);
    setTimeline(1);
    setEstimate(null);
  };

  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`;
  };

  if (estimate) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Cost Estimate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-center mb-4">
              <h3 className="text-3xl font-bold text-green-800">
                {formatPrice(estimate.totalCost)}
              </h3>
              <p className="text-green-600 text-sm">Estimated project cost</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Base Price:</span>
                <span>{formatPrice(estimate.basePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Features:</span>
                <span>{formatPrice(estimate.featureCosts)}</span>
              </div>
              <div className="flex justify-between">
                <span>Complexity Multiplier:</span>
                <span>×{estimate.complexityMultiplier}</span>
              </div>
              <div className="flex justify-between">
                <span>Timeline Multiplier:</span>
                <span>×{estimate.timelineMultiplier}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>{formatPrice(estimate.totalCost)}</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Button 
                onClick={resetCalculator}
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50"
              >
                Calculate New Estimate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Calculator className="w-5 h-5" />
          Interactive Cost Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Service
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {services.map((service) => (
              <Button
                key={service.name}
                variant={selectedService === service.name ? "default" : "outline"}
                className="text-left justify-between h-auto p-3"
                onClick={() => setSelectedService(service.name)}
              >
                <span className="text-sm">{service.name}</span>
                <span className="text-xs text-gray-500">
                  {formatPrice(service.basePrice)}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {selectedService && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Additional Features
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availableFeatures.map((feature) => (
                  <Button
                    key={feature.name}
                    variant={features.includes(feature.name) ? "default" : "outline"}
                    className="text-left justify-between h-auto p-3"
                    onClick={() => toggleFeature(feature.name)}
                  >
                    <span className="text-sm">{feature.name}</span>
                    <span className="text-xs text-gray-500">
                      +{formatPrice(feature.price)}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Project Complexity (×{complexityMultipliers[complexity - 1]})
              </label>
              <Slider
                value={[complexity]}
                onValueChange={(value) => setComplexity(value[0])}
                max={5}
                min={1}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Simple</span>
                <span>Complex</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Timeline Preference (×{timelineMultipliers[timeline - 1]})
              </label>
              <Slider
                value={[timeline]}
                onValueChange={(value) => setTimeline(value[0])}
                max={4}
                min={1}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Rush</span>
                <span>Standard</span>
              </div>
            </div>

            <Button 
              onClick={calculateEstimate}
              className="w-full bg-gradient-to-r from-primary to-accent"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Calculate Estimate
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveCostCalculator;
