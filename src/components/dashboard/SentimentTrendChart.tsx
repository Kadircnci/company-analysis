"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Heart } from "lucide-react";

// Mock sentiment data
const mockSentimentData = [
  { date: '2024-12-01', sentiment: 0.2, volume: 45 },
  { date: '2024-12-05', sentiment: 0.3, volume: 52 },
  { date: '2024-12-10', sentiment: -0.1, volume: 38 },
  { date: '2024-12-15', sentiment: 0.7, volume: 89 }, // Funding event
  { date: '2024-12-18', sentiment: 0.6, volume: 76 }, // Acquisition
  { date: '2024-12-20', sentiment: 0.4, volume: 63 }, // Partnership
  { date: '2024-12-23', sentiment: 0.8, volume: 94 }, // Investment
  { date: '2024-12-25', sentiment: 0.7, volume: 87 },
];

export function SentimentTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Sentiment Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockSentimentData}>
              <defs>
                <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('tr-TR', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              />
              <YAxis 
                domain={[-1, 1]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.toFixed(1)}
              />
              <Tooltip 
                formatter={(value: number) => [`${(value * 100).toFixed(0)}%`, 'Sentiment']}
                labelFormatter={(label: string) => new Date(label).toLocaleDateString('tr-TR')}
              />
              <Area 
                type="monotone" 
                dataKey="sentiment" 
                stroke="#10b981" 
                strokeWidth={2}
                fill="url(#sentimentGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <span>Son 30 gün ortalama: +52%</span>
          <span>Toplam haber: 504</span>
        </div>
      </CardContent>
    </Card>
  );
}