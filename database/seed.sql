-- Example seed data for Travel Affiliate Website
-- Run this in your Supabase SQL Editor after running schema.sql

-- Insert sample articles
INSERT INTO articles (title, slug, language, country, city, content) VALUES
(
  'Avoid Crowded Phi Phi Tours',
  'avoid-crowded-phi-phi-tours',
  'en',
  'thailand',
  'phuket',
  '# Avoid Crowded Phi Phi Tours

Planning a trip to the stunning Phi Phi Islands? Here''s how to avoid the crowds and have an amazing experience.

## Best Time to Visit

The best time to visit Phi Phi Islands is during the early morning hours, before the day tours arrive. Consider staying overnight on Phi Phi Don to experience the islands without the crowds.

## Recommended Tours

For the best experience, book your tour in advance: {{AFF_KLOOK_PHI_PHI}}

This tour offers smaller groups and better timing to avoid peak crowds.

## Where to Stay

If you''re planning to stay in Phuket, check out these great options: {{AFF_BOOKING_PHUKET}}

## Tips

- Book early morning tours
- Consider staying overnight on Phi Phi Don
- Bring sunscreen and water
- Respect the marine environment
'
),
(
  'Избегайте переполненных туров на Пхи-Пхи',
  'avoid-crowded-phi-phi-tours',
  'ru',
  'thailand',
  'phuket',
  '# Избегайте переполненных туров на Пхи-Пхи

Планируете поездку на потрясающие острова Пхи-Пхи? Вот как избежать толпы и получить незабываемые впечатления.

## Лучшее время для посещения

Лучшее время для посещения островов Пхи-Пхи - ранние утренние часы, до прибытия дневных туров. Рассмотрите возможность ночевки на Пхи-Пхи Дон, чтобы насладиться островами без толпы.

## Рекомендуемые туры

Для лучшего опыта забронируйте тур заранее: {{AFF_KLOOK_PHI_PHI}}

Этот тур предлагает небольшие группы и лучшее время, чтобы избежать пиковых скоплений людей.

## Где остановиться

Если вы планируете остановиться в Пхукете, ознакомьтесь с этими отличными вариантами: {{AFF_BOOKING_PHUKET}}

## Советы

- Бронируйте туры ранним утром
- Рассмотрите возможность ночевки на Пхи-Пхи Дон
- Возьмите солнцезащитный крем и воду
- Уважайте морскую среду
'
),
(
  'Best Cheap Hotels in Bali',
  'best-cheap-hotels',
  'id',
  'indonesia',
  'bali',
  '# Hotel Murah Terbaik di Bali

Mencari akomodasi terjangkau di Bali? Berikut adalah beberapa pilihan hotel murah terbaik yang menawarkan nilai luar biasa.

## Rekomendasi Hotel

Untuk pengalaman terbaik, pesan hotel Anda terlebih dahulu: {{AFF_BOOKING_BALI}}

Hotel-hotel ini menawarkan lokasi strategis dan fasilitas yang baik dengan harga terjangkau.

## Tips Memilih Hotel

- Pilih lokasi dekat pantai atau pusat kota
- Baca ulasan dari tamu sebelumnya
- Periksa fasilitas yang disediakan
- Bandingkan harga di berbagai platform

## Aktivitas di Bali

Setelah menemukan hotel, jangan lupa untuk menjelajahi keindahan Bali. Pesan tur Anda di sini: {{AFF_KLOOK_BALI}}
'
)
ON CONFLICT (slug, language) DO NOTHING;

-- Insert sample affiliate links
INSERT INTO affiliate_links (key, language, market, url) VALUES
-- Thailand - English
('KLOOK_PHI_PHI', 'en', 'thailand', 'https://www.klook.com/en-US/activity/12345-phi-phi-islands-tour/'),
('BOOKING_PHUKET', 'en', 'thailand', 'https://www.booking.com/searchresults.html?city=phuket'),

-- Thailand - Russian
('KLOOK_PHI_PHI', 'ru', 'thailand', 'https://www.klook.com/ru-RU/activity/12345-phi-phi-islands-tour/'),
('BOOKING_PHUKET', 'ru', 'thailand', 'https://www.booking.com/searchresults.html?city=phuket&lang=ru'),

-- Indonesia - Indonesian
('BOOKING_BALI', 'id', 'indonesia', 'https://www.booking.com/searchresults.html?city=bali&lang=id'),
('KLOOK_BALI', 'id', 'indonesia', 'https://www.klook.com/id-ID/activity/67890-bali-tour/'),

-- Indonesia - English
('BOOKING_BALI', 'en', 'indonesia', 'https://www.booking.com/searchresults.html?city=bali'),
('KLOOK_BALI', 'en', 'indonesia', 'https://www.klook.com/en-US/activity/67890-bali-tour/')
ON CONFLICT (key, language, market) DO NOTHING;
