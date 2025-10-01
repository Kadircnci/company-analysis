'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp, TrendingDown, Activity, Search, Loader2 } from 'lucide-react';
import { alphaVantageService, type StockQuote, type NewsItem } from '@/lib/alpha-vantage';
import { RateLimiter } from '@/lib/alpha-vantage';

interface RealTimeData {
  quote: StockQuote | null;
  news: NewsItem[];
  loading: boolean;
  error: string | null;
}

export default function RealTimeDataCard() {
  const [symbol, setSymbol] = useState('AAPL');
  const [searchSymbol, setSearchSymbol] = useState('');
  const [data, setData] = useState<RealTimeData>({
    quote: null,
    news: [],
    loading: false,
    error: null
  });

  const fetchRealTimeData = async (symbolToFetch: string) => {
    setData(prev => ({ ...prev, loading: true, error: null }));

    try {
      await RateLimiter.checkRateLimit();
      
      // Get stock quote
      const quote = await alphaVantageService.getStockQuote(symbolToFetch);
      
      await RateLimiter.checkRateLimit();
      
      // Get news sentiment
      const newsData = await alphaVantageService.getNewsSentiment([symbolToFetch], 5);
      
      setData({
        quote,
        news: newsData.feed,
        loading: false,
        error: null
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch data'
      }));
    }
  };

  const handleSearch = async () => {
    if (!searchSymbol.trim()) return;
    setSymbol(searchSymbol.toUpperCase());
    await fetchRealTimeData(searchSymbol.toUpperCase());
  };

  // Auto-load AAPL data on mount
  useEffect(() => {
    fetchRealTimeData('AAPL');
  }, []);

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

  const formatChange = (change: string, changePercent: string) => {
    const numChange = parseFloat(change);
    const isPositive = numChange >= 0;
    
    return (
      <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span>{isPositive ? '+' : ''}{change} ({changePercent}%)</span>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Alpha Vantage - Real-Time Data
        </CardTitle>
        
        {/* Search Bar */}
        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Enter stock symbol (e.g., AAPL, GOOGL, TSLA)"
            value={searchSymbol}
            onChange={(e) => setSearchSymbol(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={data.loading}>
            {data.loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {data.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{data.error}</span>
          </div>
        )}

        {/* Stock Quote */}
        {data.quote && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">{data.quote.symbol} - Real-Time Quote</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Current Price</p>
                <p className="text-xl font-bold">${parseFloat(data.quote.price).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Change</p>
                {formatChange(data.quote.change, data.quote.change_percent)}
              </div>
              <div>
                <p className="text-sm text-gray-600">Volume</p>
                <p className="font-semibold">{parseInt(data.quote.volume).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Trading Day</p>
                <p className="font-semibold">{data.quote.latest_trading_day}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-600">Open</p>
                <p className="font-semibold">${parseFloat(data.quote.open).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">High</p>
                <p className="font-semibold text-green-600">${parseFloat(data.quote.high).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Low</p>
                <p className="font-semibold text-red-600">${parseFloat(data.quote.low).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Previous Close</p>
                <p className="font-semibold">${parseFloat(data.quote.previous_close).toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* News Sentiment */}
        {data.news.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Latest News & Sentiment</h3>
            <div className="space-y-3">
              {data.news.slice(0, 3).map((item, index) => (
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
                      <p className="text-sm text-gray-700 line-clamp-2">{item.summary}</p>
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
                  
                  {/* Ticker-specific sentiment */}
                  {item.ticker_sentiment && item.ticker_sentiment.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex flex-wrap gap-2">
                        {item.ticker_sentiment.slice(0, 3).map((ticker, tickerIndex) => (
                          <div key={tickerIndex} className="text-xs bg-gray-100 rounded px-2 py-1">
                            <span className="font-semibold">{ticker.ticker}</span>
                            <span className="ml-1 text-gray-600">
                              ({ticker.ticker_sentiment_label})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Status */}
        <div className="text-xs text-gray-500 border-t pt-4">
          <p>✅ Alpha Vantage API Status: Active</p>
          <p>🔄 Free Tier: ~25 requests per day (rate limited to 5/minute for optimal performance)</p>
          <p>📊 Data includes: Real-time quotes, news sentiment, market data</p>
        </div>
      </CardContent>
    </Card>
  );
}