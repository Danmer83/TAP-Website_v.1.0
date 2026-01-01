import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getArticle, getAffiliateLinks, replaceAffiliatePlaceholders } from '@/lib/db'

interface PageProps {
  params: {
    lang: string
    country: string
    city: string
    slug: string
  }
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = params
  const article = await getArticle(slug, lang)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  // Extract first paragraph for description (first 160 chars)
  const description = article.content
    .replace(/\{\{AFF_[A-Z_]+\}\}/g, '') // Remove placeholders for description
    .substring(0, 160)
    .trim()

  return {
    title: `${article.title} | Travel Guide`,
    description: description || `Travel guide: ${article.title}`,
  }
}

/**
 * Dynamic route page component
 * Handles URLs like: /en/thailand/phuket/avoid-crowded-phi-phi-tours
 */
export default async function ArticlePage({ params }: PageProps) {
  const { lang, country, city, slug } = params

  // Fetch article from database
  const article = await getArticle(slug, lang)

  // Return 404 if article not found
  if (!article) {
    notFound()
  }

  // Verify country matches (optional validation)
  if (article.country !== country) {
    notFound()
  }

  // Verify city matches - if article has a city, it must match URL
  // If article has no city, this route shouldn't be used (use the route without city)
  if (!article.city) {
    notFound()
  }
  if (article.city !== city) {
    notFound()
  }

  // Fetch affiliate links for this language and market (country)
  const affiliateLinks = await getAffiliateLinks(lang, country)

  // Replace placeholders in content with actual affiliate links
  const processedContent = replaceAffiliatePlaceholders(article.content, affiliateLinks)

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Header */}
        <header className="mb-8">
          <div className="text-sm text-gray-500 mb-2">
            {article.country}
            {article.city && ` / ${article.city}`}
          </div>
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        </header>

        {/* Article Content */}
        <div className="prose bg-white p-8 rounded-lg shadow">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{processedContent}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}


