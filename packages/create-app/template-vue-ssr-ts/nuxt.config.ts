import { defineNuxtConfig } from '@nuxtjs/composition-api'
const LRU = require('lru-cache')
const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vue-ssr-element-template',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Customize the progress-bar color
  loading: { color: '#fff' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '@/plugins/axios',
    '@/plugins/element-ui',
    '@/plugins/repository',
    // { src: '@/plugins/error-handler', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://composition-api.nuxtjs.org/getting-started/setup
    '@nuxtjs/composition-api',
  ],

  generate: {
    // choose to suit your project
    interval: 2000,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: ['~/assets/scss/variable.scss'],
  },
  render: {
    bundleRenderer: {
      cache: new LRU({
        max: 1000, // 缓存队列长度
        maxAge: 1000 * 60, // 缓存1分钟
      }),
    },
  },

  serverMiddleware: ['~/serverMiddleware/pageCache.ts'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // proxy: true,
    // retry: { retries: 2 },
    baseURL: process.env.BASE_URL,
  },

  proxy: {
    '/api': {
      changeOrigin: true,
      target: process.env.API_URL,
      pathRewrite: {
        '^/api': '/',
        changeOrigin: true,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/, /@nuxtjs[\\/]composition-api/],
    terser: isProd,
    extractCSS: isProd,
    cssSourceMap: false,
    analyze: isProd,
    parallel: true, // 多线程build，实验属性
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
        ],
      ],
    },
    optimization: {
      moduleIds: 'named',
      chunkIds: 'named',
      runtimeChunk: {
        name: (entrypoint) => `runtime_${entrypoint.name}`,
      },
      splitChunks: {
        chunks: 'all',
        name: true,
        automaticNameDelimiter: '.',
        minChunks: 1,
        maxInitialRequests: 3,
        maxAsyncRequests: 5,
        minSize: 30000,
        // maxSize: 10240 * 25,
        cacheGroups: {
          vendors: {
            priority: -10,
            test: /[\\/]node_modules[\\/]/,
            reuseExistingChunk: true,
          },
          default: {
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  },
})
