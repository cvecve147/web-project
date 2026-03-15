// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/seo'],
  ssr: true,
  runtimeConfig: {
    public: {
      gtagId: process.env.NUXT_PUBLIC_GTAG_ID || ''
    }
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/'
  },
  site: {
    name: '芳嚮桿手作坊',
    description: '手作糕點、餅乾與禮盒訂製',
    defaultLocale: 'zh-TW',
    url: process.env.NUXT_SITE_URL || 'https://example.com'
  },
  robots: {
    sitemap: '/sitemap.xml'
  },
  sitemap: {
    autoLastmod: true
  }
})
