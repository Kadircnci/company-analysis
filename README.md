# FinAnalyzer - Finansal Olay Analiz Dashboard

Teknoloji şirketlerinin yatırım, satın alma, ortaklık ve fonlama duyurularını otomatik tespit eden, olay öncesi/sonrası hisse hareketlerini analiz eden ve akıllı yatırım önerileri sunan kapsamlı finansal analiz platformu.

## 🚀 Özellikler

### 📊 Ana Dashboard
- **Gerçek zamanlı özet kartlar**: Toplam olay sayısı, aktif şirketler, pozitif öneriler
- **Son finansal olaylar**: En güncel duyurular ve analiz sonuçları
- **Performans özeti**: En iyi performans gösteren şirketler ve risk uyarıları
- **Hızlı erişim paneli**: Tüm sayfalara kolay navigasyon

### 🏢 Şirketler Sayfası
- **Kapsamlı şirket listesi**: 45+ teknoloji şirketi
- **Gelişmiş filtreleme**: Sektör, öneri türü, tarih aralığı
- **Detaylı bilgi kartları**: Hisse performansı, son olaylar, güven skorları
- **Sektör bazlı analiz**: En aktif sektörler ve performans karşılaştırması

### 📈 Detaylı Analizler
- **Event-Study Grafikleri**: Olay öncesi/sonrası 30 günlük hisse analizi
- **Sentiment Trend Analizi**: Duygu durumu ve haber hacmi takibi
- **Yatırım Önerileri**: ARTTIR/BEKLE/DİKKAT önerileri + güven skoru
- **Timeline Görünümü**: Kronolojik olay zaman çizelgesi
- **Akıllı filtreleme**: Çoklu kriter bazlı analiz filtreleme

### ⚙️ Sistem Ayarları
- **Analiz parametreleri**: Güven eşiği, analiz periyodu, veri kaynakları
- **Bildirim sistemi**: Email uyarıları, risk bildirimleri
- **Güvenlik ayarları**: İki faktörlü doğrulama, veri şifreleme
- **API konfigürasyonu**: Çoklu veri sağlayıcı entegrasyonu

## 🛠️ Teknoloji Stack

- **Frontend**: Next.js 15.5.4, React 19.1.0, TypeScript
- **UI Framework**: ShadCN/UI, Tailwind CSS v4
- **Grafikler**: Recharts
- **İkonlar**: Lucide React
- **Tarih İşlemleri**: date-fns
- **HTTP Client**: Axios

## 🎯 Analiz Motoru

### Finansal Olay Tespit Sistemi
- **Olay Türleri**: Yatırım, Satın Alma, Ortaklık, Fonlama
- **Güven Skorlaması**: 0-100 arası güvenilirlik hesaplaması
- **Otomatik sınıflandırma**: AI destekli olay kategorilendirme

### Event-Study Analizi
- **Abnormal Return hesaplama**: Market-adjusted getiri analizi
- **Kümülatif Abnormal Return**: Olay etkisinin zaman içi takibi
- **İstatistiksel anlamlılık**: T-test bazlı significance testing

### Sentiment Analizi
- **Çoklu kaynak**: Finansal haberler, sosyal medya, resmi duyurular
- **Skorlama**: -1 ile +1 arası sentiment puanlaması
- **Trend analizi**: Zaman bazlı duygu durumu değişimi

### Yatırım Öneri Sistemi
```typescript
interface Recommendation {
  type: 'increase_investment' | 'hold' | 'caution';
  confidence: number; // 0-100
  reasoning: string; // 1-2 cümlelik açıklama
  expectedReturn: number; // Beklenen getiri %
  riskLevel: 'low' | 'medium' | 'high';
}
```

## 🚀 Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Tarayıcıda açın: http://localhost:3000
```

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Ana dashboard
│   ├── companies/         # Şirketler sayfası
│   ├── analysis/          # Detaylı analizler
│   └── settings/          # Sistem ayarları
├── components/
│   ├── ui/                # ShadCN UI bileşenleri
│   ├── layout/            # Layout bileşenleri (Navbar)
│   └── dashboard/         # Dashboard bileşenleri
└── types/
    └── financial.ts       # TypeScript tip tanımları
```

## 📊 Mock Data

Sistem şu anda kapsamlı mock data ile çalışmaktadır:
- **127 finansal olay** (son 90 gün)
- **45 aktif şirket** (teknoloji sektörü)
- **89 pozitif öneri** (%70 başarı oranı)
- **%84 ortalama güven skoru**

## 🔮 Gelecek Özellikler

- [ ] **Gerçek API entegrasyonu**: Alpha Vantage, NewsAPI
- [ ] **Machine Learning modeli**: Gelişmiş olay tespit algoritması
- [ ] **Portfolio tracking**: Kişisel portföy takibi
- [ ] **Alert sistemi**: WhatsApp, Telegram bildirimleri
- [ ] **Sosyal trading**: Topluluk bazlı öneriler
- [ ] **Backtesting**: Geçmiş performans analizi
- [ ] **Export/Import**: Excel, PDF rapor çıktıları

## 🎨 UI/UX Özellikleri

- **Responsive tasarım**: Mobil-first yaklaşım
- **Dark/Light mode**: Otomatik tema değişimi (Tailwind CSS)
- **Accessibility**: WCAG 2.1 AA uyumlu
- **Performance**: Next.js optimizasyonları
- **SEO friendly**: Meta tag optimizasyonu

## 📈 Dashboard KPI'ları

| Metrik | Değer | Açıklama |
|--------|-------|----------|
| Toplam Şirket | 45 | Aktif izlenen teknoloji şirketi |
| Analiz Edilen Olay | 127 | Son 90 gündeki finansal olaylar |
| Ortalama Güven | %84 | Yüksek güvenilirlik skoru |
| Pozitif Öneriler | 89 | %70 başarılı ARTTIR önerisi |

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

MIT License - Detaylar için `LICENSE` dosyasına bakınız.

## 📞 İletişim

**FinAnalyzer Team** - finansal analiz ve yatırım önerilerinde uzman ekip

---

*Bu proje Next.js ile geliştirilmiş modern bir finansal analiz platformudur. ShadCN/UI ve Tailwind CSS kullanarak responsive ve kullanıcı dostu bir deneyim sunar.*
