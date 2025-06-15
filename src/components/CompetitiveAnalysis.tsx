
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Globe, MapPin, TrendingUp, ArrowRight, ExternalLink, Settings, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
}

const CompetitiveAnalysis = () => {
  const navigate = useNavigate();
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [searchEngineId, setSearchEngineId] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

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
    // Load saved API credentials from localStorage
    const savedApiKey = localStorage.getItem('google_search_api_key');
    const savedSearchEngineId = localStorage.getItem('google_search_engine_id');
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedSearchEngineId) setSearchEngineId(savedSearchEngineId);
  }, []);

  const saveApiCredentials = () => {
    localStorage.setItem('google_search_api_key', apiKey);
    localStorage.setItem('google_search_engine_id', searchEngineId);
    setIsConfigOpen(false);
  };

  const searchCompetitors = async () => {
    if (!apiKey || !searchEngineId) {
      alert('Please configure your Google Custom Search API credentials first.');
      setIsConfigOpen(true);
      return;
    }

    if (!niche.trim()) return;

    setIsLoading(true);
    
    try {
      const searchQuery = location 
        ? `${niche} business ${location} website`
        : `${niche} business website`;
      
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(searchQuery)}&num=6`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        setResults(data.items.slice(0, 5)); // Limit to 5 results
      } else {
        setResults([]);
        alert('No results found. Try a different niche or location.');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching for competitors. Please check your API credentials and try again.');
      setResults([]);
    }
    
    setIsLoading(false);
  };

  const handleGetStarted = () => {
    navigate('/quote');
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Real Competitive Analysis Tool 🇰🇪
            </CardTitle>
            <p className="text-blue-100 text-sm">
              Discover real competitors in your niche using Google Search!
            </p>
          </div>
          <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <Settings className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configure Google Custom Search API</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Google Custom Search API Key</label>
                  <div className="relative">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      placeholder="Enter your API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Search Engine ID</label>
                  <Input
                    placeholder="Enter your Custom Search Engine ID"
                    value={searchEngineId}
                    onChange={(e) => setSearchEngineId(e.target.value)}
                  />
                </div>
                <div className="text-xs text-gray-600">
                  <p>Get these credentials from Google Cloud Console:</p>
                  <p>1. Enable Custom Search API</p>
                  <p>2. Create a Custom Search Engine at cse.google.com</p>
                </div>
                <Button onClick={saveApiCredentials} className="w-full">
                  Save Credentials
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
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
            onClick={searchCompetitors}
            disabled={!niche.trim() || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Searching Real Competitors...
              </div>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Find Real Competitors
              </>
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-orange-800">Real Market Analysis Results</h3>
              </div>
              <p className="text-sm text-orange-700 mb-3">
                Found {results.length} real competitors in your niche! 🎯 Time to stand out with your own professional website.
              </p>
            </div>

            <div className="grid gap-3">
              {results.map((result, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm">{result.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <Globe className="w-3 h-3" />
                        <a 
                          href={result.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 truncate"
                        >
                          {result.displayLink}
                        </a>
                      </div>
                    </div>
                    <a 
                      href={result.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  
                  <p className="text-xs text-gray-600 line-clamp-2">{result.snippet}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg p-4 text-center">
              <h3 className="font-bold text-green-800 mb-2">Ready to Compete? 🚀</h3>
              <p className="text-sm text-green-700 mb-3">
                These are your real competitors! Don't let them get ahead - create a professional website that outshines the competition.
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

        {!apiKey || !searchEngineId ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-sm text-yellow-800 mb-2">
              📋 API Configuration Required
            </p>
            <p className="text-xs text-yellow-700 mb-3">
              Configure your Google Custom Search API credentials to search for real competitors.
            </p>
            <Button 
              onClick={() => setIsConfigOpen(true)}
              variant="outline"
              size="sm"
              className="border-yellow-300 text-yellow-800 hover:bg-yellow-100"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configure API
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default CompetitiveAnalysis;
