"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filter, Search, Calendar } from "lucide-react";
import { FinancialEventType, InvestmentRecommendation } from "@/types/financial";

export function FilterPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtreler
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Şirket Arama */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Şirket Ara</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Meta, Google, Microsoft..." className="pl-10" />
          </div>
        </div>

        {/* Olay Türü */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Olay Türü</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Tüm türler" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm türler</SelectItem>
              <SelectItem value="investment">Yatırım</SelectItem>
              <SelectItem value="acquisition">Satın Alma</SelectItem>
              <SelectItem value="partnership">Ortaklık</SelectItem>
              <SelectItem value="funding">Fonlama</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Öneri Türü */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Öneri Türü</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Tüm öneriler" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm öneriler</SelectItem>
              <SelectItem value="increase_investment">Arttır</SelectItem>
              <SelectItem value="hold">Bekle</SelectItem>
              <SelectItem value="caution">Dikkat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tarih Aralığı */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Tarih Aralığı</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Son 30 gün" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Son 7 gün</SelectItem>
              <SelectItem value="30d">Son 30 gün</SelectItem>
              <SelectItem value="90d">Son 90 gün</SelectItem>
              <SelectItem value="1y">Son 1 yıl</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Güven Aralığı */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Min. Güven (%)</label>
          <Input type="number" placeholder="50" min="0" max="100" />
        </div>

        {/* Aktif Filtreler */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Aktif Filtreler</label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              Son 30 gün
              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1">
                ×
              </Button>
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Yatırım
              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1">
                ×
              </Button>
            </Badge>
          </div>
        </div>

        {/* Aksiyon Butonları */}
        <div className="space-y-2 pt-4 border-t">
          <Button className="w-full">
            <Filter className="w-4 h-4 mr-2" />
            Filtrele
          </Button>
          <Button variant="outline" className="w-full">
            Filtreleri Temizle
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}