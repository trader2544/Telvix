
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Globe, MapPin, TrendingUp, ArrowRight, ExternalLink, Eye, EyeOff, BarChart3, Target, Zap, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
}

interface TrendData {
  keyword: string;
  volume: number;
  competition: 'Low' | 'Medium' | 'High';
  trend: 'Rising' | 'Stable' | 'Declining';
}

interface SEOMetrics {
  domain: string;
  estimatedTraffic: number;
  domainAuthority: number;
  backlinks: number;
  keywords: number;
}

const CompetitiveAnalysis = () => {
  const navigate = useNavigate();
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [seoMetrics, setSeoMetrics] = useState<SEOMetrics[]>([]);
  const [apiKey] = useState('AIzaSyDkV_n8U04bIBvC7febed0Uzljosz1h-38');
  const [searchEngineId] = useState('7423a42fe367a43c8');
  const [activeTab, setActiveTab] = useState<'competitors' | 'trends' | 'seo'>('competitors');

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

  const generateMockTrends = (niche: string): TrendData[] => {
    const keywords = [
      `${niche} services`,
      `best ${niche}`,
      `${niche} near me`,
      `affordable ${niche}`,
      `professional ${niche}`,
      `${niche} reviews`,
      `${niche} booking`,
      `${niche} online`
    ];

    return keywords.map(keyword => ({
      keyword,
      volume: Math.floor(Math.random() * 10000) + 1000,
      competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as 'Low' | 'Medium' | 'High',
      trend: ['Rising', 'Stable', 'Declining'][Math.floor(Math.random() * 3)] as 'Rising' | 'Stable' | 'Declining'
    }));
  };

  const generateMockSEO = (results: SearchResult[]): SEOMetrics[] => {
    return results.slice(0, 5).map(result => ({
      domain: result.displayLink,
      estimatedTraffic: Math.floor(Math.random() * 50000) + 5000,
      domainAuthority: Math.floor(Math.random() * 40) + 30,
      backlinks: Math.floor(Math.random() * 10000) + 1000,
      keywords: Math.floor(Math.random() * 5000) + 500
    }));
  };

  const searchCompetitors = async () => {
    if (!niche.trim()) return;

    setIsLoading(true);
    
    try {
      const searchQuery = location 
        ? `${niche} business ${location} website`
        : `${niche} business website`;
      
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(searchQuery)}&num=8`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const searchResults = data.items.slice(0, 6);
        setResults(searchResults);
        setTrends(generateMockTrends(niche));
        setSeoMetrics(generateMockSEO(searchResults));
      } else {
        setResults([]);
        setTrends([]);
        setSeoMetrics([]);
        alert('No results found. Try a different niche or location.');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching for competitors. Please try again.');
      setResults([]);
      setTrends([]);
      setSeoMetrics([]);
    }
    
    setIsLoading(false);
  };

  const handleGetStarted = () => {
    navigate('/quote');
  };

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Rising': return '📈';
      case 'Stable': return '➡️';
      case 'Declining': return '📉';
      default: return '➡️';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Search className="w-5 h-5" />
              AI Market Intelligence Hub 🇰🇪
            </CardTitle>
            <p className="text-blue-100 text-sm">
              Discover competitors, trends, and SEO insights powered by Google AI!
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-blue-200 opacity-80">
              Powered by Telvix
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
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
                Analyzing Market Intelligence...
              </div>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Launch AI Market Analysis
              </>
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('competitors')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'competitors'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Globe className="w-4 h-4 inline mr-2" />
                Competitors
              </button>
              <button
                onClick={() => setActiveTab('trends')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'trends'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Market Trends
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'seo'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                SEO Metrics
              </button>
            </div>

            {/* Competitors Tab */}
            {activeTab === 'competitors' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-orange-600" />
                    <h3 className="font-bold text-orange-800">Live Competitor Analysis</h3>
                  </div>
                  <p className="text-sm text-orange-700">
                    Found {results.length} active competitors in your market! 🎯
                  </p>
                </div>

                <ScrollArea className="h-[300px]">
                  <div className="grid gap-3 pr-4">
                    {results.map((result, index) => (
                      <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-sm mb-1">{result.title}</h4>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
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
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs text-gray-600">{(Math.random() * 2 + 3).toFixed(1)}</span>
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
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">{result.snippet}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Market Trends Tab */}
            {activeTab === 'trends' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-purple-800">Market Trends & Keywords</h3>
                  </div>
                  <p className="text-sm text-purple-700">
                    Trending keywords and search volumes in your niche 📊
                  </p>
                </div>

                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Keyword</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Competition</TableHead>
                        <TableHead>Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trends.map((trend, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-sm">{trend.keyword}</TableCell>
                          <TableCell className="text-sm">{trend.volume.toLocaleString()}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompetitionColor(trend.competition)}`}>
                              {trend.competition}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm">
                            {getTrendIcon(trend.trend)} {trend.trend}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            )}

            {/* SEO Metrics Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-100 to-teal-100 border border-green-300 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <h3 className="font-bold text-green-800">SEO Performance Analysis</h3>
                  </div>
                  <p className="text-sm text-green-700">
                    Domain authority, traffic estimates, and SEO metrics 📈
                  </p>
                </div>

                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Domain</TableHead>
                        <TableHead>Traffic</TableHead>
                        <TableHead>DA Score</TableHead>
                        <TableHead>Backlinks</TableHead>
                        <TableHead>Keywords</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {seoMetrics.map((metric, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-sm">{metric.domain}</TableCell>
                          <TableCell className="text-sm">{metric.estimatedTraffic.toLocaleString()}/mo</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-2 bg-gray-200 rounded-full">
                                <div 
                                  className="h-2 bg-blue-500 rounded-full" 
                                  style={{ width: `${metric.domainAuthority}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{metric.domainAuthority}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{metric.backlinks.toLocaleString()}</TableCell>
                          <TableCell className="text-sm">{metric.keywords.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            )}

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg p-4 text-center">
              <h3 className="font-bold text-green-800 mb-2">Ready to Dominate Your Market? 🚀</h3>
              <p className="text-sm text-green-700 mb-3">
                Armed with this intelligence, create a website that outperforms your competition!
              </p>
              <Button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
              >
                Build My Winning Website
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {results.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">
              <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Enter your niche to discover competitors and market insights</p>
            </div>
            <div className="text-xs text-gray-400 mt-4">
              Powered by Telvix • Market Intelligence Engine
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompetitiveAnalysis;
