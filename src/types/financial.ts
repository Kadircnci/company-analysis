// Finansal olay türleri
export type FinancialEventType = 'investment' | 'acquisition' | 'partnership' | 'funding';

// Yatırım önerisi türleri
export type InvestmentRecommendation = 'increase_investment' | 'hold' | 'caution';

// Sentiment değerleri
export type SentimentScore = 'positive' | 'negative' | 'neutral';

// Temel finansal olay modeli
export interface FinancialEvent {
  id: string;
  companyName: string;
  companySymbol: string;
  eventType: FinancialEventType;
  title: string;
  description: string;
  eventDate: string;
  sourceUrl: string;
  confidence: number; // 0-1 arası güven skoru
}

// Hisse fiyat verisi
export interface StockPriceData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjustedClose: number;
}

// Event-study analizi
export interface EventStudyAnalysis {
  eventId: string;
  preEventPeriod: StockPriceData[]; // Olay öncesi -30 gün
  postEventPeriod: StockPriceData[]; // Olay sonrası +30 gün
  abnormalReturns: {
    date: string;
    abnormalReturn: number;
    cumulativeAbnormalReturn: number;
  }[];
  statisticalSignificance: boolean;
  impactMagnitude: number; // Etki büyüklüğü yüzdesi
}

// Sentiment analizi
export interface SentimentAnalysis {
  eventId: string;
  overallSentiment: SentimentScore;
  sentimentScore: number; // -1 ile +1 arası
  newsArticleCount: number;
  sentimentTrend: {
    date: string;
    sentiment: number;
    volume: number;
  }[];
  keyPhrases: string[];
}

// Yatırım önerisi
export interface InvestmentRecommendationResult {
  eventId: string;
  recommendation: InvestmentRecommendation;
  confidenceScore: number; // 0-100 arası
  reasoning: string; // 1-2 cümlelik gerekçe
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number; // Beklenen getiri yüzdesi
}

// Dashboard için toplam analiz sonucu
export interface FinancialAnalysisResult {
  event: FinancialEvent;
  stockAnalysis: EventStudyAnalysis;
  sentimentAnalysis: SentimentAnalysis;
  recommendation: InvestmentRecommendationResult;
  generatedAt: string;
}

// Dashboard API response formatı
export interface DashboardResponse {
  summary: {
    totalEvents: number;
    positiveRecommendations: number;
    averageConfidence: number;
    timeRange: {
      from: string;
      to: string;
    };
  };
  events: FinancialAnalysisResult[];
  trends: {
    sentimentTrend: { date: string; sentiment: number }[];
    returnTrend: { date: string; cumulativeReturn: number }[];
    volumeTrend: { date: string; volume: number }[];
  };
}

// API filter parametreleri
export interface AnalysisFilters {
  eventTypes?: FinancialEventType[];
  companies?: string[];
  dateRange?: {
    from: string;
    to: string;
  };
  minConfidence?: number;
  recommendations?: InvestmentRecommendation[];
}