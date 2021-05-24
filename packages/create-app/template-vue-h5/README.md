# 项目说明

目录
- [项目说明](#项目说明)
  - [Project setup](#project-setup)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Run your tests](#run-your-tests)
    - [Lints and fixes files](#lints-and-fixes-files)
    - [Customize configuration](#customize-configuration)
  - [目录结构](#目录结构)
  - [项目依赖](#项目依赖)
  - [配置说明](#配置说明)
    - [vant配置](#vant配置)
    - [浏览器兼容配置](#浏览器兼容配置)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 目录结构
```
├── README.md
├── babel.config.js   // babel配置文件
├── package.json      // 项目配置文件
├── postcss.config.js // postcss配置文件
├── public
│   ├── favicon.ico
│   └── index.html    // 主页
├── src               // 开发目录
│   ├── App.vue 
│   ├── api           // 接口api
│   ├── assets
│   │   ├── images    // 图片
│   │   ├── scripts   // js文件
│   │   └── styles    // css
│   ├── components    // 普通组件
│   ├── constants     // 常量
│   ├── enums         // 枚举
│   ├── main.js 
│   ├── mixins        // mixins
│   ├── router        // 路由
│   ├── store         // vuex
│   ├── utils         // 公共方法
│   └── views         // 页面
└── vue.config.js
```

## 项目依赖
1. vant   
2. axios 

## 配置说明

### vant配置
1. [自动按需引入vant组件](https://youzan.github.io/vant/#/zh-CN/quickstart)  
   
  ```
    # 安装插件
    npm i babel-plugin-import -D
    // 在.babelrc 中添加配置
    // 注意：webpack 1 无需设置 libraryDirectory
    {
      "plugins": [
        ["import", {
          "libraryName": "vant",
          "libraryDirectory": "es",
          "style": true
        }]
      ]
    }
  ```
2. [Rem 适配](https://youzan.github.io/vant/#/zh-CN/quickstart#rem-gua-pei)
  
  ```
  Vant 中的样式默认使用px作为单位，如果需要使用rem单位，推荐使用以下两个工具

  postcss-pxtorem 是一款 postcss 插件，用于将单位转化为 rem
  lib-flexible 用于设置 rem 基准值
  下面提供了一份基本的 postcss 配置，可以在此配置的基础上根据项目需求进行修改

  module.exports = {
    plugins: {
      'autoprefixer': {
        browsers: ['Android >= 4.0', 'iOS >= 7']
      },
      'postcss-pxtorem': {
        rootValue: 37.5,
        propList: ['*']
      }
    }
  }
  ```

3. [定制主题](https://youzan.github.io/vant/#/zh-CN/theme)

### 浏览器兼容配置
1、[vue cli browserslist](https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist)
2、[vue cli Polyfill](https://cli.vuejs.org/zh/guide/browser-compatibility.html#polyfill)