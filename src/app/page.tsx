import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3, Calendar, Search, Building2, Activity } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Finansal olayların genel görünümü ve önemli metrikler
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/companies">
              <Button variant="outline" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Şirketleri Gör
              </Button>
            </Link>
            <Link href="/analysis">
              <Button className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Detay Analiz
              </Button>
            </Link>
          </div>
        </div>

        {/* Özet Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Olay</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">Son 90 günde +12%</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktif Şirket</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">Teknoloji sektörü</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pozitif Öneri</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">89</div>
              <p className="text-xs text-muted-foreground">%70 oranında artış</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ortalama Güven</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">84%</div>
              <p className="text-xs text-muted-foreground">Yüksek güvenilirlik</p>
            </CardContent>
          </Card>
        </div>

        {/* Son Aktiviteler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Son Finansal Olaylar */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Son Finansal Olaylar</CardTitle>
                  <CardDescription>En güncel duyurular</CardDescription>
                </div>
                <Link href="/analysis">
                  <Button variant="ghost" size="sm">
                    Tümünü Gör
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Badge variant="default">Yatırım</Badge>
                    <div>
                      <h4 className="font-semibold text-sm">Meta AI Altyapı Yatırımı</h4>
                      <p className="text-xs text-muted-foreground">2 gün önce • META</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    ARTTIR %92
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">Satın Alma</Badge>
                    <div>
                      <h4 className="font-semibold text-sm">Microsoft Startup Satın Alma</h4>
                      <p className="text-xs text-muted-foreground">5 gün önce • MSFT</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    ARTTIR %85
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">Ortaklık</Badge>
                    <div>
                      <h4 className="font-semibold text-sm">Google-OpenAI İş Birliği</h4>
                      <p className="text-xs text-muted-foreground">1 hafta önce • GOOGL</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-amber-50 text-amber-700">
                    BEKLE %67
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performans Özeti */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Performans Özeti</CardTitle>
                  <CardDescription>Son 30 gün analizi</CardDescription>
                </div>
                <Link href="/companies">
                  <Button variant="ghost" size="sm">
                    Şirketleri Gör
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* En İyi Performans */}
                <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-800">En İyi Performans</span>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Meta (META)</span>
                    <span className="text-green-600 font-bold">+18.5%</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">AI yatırım duyuruları etkisiyle</p>
                </div>

                {/* Risk Uyarısı */}
                <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-amber-800">Dikkat Gereken</span>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Tesla (TSLA)</span>
                    <span className="text-amber-600 font-bold">DİKKAT %58</span>
                  </div>
                  <p className="text-xs text-amber-700 mt-1">Fonlama koşulları belirsiz</p>
                </div>

                {/* İstatistikler */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">24</div>
                    <p className="text-xs text-muted-foreground">Pozitif Analiz</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">3</div>
                    <p className="text-xs text-muted-foreground">Beklemede</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hızlı Erişim */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/companies">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center gap-4 p-6">
                <Building2 className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Şirket Listesi</h3>
                  <p className="text-sm text-muted-foreground">45 aktif şirket</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/analysis">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center gap-4 p-6">
                <BarChart3 className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Detay Analizler</h3>
                  <p className="text-sm text-muted-foreground">127 analiz raporu</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/settings">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center gap-4 p-6">
                <Activity className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Sistem Ayarları</h3>
                  <p className="text-sm text-muted-foreground">Konfigürasyon</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
