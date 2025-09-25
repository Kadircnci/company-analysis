"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";

// Mock event-study data
const mockEventStudyData = [
  { day: -30, cumulativeReturn: 0, abnormalReturn: 0 },
  { day: -25, cumulativeReturn: 2.1, abnormalReturn: 0.3 },
  { day: -20, cumulativeReturn: 1.8, abnormalReturn: -0.1 },
  { day: -15, cumulativeReturn: 3.2, abnormalReturn: 0.4 },
  { day: -10, cumulativeReturn: 2.9, abnormalReturn: 0.2 },
  { day: -5, cumulativeReturn: 4.1, abnormalReturn: 0.5 },
  { day: 0, cumulativeReturn: 7.5, abnormalReturn: 2.1 }, // Olay günü
  { day: 5, cumulativeReturn: 9.2, abnormalReturn: 1.8 },
  { day: 10, cumulativeReturn: 12.3, abnormalReturn: 2.5 },
  { day: 15, cumulativeReturn: 11.8, abnormalReturn: 1.2 },
  { day: 20, cumulativeReturn: 13.5, abnormalReturn: 1.7 },
  { day: 25, cumulativeReturn: 15.2, abnormalReturn: 2.1 },
  { day: 30, cumulativeReturn: 14.8, abnormalReturn: 1.9 },
];

export function EventStudyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Event-Study Analizi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockEventStudyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                label={{ value: 'Olay Gününden İtibaren', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                label={{ value: 'Kümülatif Getiri (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value.toFixed(2)}%`, 
                  name === 'cumulativeReturn' ? 'Kümülatif Getiri' : 'Anormal Getiri'
                ]}
                labelFormatter={(label: number) => `Gün: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="cumulativeReturn" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="abnormalReturn" 
                stroke="#dc2626" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              {/* Olay günü dikey çizgisi */}
              <Line 
                type="monotone" 
                dataKey={() => null}
                stroke="#6b7280" 
                strokeWidth={1}
                strokeDasharray="2 2"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span>Kümülatif Getiri: +14.8%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span>Anormal Getiri: +1.9%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}