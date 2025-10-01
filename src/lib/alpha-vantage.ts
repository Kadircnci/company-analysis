// Alpha Vantage API client
const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || 'BY8FKSBPCE2XKTXX';
const BASE_URL = 'https://www.alphavantage.co/query';

export interface AlphaVantageResponse {
  [key: string]: any;
}

export interface StockQuote {
  symbol: string;
  open: string;
  high: string;
  low: string;
  price: string;
  volume: string;
  latest_trading_day: string;
  previous_close: string;
  change: string;
  change_percent: string;
}

export interface NewsItem {
  title: string;
  url: string;
  time_published: string;
  authors: string[];
  summary: string;
  source: string;
  category_within_source: string;
  overall_sentiment_score: number;
  overall_sentiment_label: 'Bearish' | 'Somewhat-Bearish' | 'Neutral' | 'Somewhat-Bullish' | 'Bullish';
  ticker_sentiment?: Array<{
    ticker: string;
    relevance_score: string;
    ticker_sentiment_score: string;
    ticker_sentiment_label: string;
  }>;
}

export interface CompanyOverview {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
}

export interface TimeSeriesDaily {
  [date: string]: {
    "1. open": string;
    "2. high": string; 
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
}

class AlphaVantageService {
  private async fetchData(params: Record<string, string>): Promise<AlphaVantageResponse> {
    const url = new URL(BASE_URL);
    url.searchParams.append('apikey', ALPHA_VANTAGE_API_KEY);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check for API error responses
      if (data.Error || data['Error Message']) {
        throw new Error(data.Error || data['Error Message']);
      }
      
      // Check for rate limit
      if (data.Note && data.Note.includes('API call frequency')) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      
      return data;
    } catch (error) {
      console.error('Alpha Vantage API Error:', error);
      throw error;
    }
  }

  // Get real-time stock quote
  async getStockQuote(symbol: string): Promise<StockQuote> {
    const data = await this.fetchData({
      function: 'GLOBAL_QUOTE',
      symbol: symbol.toUpperCase()
    });

    const quote = data['Global Quote'];
    if (!quote) {
      throw new Error(`No data found for symbol: ${symbol}`);
    }

    return {
      symbol: quote['01. symbol'],
      open: quote['02. open'],
      high: quote['03. high'],
      low: quote['04. low'],
      price: quote['05. price'],
      volume: quote['06. volume'],
      latest_trading_day: quote['07. latest trading day'],
      previous_close: quote['08. previous close'],
      change: quote['09. change'],
      change_percent: quote['10. change percent'].replace(/[%()]/g, '')
    };
  }

  // Get daily time series data for event-study analysis
  async getDailyTimeSeries(symbol: string, outputsize: 'compact' | 'full' = 'compact'): Promise<{
    metadata: any;
    timeSeries: TimeSeriesDaily;
  }> {
    const data = await this.fetchData({
      function: 'TIME_SERIES_DAILY',
      symbol: symbol.toUpperCase(),
      outputsize
    });

    return {
      metadata: data['Meta Data'],
      timeSeries: data['Time Series (Daily)']
    };
  }

  // Get company fundamental data
  async getCompanyOverview(symbol: string): Promise<CompanyOverview> {
    const data = await this.fetchData({
      function: 'OVERVIEW',
      symbol: symbol.toUpperCase()
    });

    if (!data.Symbol) {
      throw new Error(`No company overview data found for symbol: ${symbol}`);
    }

    return data as CompanyOverview;
  }

  // Get news sentiment for financial events detection
  async getNewsSentiment(tickers: string[], limit: number = 50): Promise<{
    feed: NewsItem[];
    sentiment_score_definition: string;
  }> {
    const tickerString = tickers.map(t => t.toUpperCase()).join(',');
    
    const data = await this.fetchData({
      function: 'NEWS_SENTIMENT',
      tickers: tickerString,
      limit: limit.toString(),
      sort: 'LATEST'
    });

    return {
      feed: data.feed || [],
      sentiment_score_definition: data.sentiment_score_definition || ''
    };
  }

  // Get top gainers/losers for market overview
  async getTopGainersLosers(): Promise<{
    top_gainers: Array<{
      ticker: string;
      price: string;
      change_amount: string;
      change_percentage: string;
      volume: string;
    }>;
    top_losers: Array<{
      ticker: string;
      price: string;
      change_amount: string;
      change_percentage: string;
      volume: string;
    }>;
    most_actively_traded: Array<{
      ticker: string;
      price: string;
      change_amount: string;
      change_percentage: string;
      volume: string;
    }>;
  }> {
    const data = await this.fetchData({
      function: 'TOP_GAINERS_LOSERS'
    });

    return {
      top_gainers: data.top_gainers || [],
      top_losers: data.top_losers || [],
      most_actively_traded: data.most_actively_traded || []
    };
  }

  // Get technical indicators for analysis
  async getRSI(symbol: string, interval: string = 'daily', timePeriod: number = 14): Promise<any> {
    const data = await this.fetchData({
      function: 'RSI',
      symbol: symbol.toUpperCase(),
      interval,
      time_period: timePeriod.toString(),
      series_type: 'close'
    });

    return data;
  }

  async getMACD(symbol: string, interval: string = 'daily'): Promise<any> {
    const data = await this.fetchData({
      function: 'MACD',
      symbol: symbol.toUpperCase(),
      interval,
      series_type: 'close'
    });

    return data;
  }

  // Earnings data for event detection
  async getEarnings(symbol: string): Promise<any> {
    const data = await this.fetchData({
      function: 'EARNINGS',
      symbol: symbol.toUpperCase()
    });

    return data;
  }

  // Symbol search for auto-complete
  async searchSymbol(keywords: string): Promise<Array<{
    symbol: string;
    name: string;
    type: string;
    region: string;
    marketOpen: string;
    marketClose: string;
    timezone: string;
    currency: string;
    matchScore: string;
  }>> {
    const data = await this.fetchData({
      function: 'SYMBOL_SEARCH',
      keywords: keywords.trim()
    });

    return (data.bestMatches || []).map((match: any) => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
      marketOpen: match['5. marketOpen'],
      marketClose: match['6. marketClose'],
      timezone: match['7. timezone'],
      currency: match['8. currency'],
      matchScore: match['9. matchScore']
    }));
  }
}

// Create singleton instance
export const alphaVantageService = new AlphaVantageService();

// Utility functions for financial calculations
export class FinancialAnalyzer {
  // Calculate abnormal returns for event study
  static calculateAbnormalReturns(
    stockPrices: { [date: string]: number },
    marketPrices: { [date: string]: number },
    eventDate: string,
    windowBefore: number = 30,
    windowAfter: number = 30
  ): {
    date: string;
    stockReturn: number;
    marketReturn: number;
    abnormalReturn: number;
    cumulativeAbnormalReturn: number;
  }[] {
    const dates = Object.keys(stockPrices).sort();
    const eventIndex = dates.indexOf(eventDate);
    
    if (eventIndex === -1) {
      throw new Error(`Event date ${eventDate} not found in price data`);
    }

    const results = [];
    let cumulativeAR = 0;

    for (let i = Math.max(0, eventIndex - windowBefore); 
         i < Math.min(dates.length - 1, eventIndex + windowAfter); 
         i++) {
      const currentDate = dates[i];
      const nextDate = dates[i + 1];
      
      if (!stockPrices[nextDate] || !marketPrices[nextDate] || 
          !stockPrices[currentDate] || !marketPrices[currentDate]) {
        continue;
      }

      const stockReturn = (stockPrices[nextDate] - stockPrices[currentDate]) / stockPrices[currentDate];
      const marketReturn = (marketPrices[nextDate] - marketPrices[currentDate]) / marketPrices[currentDate];
      const abnormalReturn = stockReturn - marketReturn;
      
      cumulativeAR += abnormalReturn;

      results.push({
        date: nextDate,
        stockReturn: stockReturn * 100,
        marketReturn: marketReturn * 100,
        abnormalReturn: abnormalReturn * 100,
        cumulativeAbnormalReturn: cumulativeAR * 100
      });
    }

    return results;
  }

  // Calculate sentiment score impact
  static analyzeSentimentImpact(sentimentScore: number, priceChange: number): {
    correlation: 'positive' | 'negative' | 'neutral';
    strength: 'weak' | 'moderate' | 'strong';
    recommendation: 'increase_investment' | 'hold' | 'caution';
    confidence: number;
  } {
    const absCorrelation = Math.abs(sentimentScore * priceChange);
    
    let correlation: 'positive' | 'negative' | 'neutral';
    if (sentimentScore > 0.1 && priceChange > 0) correlation = 'positive';
    else if (sentimentScore < -0.1 && priceChange < 0) correlation = 'positive';
    else if (sentimentScore > 0.1 && priceChange < 0) correlation = 'negative';
    else if (sentimentScore < -0.1 && priceChange > 0) correlation = 'negative';
    else correlation = 'neutral';

    let strength: 'weak' | 'moderate' | 'strong';
    if (absCorrelation > 15) strength = 'strong';
    else if (absCorrelation > 5) strength = 'moderate';
    else strength = 'weak';

    let recommendation: 'increase_investment' | 'hold' | 'caution';
    let confidence: number;

    if (sentimentScore > 0.3 && priceChange > 2) {
      recommendation = 'increase_investment';
      confidence = Math.min(95, 60 + absCorrelation * 2);
    } else if (sentimentScore < -0.3 && priceChange < -2) {
      recommendation = 'caution';
      confidence = Math.min(90, 50 + absCorrelation * 2);
    } else {
      recommendation = 'hold';
      confidence = Math.min(80, 40 + absCorrelation);
    }

    return { correlation, strength, recommendation, confidence };
  }
}

// Rate limiting helper
export class RateLimiter {
  private static requests: number[] = [];
  private static readonly MAX_REQUESTS_PER_MINUTE = 5; // Alpha Vantage free tier limit

  static async checkRateLimit(): Promise<void> {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // Remove requests older than 1 minute
    this.requests = this.requests.filter(time => time > oneMinuteAgo);

    if (this.requests.length >= this.MAX_REQUESTS_PER_MINUTE) {
      const oldestRequest = Math.min(...this.requests);
      const waitTime = oldestRequest + 60000 - now;
      
      console.log(`Rate limit reached. Waiting ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime + 1000));
    }

    this.requests.push(now);
  }
}