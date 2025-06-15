
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

const CompetitiveAnalysis = () => {
  const navigate = useNavigate();
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');

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

  useEffect(() => {
    // Load Google Custom Search script
    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=7423a42fe367a43c8';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src*="cse.google.com"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const updateSearch = () => {
    const searchQuery = location 
      ? `${niche} business ${location} website`
      : `${niche} business website`;
    
    // Update the Google search input if it exists
    const searchInput = document.querySelector('.gsc-input input') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = searchQuery;
      // Trigger search
      const searchButton = document.querySelector('.gsc-search-button') as HTMLButtonElement;
      if (searchButton) {
        searchButton.click();
      }
    }
  };

  const handleGetStarted = () => {
    navigate('/quote');
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Real Competitive Analysis Tool 🇰🇪
        </CardTitle>
        <p className="text-blue-100 text-sm">
          Discover real competitors in your niche using Google Search!
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
            onClick={updateSearch}
            disabled={!niche.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Real Competitors
          </Button>
        </div>

        {/* Google Custom Search Results in Scrollable Card */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-800">Live Search Results</h3>
            </div>
            <p className="text-sm text-gray-600">
              Real-time competitor search powered by Google
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-4">
              <div className="gcse-search"></div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg p-4 text-center mt-6">
          <h3 className="font-bold text-green-800 mb-2">Ready to Compete? 🚀</h3>
          <p className="text-sm text-green-700 mb-3">
            Found your competitors? Don't let them get ahead - create a professional website that outshines the competition.
          </p>
          <Button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
          >
            Build My Website Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitiveAnalysis;
