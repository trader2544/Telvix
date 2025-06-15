
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Globe, MapPin, TrendingUp, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompetitiveAnalysis = () => {
  const navigate = useNavigate();
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const locations = [
    'Kenya',
    'Nairobi',
    'Mombasa',
    'Kisumu',
    'Nakuru',
    'Eldoret',
    'Thika',
    'Malindi'
  ];

  const handleSearch = async () => {
    if (!niche.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockResults = [
        {
          name: `${niche} Pro Kenya`,
          url: `www.${niche.toLowerCase().replace(/\s+/g, '')}pro.co.ke`,
          description: `Leading ${niche} service provider in ${location || 'Kenya'}`,
          traffic: '15K monthly visits',
          features: ['Online booking', 'Mobile app', 'Customer reviews']
        },
        {
          name: `Best ${niche} ${location || 'Kenya'}`,
          url: `www.best${niche.toLowerCase().replace(/\s+/g, '')}.ke`,
          description: `Top-rated ${niche} platform with nationwide coverage`,
          traffic: '8K monthly visits',
          features: ['E-commerce', 'Payment gateway', 'Live chat']
        },
        {
          name: `${niche} Hub`,
          url: `www.${niche.toLowerCase().replace(/\s+/g, '')}hub.com`,
          description: `Modern ${niche} marketplace connecting customers and providers`,
          traffic: '22K monthly visits',
          features: ['Advanced search', 'User profiles', 'Analytics dashboard']
        }
      ];
      
      setResults(mockResults);
      setIsLoading(false);
    }, 2000);
  };

  const handleGetStarted = () => {
    navigate('/quote');
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Competitive Analysis Tool 🇰🇪
        </CardTitle>
        <p className="text-blue-100 text-sm">
          See what your competitors are doing online and get inspired!
        </p>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6">
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Your Business Niche</label>
              <Input
                placeholder="e.g., Restaurant, Salon, Photography..."
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location (Optional)</label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="border-blue-300 focus:border-blue-500">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleSearch}
            disabled={!niche.trim() || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Analyzing Market...
              </div>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Analyze Competition
              </>
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-orange-800">Market Analysis Results</h3>
              </div>
              <p className="text-sm text-orange-700 mb-3">
                Found {results.length} competitors in your niche! 🎯 Time to stand out with your own website.
              </p>
            </div>

            <div className="grid gap-3">
              {results.map((result, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{result.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Globe className="w-3 h-3" />
                        {result.url}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {result.traffic}
                    </span>
                    <div className="flex gap-1">
                      {result.features.slice(0, 2).map((feature, i) => (
                        <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg p-4 text-center">
              <h3 className="font-bold text-green-800 mb-2">Ready to Compete? 🚀</h3>
              <p className="text-sm text-green-700 mb-3">
                Your competitors are online. Don't let them get ahead! Create a professional website that outshines the competition.
              </p>
              <Button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
              >
                Build My Website Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompetitiveAnalysis;
