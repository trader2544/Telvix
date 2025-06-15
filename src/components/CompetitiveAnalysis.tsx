import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Globe, TrendingUp, ArrowRight, Target, Lightbulb, BarChart3, ExternalLink, Code2, Palette, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
}

const CompetitiveAnalysis = () => {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');
  const [customSearch, setCustomSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('competitors');

  const API_KEY = 'AIzaSyDkV_n8U04bIBvC7febed0Uzljosz1h-38';
  const SEARCH_ENGINE_ID = '7423a42fe367a43c8';

  const serviceTypes = [
    'Web Design & Development',
    'Mobile App Development',
    'E-commerce Solutions',
    'SaaS Development',
    'AI & Automation',
    'Digital Marketing & SEO',
    'UI/UX Design',
    'Custom Software Development'
  ];

  const locations = [
    'Kenya', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi'
  ];

  const searchCategories = [
    { 
      id: 'competitors', 
      label: 'Find Competitors', 
      icon: Target, 
      description: 'Discover web agencies and developers in your area',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'trends', 
      label: 'Tech Trends', 
      icon: TrendingUp, 
      description: 'Latest web development and design trends',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'inspiration', 
      label: 'Design Ideas', 
      icon: Lightbulb, 
      description: 'Get inspired by amazing websites and apps',
      color: 'from-orange-500 to-red-500'
    },
    { 
      id: 'market', 
      label: 'Market Research', 
      icon: BarChart3, 
      description: 'Analyze demand for digital services',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const generateSearchQuery = (category: string) => {
    let baseQuery = '';
    
    switch (category) {
      case 'competitors':
        baseQuery = serviceType 
          ? `${serviceType} agency company services` 
          : 'web design development agency services';
        break;
      case 'trends':
        baseQuery = serviceType 
          ? `${serviceType} trends 2024 latest` 
          : 'web development design trends 2024';
        break;
      case 'inspiration':
        baseQuery = serviceType 
          ? `best ${serviceType} examples portfolio showcase` 
          : 'best website design examples portfolio';
        break;
      case 'market':
        baseQuery = serviceType 
          ? `${serviceType} market demand pricing` 
          : 'web development market demand pricing';
        break;
      default:
        baseQuery = customSearch || 'web design development services';
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

  const currentCategory = searchCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden py-6">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl max-w-6xl mx-4">
        <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-lg pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">
                Digital Intelligence Hub 🇰🇪
              </CardTitle>
              <p className="text-blue-100 text-xs">
                Research competitors, trends, and opportunities in web development & digital services
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          {/* Search Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <Code2 className="w-3 h-3" />
                Service Type
              </label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger className="border-gray-300 focus:border-purple-500 h-8">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <Target className="w-3 h-3" />
                Location
              </label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="border-gray-300 focus:border-purple-500 h-8">
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
            <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-blue-50 to-purple-50 p-1">
              {searchCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <div className={`w-6 h-6 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                    <category.icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200/50">
              <div className="flex items-center gap-2 mb-1">
                {currentCategory && <currentCategory.icon className="w-3 h-3 text-blue-600" />}
                <span className="text-xs font-medium text-blue-800">
                  {currentCategory?.description}
                </span>
              </div>
              <p className="text-xs text-blue-600">
                Searching: "{generateSearchQuery(activeCategory)}"
              </p>
            </div>
          </Tabs>

          {/* Custom Search */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-2 mb-1">
              <Search className="w-3 h-3" />
              Custom Search
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter specific search terms..."
                value={customSearch}
                onChange={(e) => setCustomSearch(e.target.value)}
                className="border-gray-300 focus:border-purple-500 h-8 text-sm"
              />
              <Button 
                onClick={() => handleCategoryChange('custom')}
                disabled={!customSearch.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-8 px-3"
                size="sm"
              >
                Search
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={() => handleSearch()}
            disabled={!serviceType.trim() && !customSearch.trim()}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-2 mb-4 h-10"
          >
            <Search className="w-4 h-4 mr-2" />
            {isLoading ? 'Researching...' : 'Start Digital Intelligence Search'}
          </Button>

          {/* Search Results */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-3 h-3 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm">Live Intelligence Results</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                  <Globe className="w-3 h-3" />
                  Powered by Telvix AI
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="h-[200px] overflow-y-auto space-y-2">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-3"></div>
                      <p className="text-gray-600 font-medium text-sm">Analyzing digital landscape...</p>
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <Card key={index} className="border border-gray-100 hover:border-purple-200 transition-all duration-200 hover:shadow-md">
                      <CardContent className="p-3">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-purple-700 hover:text-purple-800 leading-tight text-sm">
                            <a 
                              href={result.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-start gap-2 hover:underline"
                            >
                              {result.title}
                              <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            </a>
                          </h4>
                          <p className="text-xs text-green-600 font-medium">{result.displayLink}</p>
                          <p className="text-xs text-gray-600 leading-relaxed">{result.snippet}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="font-medium text-sm">Ready to explore the digital landscape?</p>
                      <p className="text-xs mt-1">Select a service type and start your research</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center mt-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Palette className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-green-800">Ready to Build Something Amazing? 🚀</h3>
            </div>
            <p className="text-green-700 mb-3 max-w-2xl mx-auto text-sm">
              Now that you've researched the competition, let's create a digital solution that stands out. 
              From websites to mobile apps, we've got you covered!
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button 
                onClick={() => navigate('/quote')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-4 py-2 h-9"
                size="sm"
              >
                Start Your Project
                <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/portfolio')}
                className="border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 h-9"
                size="sm"
              >
                <Smartphone className="w-3 h-3 mr-2" />
                View Our Work
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitiveAnalysis;
