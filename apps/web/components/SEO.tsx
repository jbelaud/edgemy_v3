import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  canonical?: string
}

export default function SEO({
  title = "Edgemy - La plateforme de coaching poker et mental",
  description = "Rejoignez Edgemy, la seule plateforme qui met en relation joueurs et coachs certifiés pour progresser dans tous les aspects du poker : technique et mental.",
  ogImage = "https://edgemy.fr/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  canonical = "https://edgemy.fr"
}: SEOProps) {
  return (
    <Head>
      {/* Balises de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Autres meta tags importants */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#4F46E5" />
      <meta name="keywords" content="poker, coaching, mental, formation, edgemy, coach poker, coach mental" />
      <meta name="author" content="Edgemy" />
      <meta name="robots" content="index, follow" />
    </Head>
  )
} 