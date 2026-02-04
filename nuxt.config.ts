// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/icon'],

  // Static site generation for GitHub Pages
  ssr: true,

  // GitHub Pages configuration
  app: {
    baseURL: '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Rafael Abensur',
      meta: [
        { name: 'description', content: 'Senior FinTech Engineer. Building payment infrastructure with PIX expertise.' },
        { name: 'author', content: 'Rafael Abensur' },
        { name: 'theme-color', content: '#ff7a59' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph
        { property: 'og:title', content: 'Rafael Abensur' },
        { property: 'og:description', content: 'Senior FinTech Engineer. Building payment infrastructure with PIX expertise.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://abensur.me' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:site_name', content: 'Rafael Abensur' },

        // Open Graph Image
        { property: 'og:image', content: 'https://abensur.me/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Rafael Abensur - Senior FinTech Engineer' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Rafael Abensur' },
        { name: 'twitter:description', content: 'Senior FinTech Engineer. Building payment infrastructure with PIX expertise.' },
        { name: 'twitter:image', content: 'https://abensur.me/og-image.png' },
      ],
      link: [
        { rel: 'canonical', href: 'https://abensur.me' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ]
    }
  },

  // Build configuration
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  // Custom CSS - content-first approach
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/variables.css',
    '~/assets/css/typography.css',
    '~/assets/css/scrollbars.css'
  ],

  // TypeScript
  typescript: {
    strict: false,
    typeCheck: false
  }
})
