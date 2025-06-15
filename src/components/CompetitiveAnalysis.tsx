
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, TrendingUp, ArrowRight, Globe, Target, Lightbulb, BarChart3, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const [customSearch, setCustomSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('competitors');

  const API_KEY = 'AIzaSyDkV_n8U04bIBvC7febed0Uzljosz1h-38';
  const SEARCH_ENGINE_ID = '7423a42fe367a43c8';

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

  const searchCategories = [
    { id: 'competitors', label: 'Find Competitors', icon: Target, description: 'Discover direct competitors in your niche' },
    { id: 'trends', label: 'Market Trends', icon: TrendingUp, description: 'Research current market trends and opportunities' },
    { id: 'ideas', label: 'Business Ideas', icon: Lightbulb, description: 'Get inspiration for your business' },
    { id: 'analysis', label: 'Market Analysis', icon: BarChart3, description: 'Analyze market conditions and demand' }
  ];

  const generateSearchQuery = (category: string) => {
    let baseQuery = '';
    
    switch (category) {
      case 'competitors':
        baseQuery = niche ? `${niche} business` : 'business';
        break;
      case 'trends':
        baseQuery = niche ? `${niche} trends 2024` : 'business trends 2024';
        break;
      case 'ideas':
        baseQuery = niche ? `${niche} business ideas` : 'business ideas';
        break;
      case 'analysis':
        baseQuery = niche ? `${niche} market analysis` : 'market analysis';
        break;
      default:
        baseQuery = customSearch || (niche ? `${niche} business` : 'business');
    }

    if (location && category !== 'custom') {
      baseQuery += ` ${location}`;
    }

    return baseQuery;
  };

  const performSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      
      if (data.items) {
        const results: SearchResult[] = data.items.map((item: any) => ({
          title: item.title,
          link: item.link,
          snippet: item.snippet,
          displayLink: item.displayLink
        }));
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (category: string = activeCategory) => {
    const searchQuery = category === 'custom' ? customSearch : generateSearchQuery(category);
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    handleSearch(category);
  };

  const handleGetStarted = () => {
    navigate('/quote');
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Internet Research & Competitive Intelligence Tool 🇰🇪
        </CardTitle>
        <p className="text-blue-100 text-sm">
          Comprehensive business research powered by Google Search - Find competitors, trends, and opportunities!
        </p>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6">
        {/* Search Configuration */}
        <Card className="bg-white/50 backdrop-blur-sm border border-white/20 mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

            {/* Search Categories */}
            <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="mb-4">
              <TabsList className="grid w-full grid-cols-4 bg-white/80">
                {searchCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex flex-col items-center gap-1 p-2 text-xs"
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {searchCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-2">
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">{category.description}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Search: "{generateSearchQuery(category.id)}"
                    </p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Custom Search Option */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium text-gray-700">Custom Search</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter custom search terms..."
                  value={customSearch}
                  onChange={(e) => setCustomSearch(e.target.value)}
                  className="border-blue-300 focus:border-blue-500"
                />
                <Button 
                  onClick={() => handleCategoryChange('custom')}
                  disabled={!customSearch.trim()}
                  variant="outline"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  Search
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={() => handleSearch()}
              disabled={!niche.trim() && !customSearch.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? 'Searching...' : 'Start Research'}
            </Button>
          </CardContent>
        </Card>

        {/* Search Results */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-800">Live Research Results</h3>
              </div>
              <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                Powered by Google
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Real-time internet research results for your business intelligence
            </p>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[400px] overflow-y-auto space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Searching...</p>
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <Card key={index} className="border border-gray-100 hover:border-blue-200 transition-colors">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-blue-600 hover:underline">
                            <a 
                              href={result.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              {result.title}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </h4>
                        </div>
                        <p className="text-xs text-green-600">{result.displayLink}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{result.snippet}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Enter your search terms and click "Start Research" to begin</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Section */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg p-4 text-center mt-6">
          <h3 className="font-bold text-green-800 mb-2">Ready to Build Your Competitive Edge? 🚀</h3>
          <p className="text-sm text-green-700 mb-3">
            Armed with research insights? Let's create a professional website that stands out from the competition.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
            >
              Build My Website Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/portfolio')}
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              View Our Work
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitiveAnalysis;
