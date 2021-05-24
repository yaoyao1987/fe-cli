import path from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy'
import vitePluginImp from 'vite-plugin-imp'
import { minifyHtml } from 'vite-plugin-html'
import visualizer from 'rollup-plugin-visualizer'
import autoprefixer from 'autoprefixer';

const isDev = process.env.NODE_ENV === 'development';
const isPro = process.env.NODE_ENV === 'production';

console.log(`process.env.NODE_ENV`, process.env.NODE_ENV)

console.log('process:::env', process.argv)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    legacy({
      targets: [
        'Android >= 39',
        'Chrome >= 50',
        'Safari >= 10.1',
        'iOS >= 10.3',
        '> 1%',
        'not IE 11'
      ]
    }),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
    minifyHtml()
  ],
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: path.join(__dirname, './src/')
      }
    ]
  },
  optimizeDeps: {
    include: [
      '@ant-design/icons',
    ],
  },
  css: {
    postcss: {
      // parser
      plugins: [
        autoprefixer({
          "overrideBrowserslist": ['last 2 versions'],
          grid: true
        })
      ]
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // antd 定制主题样式
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        }
      }
    }
  },
  server: {
    proxy: {
      '^/api': {
        // target: 'http://jsonplaceholder.typicode.com/',
        target: 'http://localhost:3001/',
        changeOrigin: true,
        ws: false,
        'secure': false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  build: {
    target: 'es2015',
    assetsInlineLimit: 4096, // 在多少 kb 使用 base64
    cssCodeSplit: true,
    minify: isPro ? 'terser' : 'esbuild',
    polyfillDynamicImport: true,
    rollupOptions: isPro ? {
      plugins: [
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true
        })
      ]
    } : {}
  }
})