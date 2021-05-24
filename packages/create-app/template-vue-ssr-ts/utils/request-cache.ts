// import axios from 'axios'
// import LRU from 'lru-cache'

// const cache = new LRU({
//   max: 1000,
//   maxAge: 1000,
// })

// const request = (config) => {
//   const {
//     params = {},
//     data: {},
//   } = config
//   const key =
//     config.method + config.url + JSON.stringify(params) + JSON.stringify(data)
//   if (cache.has(key)) {
//     // 緩存命中
//     return Promise.resolve(cache.get(key))
//   }

//   return axios(config).then((response) => {
//     cache.set(key, response.data)
//     return response.data
//   })
// }

// // 注入服务端和浏览器端
// export default ({ app }, inject) => {
//   inject('requestCache', request)
// }
