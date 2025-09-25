"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, Building, TrendingUp } from "lucide-react";
import { FinancialEventType } from "@/types/financial";

interface TimelineEvent {
  id: string;
  company: string;
  title: string;
  type: FinancialEventType;
  date: string;
  confidence: number;
}

const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    company: "Meta",
    title: "AI Altyapı Yatırımı",
    type: "investment",
    date: "2024-12-23",
    confidence: 92,
  },
  {
    id: "2",
    company: "Google",
    title: "OpenAI İş Birliği",
    type: "partnership",
    date: "2024-12-20",
    confidence: 78,
  },
  {
    id: "3",
    company: "Microsoft",
    title: "Startup Satın Alma",
    type: "acquisition",
    date: "2024-12-18",
    confidence: 85,
  },
  {
    id: "4",
    company: "Tesla",
    title: "Series C Fonlama",
    type: "funding",
    date: "2024-12-15",
    confidence: 67,
  },
];

const getEventTypeColor = (type: FinancialEventType): string => {
  switch (type) {
    case 'investment': return 'bg-blue-100 text-blue-800';
    case 'acquisition': return 'bg-green-100 text-green-800';
    case 'partnership': return 'bg-purple-100 text-purple-800';
    case 'funding': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getEventTypeLabel = (type: FinancialEventType): string => {
  switch (type) {
    case 'investment': return 'Yatırım';
    case 'acquisition': return 'Satın Alma';
    case 'partnership': return 'Ortaklık';
    case 'funding': return 'Fonlama';
  }
};

export function EventTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5" />
          Olay Zaman Çizelgesi
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] p-6">
          <div className="space-y-4">
            {mockEvents.map((event, index) => (
              <div key={event.id} className="flex items-start space-x-4 pb-4 border-b last:border-b-0">
                <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getEventTypeColor(event.type)}>
                      {getEventTypeLabel(event.type)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{event.company}</span>
                  </div>
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-muted-foreground">
                      Güven: %{event.confidence}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}