import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Bell, Database, Shield, Activity, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
          <p className="text-muted-foreground mt-2">
            Sistem konfigürasyonu ve kişiselleştirme seçenekleri
          </p>
        </div>

        {/* Analiz Ayarları */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Analiz Ayarları
            </CardTitle>
            <CardDescription>
              Finansal olay analizi için temel parametreler
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="confidence-threshold">Minimum Güven Eşiği (%)</Label>
                <Input id="confidence-threshold" type="number" placeholder="50" min="0" max="100" />
                <p className="text-xs text-muted-foreground">
                  Bu değerin altındaki analizler gösterilmeyecek
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-period">Analiz Periyodu</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="30 gün" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 gün</SelectItem>
                    <SelectItem value="30">30 gün</SelectItem>
                    <SelectItem value="90">90 gün</SelectItem>
                    <SelectItem value="365">1 yıl</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Event-study analizi için olay öncesi/sonrası periyodu
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sentiment-source">Sentiment Kaynağı</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tüm Kaynaklar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Kaynaklar</SelectItem>
                    <SelectItem value="financial">Finansal Haberler</SelectItem>
                    <SelectItem value="social">Sosyal Medya</SelectItem>
                    <SelectItem value="official">Resmi Duyurular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="update-frequency">Güncelleme Sıklığı</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Gerçek Zamanlı" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Gerçek Zamanlı</SelectItem>
                    <SelectItem value="hourly">Saatlik</SelectItem>
                    <SelectItem value="daily">Günlük</SelectItem>
                    <SelectItem value="manual">Manuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bildirim Ayarları */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Bildirim Ayarları
            </CardTitle>
            <CardDescription>
              Önemli olaylar için uyarı ve bildirim tercihleri
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Yeni Finansal Olay Bildirimi</Label>
                  <p className="text-sm text-muted-foreground">
                    Yeni bir finansal olay tespit edildiğinde bildir
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Yüksek Güvenli Öneriler</Label>
                  <p className="text-sm text-muted-foreground">
                    %90 üzeri güven skorlu öneriler için bildirim
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Risk Uyarıları</Label>
                  <p className="text-sm text-muted-foreground">
                    Dikkat gerektiren durumlar için uyarı
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Günlük Özet Raporu</Label>
                  <p className="text-sm text-muted-foreground">
                    Her gün sonu kapsamlı analiz özeti
                  </p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notification-email">E-posta Adresi</Label>
              <Input id="notification-email" type="email" placeholder="ornek@email.com" />
            </div>
          </CardContent>
        </Card>

        {/* Veri Kaynakları */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Veri Kaynakları
            </CardTitle>
            <CardDescription>
              Finansal veri sağlayıcıları ve API yapılandırması
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="stock-api">Hisse Verisi API</Label>
                <Input id="stock-api" placeholder="API Anahtarı" type="password" />
                <p className="text-xs text-muted-foreground">
                  Alpha Vantage, Yahoo Finance vb.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="news-api">Haber API</Label>
                <Input id="news-api" placeholder="API Anahtarı" type="password" />
                <p className="text-xs text-muted-foreground">
                  NewsAPI, Bloomberg Terminal vb.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sentiment-api">Sentiment API</Label>
                <Input id="sentiment-api" placeholder="API Anahtarı" type="password" />
                <p className="text-xs text-muted-foreground">
                  OpenAI, Google Cloud Natural Language vb.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate-limit">Rate Limit (req/min)</Label>
                <Input id="rate-limit" type="number" placeholder="60" />
                <p className="text-xs text-muted-foreground">
                  API çağrı limiti
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Güvenlik Ayarları */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Güvenlik Ayarları
            </CardTitle>
            <CardDescription>
              Sistem güvenliği ve veri koruma ayarları
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>İki Faktörlü Doğrulama</Label>
                  <p className="text-sm text-muted-foreground">
                    Hesap güvenliği için ek doğrulama katmanı
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Veri Şifreleme</Label>
                  <p className="text-sm text-muted-foreground">
                    Hassas verilerin şifrelenmesi
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>API Log'ları</Label>
                  <p className="text-sm text-muted-foreground">
                    API çağrılarının detaylı loglanması
                  </p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Yedekleme Sıklığı</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Günlük" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Günlük</SelectItem>
                  <SelectItem value="weekly">Haftalık</SelectItem>
                  <SelectItem value="monthly">Aylık</SelectItem>
                  <SelectItem value="manual">Manuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Gelişmiş Ayarlar */}
        <Card>
          <CardHeader>
            <CardTitle>Gelişmiş Ayarlar</CardTitle>
            <CardDescription>
              Sistem yöneticisi ve developer ayarları
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-config">Özel Konfigürasyon</Label>
              <Textarea 
                id="custom-config" 
                placeholder="JSON formatında özel konfigürasyon..."
                className="min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="debug-mode">Debug Modu</Label>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenance-mode">Bakım Modu</Label>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kaydet Butonu */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline">
            Varsayılana Sıfırla
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Ayarları Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
}