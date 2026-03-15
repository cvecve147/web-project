import colors from 'vuetify/es5/util/colors'

const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/Web_Project/'
        }
      }
    : {}
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '芳嚮桿手作坊',
    title: '芳嚮桿手作坊，餅乾、糕點、小點心、結婚小物',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { property: 'og:title', content: '芳嚮桿手作坊' },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:description',
        content: '芳嚮桿手作坊，餅乾、糕點、小點心、結婚小物'
      },
      { property: 'og:site_name', content: '芳嚮桿手作坊小商店' },
      { property: 'og:locale', content: 'zh_TW' },
      {
        property: 'og:image',
        content: 'https://cvecve147.github.io/Web_Project/img/fulls/16.jpg'
      },
      {
        property: 'og:url',
        content: 'https://cvecve147.github.io/Web_Project/'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo_icon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Material+Icons'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  ...routerBase,
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
