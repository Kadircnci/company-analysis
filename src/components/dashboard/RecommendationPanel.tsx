"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, AlertTriangle, Target } from "lucide-react";
import { InvestmentRecommendation } from "@/types/financial";

interface RecommendationItem {
  id: string;
  company: string;
  recommendation: InvestmentRecommendation;
  confidence: number;
  reasoning: string;
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
}

const mockRecommendations: RecommendationItem[] = [
  {
    id: "1",
    company: "Meta",
    recommendation: "increase_investment",
    confidence: 92,
    reasoning: "AI yatırım duyurusu güçlü piyasa tepkisi aldı, teknoloji liderliği güçleniyor.",
    expectedReturn: 15.2,
    riskLevel: 'low'
  },
  {
    id: "2", 
    company: "Microsoft",
    recommendation: "increase_investment",
    confidence: 85,
    reasoning: "Stratejik satın alma sinerjileri yüksek, bulut pazarında konum güçlenecek.",
    expectedReturn: 12.8,
    riskLevel: 'low'
  },
  {
    id: "3",
    company: "Google",
    recommendation: "hold",
    confidence: 67,
    reasoning: "Ortaklık detayları belirsiz, piyasa tepkisi karışık sinyaller veriyor.",
    expectedReturn: 3.5,
    riskLevel: 'medium'
  },
  {
    id: "4",
    company: "Tesla",
    recommendation: "caution",
    confidence: 58,
    reasoning: "Fonlama koşulları sert, kısa vadede volatilite bekleniyor.",
    expectedReturn: -2.1,
    riskLevel: 'high'
  }
];

const getRecommendationIcon = (rec: InvestmentRecommendation) => {
  switch (rec) {
    case 'increase_investment': return <TrendingUp className="w-4 h-4" />;
    case 'hold': return <Target className="w-4 h-4" />;
    case 'caution': return <AlertTriangle className="w-4 h-4" />;
  }
};

const getRecommendationColor = (rec: InvestmentRecommendation) => {
  switch (rec) {
    case 'increase_investment': return 'bg-green-50 text-green-700 border-green-200';
    case 'hold': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'caution': return 'bg-red-50 text-red-700 border-red-200';
  }
};

const getRecommendationLabel = (rec: InvestmentRecommendation) => {
  switch (rec) {
    case 'increase_investment': return 'ARTTIR';
    case 'hold': return 'BEKLE';
    case 'caution': return 'DİKKAT';
  }
};

const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
  switch (risk) {
    case 'low': return 'text-green-600';
    case 'medium': return 'text-yellow-600';
    case 'high': return 'text-red-600';
  }
};

export function RecommendationPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Yatırım Önerileri
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockRecommendations.map((rec) => (
          <div key={rec.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm">{rec.company}</span>
                <Badge className={getRecommendationColor(rec.recommendation)}>
                  <div className="flex items-center gap-1">
                    {getRecommendationIcon(rec.recommendation)}
                    {getRecommendationLabel(rec.recommendation)} {rec.confidence}%
                  </div>
                </Badge>
              </div>
              <div className="text-right text-xs">
                <div className={`font-medium ${rec.expectedReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {rec.expectedReturn >= 0 ? '+' : ''}{rec.expectedReturn.toFixed(1)}%
                </div>
                <div className={`${getRiskColor(rec.riskLevel)}`}>
                  {rec.riskLevel === 'low' ? 'Düşük' : rec.riskLevel === 'medium' ? 'Orta' : 'Yüksek'} Risk
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {rec.reasoning}
            </p>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button className="w-full" variant="outline">
            Tüm Önerileri Görüntüle
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}