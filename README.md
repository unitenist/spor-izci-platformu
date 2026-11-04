# Spor İzci Platformu

Antrenman, günlük aktivite ve beslenme takibini tek yerde toplayan web uygulaması. React, TypeScript ve shadcn/ui ile geliştirilmiştir.

## Özellikler

- **Kontrol paneli** — günlük özet ve ilerleme
- **Antrenmanlar** — antrenman listesi, detay sayfası ve yeni antrenman oluşturma
- **Günlük aktiviteler** — gün içi hareket ve aktivite kaydı
- **Öğün planlayıcı** — haftalık beslenme planı
- **Profil** — kullanıcı bilgileri ve hedefler
- **Kayıt / Giriş** ekranları

## Teknolojiler

| Katman | Araç |
|---|---|
| Arayüz | React 18, TypeScript |
| Derleme | Vite |
| Bileşenler | shadcn/ui (Radix UI) |
| Stil | Tailwind CSS |
| Formlar | React Hook Form |

## Kurulum

Gereksinim: Node.js 18+ ve npm.

```bash
git clone https://github.com/unitenist/spor-izci-platformu.git
cd spor-izci-platformu
npm install
npm run dev
```

## Komutlar

| Komut | Açıklama |
|---|---|
| `npm run dev` | Geliştirme sunucusunu başlatır |
| `npm run build` | Üretim derlemesi alır |
| `npm run preview` | Derlemeyi yerelde önizler |
| `npm run lint` | ESLint kontrolü yapar |

## Proje yapısı

```
src/
├── components/   # Ortak arayüz bileşenleri
├── pages/        # Sayfalar (Dashboard, Workouts, MealPlanner …)
└── ...
```

## Çalışma akışı

- `main` her zaman çalışır durumdadır; doğrudan push yapılmaz.
- Yeni özellikler `feature/<kısa-ad>`, hata düzeltmeleri `fix/<kısa-ad>` branch'lerinde geliştirilir.
- Değişiklikler Pull Request ile `main`'e birleştirilir.
