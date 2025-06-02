/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://edgemy.fr',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*', '/api/*'],
  alternateRefs: [
    {
      href: 'https://edgemy.fr/fr',
      hreflang: 'fr',
    },
    {
      href: 'https://edgemy.fr/en',
      hreflang: 'en',
    },
  ],
  defaultAlternateRef: 'https://edgemy.fr/fr',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
  },
}

export default config 