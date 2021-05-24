/** 这是用于开发环境的webpack配置文件 **/

const path = require('path') // 获取绝对路径用
const webpack = require('webpack') // webpack核心
const CopyPlugin = require('copy-webpack-plugin') // 拷贝public中的文件到最终打包文件夹里
const HtmlWebpackPlugin = require('html-webpack-plugin') // 根据模板插入css/js等生成最终HTML
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin') // 使用day.js替代antd中的moment.js
const tsImportPluginFactory = require('ts-import-plugin') // 用于ts版本的按需加载
const webpackbar = require('webpackbar') // 美化终端构建时的进度条样式
const PUBLIC_PATH = '/' // 基础路径
const HappyPack = require('happypack')

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true&path=/__webpack_hmr', // webpack热更新插件，就这么写
    './src/index.tsx', // 项目入口
  ],
  output: {
    path: path.resolve(__dirname, '../build'), // 将文件打包到此目录下
    publicPath: PUBLIC_PATH, // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
    filename: 'dist/[name].[chunkhash:8].js',
    chunkFilename: 'dist/[name].[chunkhash:8].chunk.js',
  },
  devServer: {
    contentBase: path.join(__dirname, '../build'),
    hot: true,
    compress: true,
    open: true,
    historyApiFallback: true,
    overlay: {
      error: true,
    },
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api/server': {
        target: 'http:localhost:3010',
        pathRewrite: {
          '^/api/server': '',
        },
        changeOrigin: true,
        //secure:false
      },
    },
  },
  devtool: 'eval-source-map', // 报错的时候在控制台输出哪一行报错
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        // 编译前通过eslint检查代码 (注释掉即可取消eslint检测)
        test: /\.(ts|tsx|js|jsx)?$/,
        enforce: 'pre',
        use: ['source-map-loader', 'eslint-loader'],
        include: path.resolve(__dirname, '../src'),
      },
      {
        // .tsx用typescript-loader解析解析
        test: /\.(ts|tsx|js|jsx)?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: 'antd',
                    libraryDirectory: 'lib',
                    style: true,
                  }),
                ],
              }),
            },
          },
        ],
        include: path.resolve(__dirname, '../src'),
      },
      {
        // .css 解析
        test: /\.css$/,
        use: ['happypack/loader?id=css'],
      },
      {
        // .less 解析
        test: /\.less$/,
        use: ['happypack/loader?id=less'],
      },
      {
        // 文件解析
        test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash:4].[ext]',
            },
          },
        ],
      },
      {
        // 图片解析
        test: /\.(png|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 8192,
              name: 'assets/[name].[hash:4].[ext]',
            },
          },
        ],
      },
      {
        // wasm文件解析
        test: /\.wasm$/,
        include: path.resolve(__dirname, '../src'),
        type: 'webassembly/experimental',
      },
      {
        // xml文件解析
        test: /\.xml$/,
        include: path.resolve(__dirname, '../src'),
        use: ['xml-loader'],
      },
    ],
  },
  plugins: [
    new webpackbar(),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new AntdDayjsWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: './public/**/*',
          to: './',
          globOptions: {
            ignore: ['**/favicon.png', '**/index.html'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new HappyPack({
      id: 'css',
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    }),
    new HappyPack({
      id: 'less',
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              modifyVars: {
                'primary-color': '#438cff',
              },
              javascriptEnabled: true,
            },
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的html存放路径，相对于 output.path
      favicon: './public/favicon.png', // 自动把根目录下的favicon.ico图片加入html
      template: './public/index.html', // html模板路径
      inject: true, // 是否将js放在body的末尾
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.tsx'], // 后缀名自动补全
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
}
