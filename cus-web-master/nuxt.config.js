module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'cus-web-master',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Cus Web Service' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  
  css: [
    '~/assets/style/app.styl',
    '~/static/css/test.css',
  ],
  /*
  ** Customize the progress bar color
  */
  // loading: { color: '#3B8070' },
  loading: '~/components/Loading.vue',

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/axios',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/device',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/pwa',
    'nuxt-i18n',
  ],

  /*
  ** Axios config
  */
  axios: {
    baseURL: 'https://srm.tkek.co.kr:21110/srm',
    timeout: 50000,
  },

  /*
  ** Auth config
  */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/user/login',
            method: 'post',
            propertyName: 'user.tokenVal',
          },
          user: false,
          logout: false
        }
      }
    },
    watchLoggedIn: true,
    resetOnError: true
  },

  /*
  ** Auth router
  */
  router: {
    middleware: ['auth', 'https'],
  },

  /*
  ** Build configuration
  */
  build: {
    extend (config, ctx) {
    }
  }
}
