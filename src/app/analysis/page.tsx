import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventTimeline } from "@/components/dashboard/EventTimeline";
import { EventStudyChart } from "@/components/dashboard/EventStudyChart";
import { SentimentTrendChart } from "@/components/dashboard/SentimentTrendChart";
import { RecommendationPanel } from "@/components/dashboard/RecommendationPanel";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react";

export default function AnalysisPage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Detaylı Analizler</h1>
            <p className="text-muted-foreground mt-2">
              Event-study, sentiment analizi ve yatırım önerilerinin kapsamlı görünümü
            </p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Rapor İndir
            </Button>
            <Button className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Yeni Analiz
            </Button>
          </div>
        </div>

        {/* Ana Analiz Alanı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sol Panel - Timeline ve Filtreler */}
          <div className="lg:col-span-1 space-y-6">
            <FilterPanel />
            <EventTimeline />
          </div>

          {/* Sağ Panel - Grafikler ve Analizler */}
          <div className="lg:col-span-2 space-y-6">
            <EventStudyChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SentimentTrendChart />
              <RecommendationPanel />
            </div>
          </div>
        </div>

        {/* Detaylı Analiz Tablosu */}
        <Card>
          <CardHeader>
            <CardTitle>Son Analiz Sonuçları</CardTitle>
            <CardDescription>
              Tüm finansal olaylar ve detaylı analiz sonuçları
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Analiz 1 */}
              <div className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge variant="default">Yatırım</Badge>
                    <div>
                      <h3 className="font-semibold text-lg">Meta AI Altyapı Yatırımı</h3>
                      <p className="text-sm text-muted-foreground">META • 23 Aralık 2024</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    ARTTIR %92
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">+18.5%</div>
                    <p className="text-xs text-muted-foreground">Fiyat Artışı</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">+0.85</div>
                    <p className="text-xs text-muted-foreground">Sentiment Skoru</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold">156</div>
                    <p className="text-xs text-muted-foreground">Haber Sayısı</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">Düşük</div>
                    <p className="text-xs text-muted-foreground">Risk Seviyesi</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  <strong>Analiz Sonucu:</strong> Meta'nın AI altyapısına yaptığı büyük yatırım duyurusu 
                  piyasada güçlü pozitif tepki aldı. Teknoloji liderliğini güçlendiren bu hamle, 
                  uzun vadede şirketin rekabet avantajını artıracak.
                </p>
              </div>

              {/* Analiz 2 */}
              <div className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">Satın Alma</Badge>
                    <div>
                      <h3 className="font-semibold text-lg">Microsoft Startup Satın Alma</h3>
                      <p className="text-sm text-muted-foreground">MSFT • 18 Aralık 2024</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    ARTTIR %85
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">+12.8%</div>
                    <p className="text-xs text-muted-foreground">Fiyat Artışı</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">+0.72</div>
                    <p className="text-xs text-muted-foreground">Sentiment Skoru</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold">89</div>
                    <p className="text-xs text-muted-foreground">Haber Sayısı</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">Düşük</div>
                    <p className="text-xs text-muted-foreground">Risk Seviyesi</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  <strong>Analiz Sonucu:</strong> Microsoft'un stratejik satın alma hamlesi, 
                  bulut pazarındaki konumunu güçlendirecek. Satın alınan startup'ın teknolojisinin 
                  mevcut Azure hizmetleriyle entegrasyonu yüksek sinerji yaratacak.
                </p>
              </div>

              {/* Analiz 3 */}
              <div className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">Ortaklık</Badge>
                    <div>
                      <h3 className="font-semibold text-lg">Google-OpenAI İş Birliği</h3>
                      <p className="text-sm text-muted-foreground">GOOGL • 20 Aralık 2024</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-amber-50 text-amber-700">
                    <Activity className="w-3 h-3 mr-1" />
                    BEKLE %67
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-amber-600">+3.5%</div>
                    <p className="text-xs text-muted-foreground">Fiyat Artışı</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-amber-600">+0.35</div>
                    <p className="text-xs text-muted-foreground">Sentiment Skoru</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold">124</div>
                    <p className="text-xs text-muted-foreground">Haber Sayısı</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-amber-600">Orta</div>
                    <p className="text-xs text-muted-foreground">Risk Seviyesi</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  <strong>Analiz Sonucu:</strong> Google ve OpenAI arasındaki ortaklık detayları 
                  henüz belirsiz. Piyasa tepkisi karışık sinyaller veriyor. Ortaklığın kapsamı 
                  netleşene kadar bekleme tavsiye edilir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}