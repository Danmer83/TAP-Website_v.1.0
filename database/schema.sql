-- Travel Affiliate Website Database Schema
-- Run this in your Supabase SQL Editor

-- Articles table
-- Stores multilingual travel articles with dynamic content
CREATE TABLE IF NOT EXISTS articles (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('en', 'ru', 'id', 'th')),
  country TEXT NOT NULL,
  city TEXT,
  content TEXT NOT NULL, -- Markdown content with placeholders
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure unique combination of slug and language
  UNIQUE(slug, language)
);

-- Index for fast lookups by slug and language
CREATE INDEX IF NOT EXISTS idx_articles_slug_language ON articles(slug, language);

-- Index for filtering by country and language
CREATE INDEX IF NOT EXISTS idx_articles_country_language ON articles(country, language);

-- Affiliate links table
-- Stores affiliate URLs mapped to keys, language, and market
CREATE TABLE IF NOT EXISTS affiliate_links (
  id BIGSERIAL PRIMARY KEY,
  key TEXT NOT NULL, -- e.g., 'KLOOK_PHI_PHI', 'BOOKING_PHUKET'
  language TEXT NOT NULL CHECK (language IN ('en', 'ru', 'id', 'th')),
  market TEXT NOT NULL, -- e.g., 'thailand', 'indonesia'
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure unique combination of key, language, and market
  UNIQUE(key, language, market)
);

-- Index for fast lookups by language and market
CREATE INDEX IF NOT EXISTS idx_affiliate_links_language_market ON affiliate_links(language, market);


