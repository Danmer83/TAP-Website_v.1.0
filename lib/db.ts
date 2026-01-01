import { supabase } from './supabase'

// Type definitions for database tables
export interface Article {
  id: number
  title: string
  slug: string
  language: string
  country: string
  city: string | null
  content: string
  created_at: string
  updated_at: string
}

export interface AffiliateLink {
  id: number
  key: string
  language: string
  market: string
  url: string
  created_at: string
}

/**
 * Fetches an article by slug and language
 * @param slug - Article slug
 * @param language - Language code (en, ru, id, th)
 * @returns Article or null if not found
 */
export async function getArticle(slug: string, language: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('language', language)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null
    }
    throw error
  }

  return data as Article
}

/**
 * Fetches all affiliate links for a given language and market
 * @param language - Language code (en, ru, id, th)
 * @param market - Market identifier (e.g., 'thailand', 'indonesia')
 * @returns Array of affiliate links
 */
export async function getAffiliateLinks(
  language: string,
  market: string
): Promise<AffiliateLink[]> {
  const { data, error } = await supabase
    .from('affiliate_links')
    .select('*')
    .eq('language', language)
    .eq('market', market)

  if (error) {
    throw error
  }

  return (data || []) as AffiliateLink[]
}

/**
 * Replaces placeholders in content with affiliate links
 * @param content - Article content with placeholders like {{AFF_KLOOK_PHI_PHI}}
 * @param affiliateLinks - Array of affiliate links to use for replacement
 * @returns Content with placeholders replaced by actual URLs
 */
export function replaceAffiliatePlaceholders(
  content: string,
  affiliateLinks: AffiliateLink[]
): string {
  // Create a map of key -> url for quick lookup
  const linkMap = new Map<string, string>()
  affiliateLinks.forEach((link) => {
    linkMap.set(link.key, link.url)
  })

  // Replace placeholders like {{AFF_KLOOK_PHI_PHI}} with actual URLs
  // Uses a regex to find all placeholders
  return content.replace(/\{\{AFF_([A-Z_]+)\}\}/g, (match, key) => {
    const url = linkMap.get(key)
    if (url) {
      return url
    }
    // If placeholder not found, return the original placeholder
    // This allows for debugging missing links
    console.warn(`Affiliate link placeholder not found: ${match}`)
    return match
  })
}


