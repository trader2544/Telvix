
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Calculator, DollarSign, CheckCircle, Banknote } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const InteractiveCostCalculator = ({ userCurrency = 'KSh' }: { userCurrency?: string }) => {
  const [selectedService, setSelectedService] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [complexity, setComplexity] = useState(1);
  const [timeline, setTimeline] = useState(1);
  const [estimate, setEstimate] = useState<any>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const services = [
    { name: 'Web Design & Development', basePrice: 15000, icon: '🌐' },
    { name: 'AI & Automation Solutions', basePrice: 25000, icon: '🤖' },
    { name: 'SaaS Development', basePrice: 45000, icon: '☁️' },
    { name: 'E-commerce Solutions', basePrice: 30000, icon: '🛒' },
    { name: 'Mobile App Development', basePrice: 55000, icon: '📱' },
    { name: 'Custom Software Development', basePrice: 40000, icon: '⚙️' }
  ];

  const availableFeatures = [
    { name: 'Responsive Design', price: 5000, icon: '📱' },
    { name: 'SEO Optimization', price: 8000, icon: '🔍' },
    { name: 'Payment Integration', price: 10000, icon: '💳' },
    { name: 'User Authentication', price: 7000, icon: '🔐' },
    { name: 'Admin Dashboard', price: 15000, icon: '📊' },
    { name: 'API Integration', price: 10000, icon: '🔗' },
    { name: 'Database Setup', price: 8000, icon: '🗄️' },
    { name: 'SSL Certificate', price: 2000, icon: '🔒' }
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

  if (!user) {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Kenyan Project Cost Calculator
          </CardTitle>
          <p className="text-blue-100 text-sm">Get instant estimates in Kenyan Shillings (KSh)</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow-inner">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Login Required 🔐
            </h3>
            <p className="text-gray-600 mb-6">
              Please sign in to access our interactive cost calculator and get personalized estimates for your project.
            </p>
            <Button 
              onClick={() => navigate('/auth')} 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-6"
            >
              Sign In to Calculate Costs 💰
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (estimate) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Your Project Estimate
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Banknote className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl md:text-4xl font-bold text-green-800">
                {formatPrice(estimate.totalCost)}
              </h3>
            </div>
            <p className="text-green-600 font-medium">Total Project Cost in Kenyan Shillings</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-inner space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">Base Service:</span>
              <span className="font-semibold text-green-700">{formatPrice(estimate.basePrice)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">Additional Features:</span>
              <span className="font-semibold text-green-700">{formatPrice(estimate.featureCosts)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">Complexity Adjustment:</span>
              <span className="font-semibold text-blue-600">×{estimate.complexityMultiplier}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">Timeline Adjustment:</span>
              <span className="font-semibold text-blue-600">×{estimate.timelineMultiplier}</span>
            </div>
            <div className="flex justify-between items-center py-3 bg-green-50 rounded-lg px-3">
              <span className="font-bold text-green-800">Final Total:</span>
              <span className="text-xl font-bold text-green-800">{formatPrice(estimate.totalCost)}</span>
            </div>
          </div>

          <Button 
            onClick={resetCalculator}
            className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            Calculate Another Project
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Kenyan Project Cost Calculator
        </CardTitle>
        <p className="text-blue-100 text-sm">Get instant estimates in Kenyan Shillings (KSh)</p>
      </CardHeader>
      <CardContent className="p-4 md:p-6 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">
            🎯 Choose Your Service
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((service) => (
              <Button
                key={service.name}
                variant={selectedService === service.name ? "default" : "outline"}
                className={`h-auto p-3 text-left justify-between ${
                  selectedService === service.name 
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white" 
                    : "hover:bg-blue-50 border-blue-200"
                }`}
                onClick={() => setSelectedService(service.name)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{service.icon}</span>
                  <span className="text-xs md:text-sm font-medium">{service.name}</span>
                </div>
                <span className="text-xs font-bold text-green-600">
                  {formatPrice(service.basePrice)}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {selectedService && (
          <>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3">
                ✨ Additional Features
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availableFeatures.map((feature) => (
                  <Button
                    key={feature.name}
                    variant={features.includes(feature.name) ? "default" : "outline"}
                    className={`h-auto p-3 text-left justify-between ${
                      features.includes(feature.name) 
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white" 
                        : "hover:bg-green-50 border-green-200"
                    }`}
                    onClick={() => toggleFeature(feature.name)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{feature.icon}</span>
                      <span className="text-xs font-medium">{feature.name}</span>
                    </div>
                    <span className="text-xs font-bold">
                      +{formatPrice(feature.price)}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-inner">
              <label className="block text-sm font-bold text-gray-800 mb-3">
                🎚️ Project Complexity (×{complexityMultipliers[complexity - 1]})
              </label>
              <Slider
                value={[complexity]}
                onValueChange={(value) => setComplexity(value[0])}
                max={5}
                min={1}
                step={1}
                className="mb-3"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>Simple</span>
                <span>Standard</span>
                <span>Advanced</span>
                <span>Complex</span>
                <span>Enterprise</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-inner">
              <label className="block text-sm font-bold text-gray-800 mb-3">
                ⏱️ Timeline Preference (×{timelineMultipliers[timeline - 1]})
              </label>
              <Slider
                value={[timeline]}
                onValueChange={(value) => setTimeline(value[0])}
                max={4}
                min={1}
                step={1}
                className="mb-3"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>Rush</span>
                <span>Fast</span>
                <span>Standard</span>
                <span>Flexible</span>
              </div>
            </div>

            <Button 
              onClick={calculateEstimate}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Calculate My Project Cost
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveCostCalculator;
