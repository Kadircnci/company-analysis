'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Search, 
  Loader2,
  Building2,
  AlertTriangle,
  Target,
  Activity
} from 'lucide-react';
import { 
  alphaVantageService, 
  type StockQuote, 
  type CompanyOverview,
  type NewsItem,
  RateLimiter,
  FinancialAnalyzer
} from '@/lib/alpha-vantage';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EnhancedCompanyData {
  symbol: string;
  quote: StockQuote | null;
  overview: CompanyOverview | null;
  news: NewsItem[];
  technicalData: any;
  eventStudyData: any[];
  loading: boolean;
  error: string | null;
}

export default function EnhancedCompanyAnalysis() {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [companyData, setCompanyData] = useState<EnhancedCompanyData>({
    symbol: 'AAPL',
    quote: null,
    overview: null,
    news: [],
    technicalData: null,
    eventStudyData: [],
    loading: false,
    error: null
  });

  const popularSymbols = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'META', name: 'Meta Platforms Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'NFLX', name: 'Netflix Inc.' }
  ];

  // Search for symbols
  const searchSymbols = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      await RateLimiter.checkRateLimit();
      const results = await alphaVantageService.searchSymbol(query);
      setSearchResults(results.slice(0, 10));
    } catch (error) {
      console.error('Symbol search error:', error);
    }
  };

  // Fetch comprehensive company data
  const fetchCompanyData = async (symbol: string) => {
    setCompanyData(prev => ({ ...prev, loading: true, error: null, symbol }));

    try {
      // Parallel fetch for efficiency (with rate limiting)
      let quote, overview, newsData, timeSeriesData;

      // Stock quote
      await RateLimiter.checkRateLimit();
      quote = await alphaVantageService.getStockQuote(symbol);

      // Company overview  
      await RateLimiter.checkRateLimit();
      overview = await alphaVantageService.getCompanyOverview(symbol);

      // News sentiment
      await RateLimiter.checkRateLimit();
      newsData = await alphaVantageService.getNewsSentiment([symbol], 10);

      // Time series for event study
      await RateLimiter.checkRateLimit();
      timeSeriesData = await alphaVantageService.getDailyTimeSeries(symbol, 'compact');

      // Process time series data for event study chart
      const timeSeries = timeSeriesData.timeSeries;
      const eventStudyData = Object.entries(timeSeries)
        .slice(0, 30)
        .map(([date, data]: [string, any]) => ({
          date,
          price: parseFloat(data['4. close']),
          volume: parseInt(data['5. volume']),
          return: 0 // Will be calculated
        }))
        .reverse();

      // Calculate daily returns
      for (let i = 1; i < eventStudyData.length; i++) {
        const prevPrice = eventStudyData[i - 1].price;
        const currentPrice = eventStudyData[i].price;
        eventStudyData[i].return = ((currentPrice - prevPrice) / prevPrice) * 100;
      }

      setCompanyData({
        symbol,
        quote,
        overview,
        news: newsData.feed,
        technicalData: timeSeriesData,
        eventStudyData,
        loading: false,
        error: null
      });

    } catch (error) {
      setCompanyData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch company data'
      }));
    }
  };

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
    setSearchQuery('');
    setSearchResults([]);
    fetchCompanyData(symbol);
  };

  // Load AAPL data on component mount
  useEffect(() => {
    fetchCompanyData('AAPL');
  }, []);

  const formatMarketCap = (marketCap: string) => {
    const value = parseInt(marketCap);
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  const getSentimentColor = (label: string) => {
    switch (label) {
      case 'Bullish': return 'bg-green-100 text-green-800';
      case 'Somewhat-Bullish': return 'bg-green-50 text-green-700';
      case 'Neutral': return 'bg-gray-100 text-gray-800';
      case 'Somewhat-Bearish': return 'bg-red-50 text-red-700';
      case 'Bearish': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Enhanced Company Analysis</h1>
            <p className="text-muted-foreground">Real-time financial data powered by Alpha Vantage</p>
          </div>
        </div>

        {/* Symbol Search & Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Company Selection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Input
                placeholder="Search for companies (e.g., Apple, Microsoft, Tesla)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  searchSymbols(e.target.value);
                }}
                className="w-full"
              />
              
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-10 bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => handleSymbolSelect(result.symbol)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{result.symbol}</div>
                          <div className="text-sm text-gray-600 line-clamp-1">{result.name}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {result.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Symbols */}
            <div>
              <p className="text-sm font-medium mb-2">Popular Stocks:</p>
              <div className="flex flex-wrap gap-2">
                {popularSymbols.map((stock) => (
                  <Button
                    key={stock.symbol}
                    variant={selectedSymbol === stock.symbol ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleSymbolSelect(stock.symbol)}
                  >
                    {stock.symbol}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {companyData.loading && (
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p>Loading company data for {companyData.symbol}...</p>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {companyData.error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Error loading data</span>
              </div>
              <p className="text-red-600 mt-2">{companyData.error}</p>
            </CardContent>
          </Card>
        )}

        {/* Company Data Tabs */}
        {!companyData.loading && !companyData.error && companyData.quote && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
              <TabsTrigger value="chart">Price Chart</TabsTrigger>
              <TabsTrigger value="news">News & Sentiment</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Real-time Quote */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    {companyData.symbol} - Real-time Quote
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Current Price</p>
                      <p className="text-3xl font-bold">${parseFloat(companyData.quote.price).toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Change</p>
                      <div className={`flex items-center justify-center gap-1 text-xl font-semibold ${
                        parseFloat(companyData.quote.change) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {parseFloat(companyData.quote.change) >= 0 ? 
                          <TrendingUp className="w-5 h-5" /> : 
                          <TrendingDown className="w-5 h-5" />
                        }
                        <span>{companyData.quote.change} ({companyData.quote.change_percent}%)</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Volume</p>
                      <p className="text-xl font-semibold">{parseInt(companyData.quote.volume).toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Trading Day</p>
                      <p className="text-xl font-semibold">{companyData.quote.latest_trading_day}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fundamentals Tab */}
            <TabsContent value="fundamentals">
              {companyData.overview && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Company Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Company Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{companyData.overview.Name}</h3>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-4">
                          {companyData.overview.Description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <p className="text-sm text-gray-600">Sector</p>
                          <p className="font-semibold">{companyData.overview.Sector}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Industry</p>
                          <p className="font-semibold">{companyData.overview.Industry}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Exchange</p>
                          <p className="font-semibold">{companyData.overview.Exchange}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Country</p>
                          <p className="font-semibold">{companyData.overview.Country}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Financial Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Key Financial Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Market Cap</p>
                          <p className="font-semibold">{formatMarketCap(companyData.overview.MarketCapitalization)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">P/E Ratio</p>
                          <p className="font-semibold">{parseFloat(companyData.overview.PERatio).toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">EPS</p>
                          <p className="font-semibold">${companyData.overview.EPS}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Book Value</p>
                          <p className="font-semibold">${companyData.overview.BookValue}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Dividend Yield</p>
                          <p className="font-semibold">{(parseFloat(companyData.overview.DividendYield) * 100).toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Beta</p>
                          <p className="font-semibold">{parseFloat(companyData.overview.Beta).toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">52W High</p>
                          <p className="font-semibold text-green-600">${parseFloat(companyData.overview["52WeekHigh"]).toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">52W Low</p>
                          <p className="font-semibold text-red-600">${parseFloat(companyData.overview["52WeekLow"]).toFixed(2)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            {/* Price Chart Tab */}
            <TabsContent value="chart">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Price Movement (30 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={companyData.eventStudyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          labelFormatter={(date) => new Date(date).toLocaleDateString()}
                          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#2563eb" 
                          strokeWidth={2} 
                          dot={{ fill: '#2563eb', strokeWidth: 1, r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* News & Sentiment Tab */}
            <TabsContent value="news">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Latest News & Sentiment Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {companyData.news.length > 0 ? (
                    <div className="space-y-4">
                      {companyData.news.slice(0, 8).map((item, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm leading-tight mb-2">
                                <a 
                                  href={item.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="hover:text-blue-600 hover:underline"
                                >
                                  {item.title}
                                </a>
                              </h4>
                              <p className="text-xs text-gray-600 mb-2">
                                {item.source} • {new Date(item.time_published).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-700 line-clamp-3">{item.summary}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge className={getSentimentColor(item.overall_sentiment_label)}>
                                {item.overall_sentiment_label}
                              </Badge>
                              <div className="text-xs text-gray-500">
                                Score: {item.overall_sentiment_score.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">No recent news found for {companyData.symbol}</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}