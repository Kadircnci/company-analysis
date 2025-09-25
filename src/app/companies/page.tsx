import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, TrendingUp, TrendingDown, Building2, Calendar } from "lucide-react";

// Mock şirket verileri
const companies = [
  {
    id: 1,
    name: "Meta Platforms Inc.",
    symbol: "META",
    sector: "Teknoloji",
    lastEvent: "AI Altyapı Yatırımı",
    eventDate: "2024-12-23",
    recommendation: "increase_investment",
    confidence: 92,
    priceChange: 18.5,
    eventCount: 3,
  },
  {
    id: 2,
    name: "Microsoft Corporation",
    symbol: "MSFT",
    sector: "Yazılım",
    lastEvent: "Startup Satın Alma",
    eventDate: "2024-12-18",
    recommendation: "increase_investment", 
    confidence: 85,
    priceChange: 12.8,
    eventCount: 2,
  },
  {
    id: 3,
    name: "Alphabet Inc.",
    symbol: "GOOGL",
    sector: "Teknoloji",
    lastEvent: "OpenAI Ortaklık",
    eventDate: "2024-12-20",
    recommendation: "hold",
    confidence: 67,
    priceChange: 3.5,
    eventCount: 4,
  },
  {
    id: 4,
    name: "Tesla Inc.",
    symbol: "TSLA",
    sector: "Otomotiv",
    lastEvent: "Series C Fonlama",
    eventDate: "2024-12-15",
    recommendation: "caution",
    confidence: 58,
    priceChange: -2.1,
    eventCount: 1,
  },
  {
    id: 5,
    name: "Apple Inc.",
    symbol: "AAPL",
    sector: "Teknoloji",
    lastEvent: "AR/VR Yatırımı",
    eventDate: "2024-12-10",
    recommendation: "increase_investment",
    confidence: 78,
    priceChange: 8.3,
    eventCount: 2,
  },
  {
    id: 6,
    name: "Amazon.com Inc.",
    symbol: "AMZN",
    sector: "E-ticaret",
    lastEvent: "Cloud Ortaklık",
    eventDate: "2024-12-12",
    recommendation: "hold",
    confidence: 72,
    priceChange: 5.2,
    eventCount: 3,
  },
];

const getRecommendationBadge = (rec: string, confidence: number) => {
  const baseClass = "text-xs font-medium";
  switch (rec) {
    case 'increase_investment':
      return <Badge className={`${baseClass} bg-green-50 text-green-700`}>ARTTIR {confidence}%</Badge>;
    case 'hold':
      return <Badge className={`${baseClass} bg-blue-50 text-blue-700`}>BEKLE {confidence}%</Badge>;
    case 'caution':
      return <Badge className={`${baseClass} bg-red-50 text-red-700`}>DİKKAT {confidence}%</Badge>;
    default:
      return <Badge variant="secondary">{confidence}%</Badge>;
  }
};

export default function CompaniesPage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Şirketler</h1>
            <p className="text-muted-foreground mt-2">
              Teknoloji sektöründeki şirketlerin finansal olay analizleri
            </p>
          </div>
        </div>

        {/* Filtre ve Arama */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtrele ve Ara
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Şirket ara..." className="pl-10" />
              </div>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sektör" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Sektörler</SelectItem>
                  <SelectItem value="teknoloji">Teknoloji</SelectItem>
                  <SelectItem value="yazilim">Yazılım</SelectItem>
                  <SelectItem value="otomotiv">Otomotiv</SelectItem>
                  <SelectItem value="e-ticaret">E-ticaret</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Öneri Türü" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Öneriler</SelectItem>
                  <SelectItem value="increase_investment">Arttır</SelectItem>
                  <SelectItem value="hold">Bekle</SelectItem>
                  <SelectItem value="caution">Dikkat</SelectItem>
                </SelectContent>
              </Select>

              <Button className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Filtrele
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Şirketler Tablosu */}
        <Card>
          <CardHeader>
            <CardTitle>Şirket Listesi</CardTitle>
            <CardDescription>
              {companies.length} şirket listeleniyor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Şirket</TableHead>
                  <TableHead>Son Olay</TableHead>
                  <TableHead>Öneri</TableHead>
                  <TableHead className="text-right">Fiyat Değişimi</TableHead>
                  <TableHead className="text-right">Olay Sayısı</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{company.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {company.symbol}
                            </Badge>
                            {company.sector}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{company.lastEvent}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(company.eventDate).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRecommendationBadge(company.recommendation, company.confidence)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={`flex items-center justify-end gap-1 ${
                        company.priceChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {company.priceChange >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="font-medium">
                          {company.priceChange >= 0 ? '+' : ''}{company.priceChange}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">
                        {company.eventCount} olay
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Detay
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sektör Özeti */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">En Aktif Sektör</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Teknoloji</div>
              <p className="text-sm text-muted-foreground">4 şirket, 12 olay</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">En İyi Performans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">META</div>
              <p className="text-sm text-muted-foreground">+18.5% artış</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ortalama Güven</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-sm text-muted-foreground">6 şirket ortalaması</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}