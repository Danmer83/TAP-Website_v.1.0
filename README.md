# Travel Affiliate Website

A minimal production-ready MVP multilingual travel affiliate website built with Next.js, TypeScript, PostgreSQL (via Supabase), and Tailwind CSS.

## Features

- ✅ Dynamic article rendering from PostgreSQL
- ✅ Multilingual support (en, ru, id, th)
- ✅ Market-specific affiliate links
- ✅ SEO-friendly server-side rendering
- ✅ Markdown content support
- ✅ Dynamic placeholder replacement for affiliate links

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Supabase)
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown with remark-gfm

## Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)
- Basic knowledge of SQL

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project's SQL Editor
3. Run the schema file: Copy and paste the contents of `database/schema.sql` into the SQL Editor and execute it
4. (Optional) Run the seed file: Copy and paste the contents of `database/seed.sql` to add example data

### 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local` (or create `.env.local` manually)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under "API".

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test the Application

Try accessing these example URLs:
- `/en/thailand/phuket/avoid-crowded-phi-phi-tours`
- `/ru/thailand/phuket/avoid-crowded-phi-phi-tours`
- `/id/indonesia/bali/best-cheap-hotels`

## How to Add Articles

### Via Supabase SQL Editor

1. Go to your Supabase project's SQL Editor
2. Insert a new article:

```sql
INSERT INTO articles (title, slug, language, country, city, content) VALUES
(
  'Your Article Title',
  'your-article-slug',
  'en',  -- Language: en, ru, id, or th
  'thailand',  -- Country
  'phuket',  -- City (can be NULL)
  '# Your Article Title

Your markdown content here. Use placeholders like {{AFF_KLOOK_PHI_PHI}} for affiliate links.
'
);
```

### Article Fields

- **title**: Article title
- **slug**: URL-friendly identifier (must be unique per language)
- **language**: One of: `en`, `ru`, `id`, `th`
- **country**: Country name (e.g., `thailand`, `indonesia`)
- **city**: City name (optional, can be `NULL`)
- **content**: Markdown content with affiliate placeholders

### Affiliate Placeholders

In your article content, use placeholders in the format:
```
{{AFF_KEY_NAME}}
```

For example:
- `{{AFF_KLOOK_PHI_PHI}}`
- `{{AFF_BOOKING_PHUKET}}`
- `{{AFF_BOOKING_BALI}}`

These will be automatically replaced with the corresponding affiliate link based on the article's language and market (country).

## How to Add Affiliate Links

### Via Supabase SQL Editor

1. Go to your Supabase project's SQL Editor
2. Insert a new affiliate link:

```sql
INSERT INTO affiliate_links (key, language, market, url) VALUES
(
  'KLOOK_PHI_PHI',  -- Key (matches placeholder: {{AFF_KLOOK_PHI_PHI}})
  'en',  -- Language: en, ru, id, or th
  'thailand',  -- Market (country)
  'https://www.klook.com/en-US/activity/12345-phi-phi-islands-tour/'  -- Affiliate URL
);
```

### Affiliate Link Fields

- **key**: The identifier used in placeholders (without the `AFF_` prefix)
  - Example: For `{{AFF_KLOOK_PHI_PHI}}`, use key `KLOOK_PHI_PHI`
- **language**: One of: `en`, `ru`, `id`, `th`
- **market**: Country/market identifier (e.g., `thailand`, `indonesia`)
- **url**: The actual affiliate URL

### Important Notes

- The combination of `key`, `language`, and `market` must be unique
- When an article is rendered, it will use affiliate links that match both the article's language and market (country)
- If a placeholder doesn't have a matching affiliate link, it will remain as-is (with a console warning in development)

## URL Structure

Articles are accessed via the following URL patterns:

**With city:**
```
/[lang]/[country]/[city]/[slug]
```

**Without city (for country-level articles):**
```
/[lang]/[country]/[slug]
```

Examples:
- `/en/thailand/phuket/avoid-crowded-phi-phi-tours` (with city)
- `/ru/thailand/phuket/avoid-crowded-phi-phi-tours` (with city)
- `/id/indonesia/bali/best-cheap-hotels` (with city)
- `/en/thailand/general-travel-tips` (without city, if article.city is NULL)

The route will:
1. Fetch the article by `slug` and `language`
2. Verify that `country` and `city` (if provided) match the article
3. Fetch affiliate links matching the article's `language` and `market` (country)
4. Replace placeholders in the content with actual affiliate URLs
5. Render the article with SEO meta tags

## Project Structure

```
.
├── app/
│   ├── [lang]/[country]/[city]/[slug]/
│   │   └── page.tsx          # Dynamic article page
│   ├── globals.css            # Global styles with Tailwind
│   ├── layout.tsx             # Root layout
│   ├── not-found.tsx          # 404 page
│   └── page.tsx               # Homepage
├── lib/
│   ├── db.ts                  # Database functions
│   └── supabase.ts            # Supabase client
├── database/
│   ├── schema.sql             # Database schema
│   └── seed.sql               # Example seed data
├── .env.local.example         # Environment variables template
└── README.md                  # This file
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

Make sure to set the environment variables in your deployment platform.

## Database Schema

### Articles Table

- `id`: Primary key
- `title`: Article title
- `slug`: URL-friendly identifier
- `language`: Language code (en, ru, id, th)
- `country`: Country name
- `city`: City name (nullable)
- `content`: Markdown content
- `created_at`: Timestamp
- `updated_at`: Timestamp
- Unique constraint on `(slug, language)`

### Affiliate Links Table

- `id`: Primary key
- `key`: Placeholder key identifier
- `language`: Language code (en, ru, id, th)
- `market`: Market identifier (country)
- `url`: Affiliate URL
- `created_at`: Timestamp
- Unique constraint on `(key, language, market)`

## Scaling

This architecture scales cleanly to:
- More languages: Add new language codes to the CHECK constraints and insert articles/links
- More countries: Add new country values to articles and market values to affiliate_links
- More affiliates: Add new keys to affiliate_links table
- More articles: Insert more rows into articles table

## License

MIT

