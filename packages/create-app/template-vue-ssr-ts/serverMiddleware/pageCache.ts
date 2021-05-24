import LRU from 'lru-cache'
import etag from 'etag'

const cacheStore: any = new LRU({
  max: 1000, // 设置最大缓存数
  maxAge: 1 * 60 * 1000, // 1分分钟
})

export default function (req: any, res: any, next: any) {
  const url = req._parsedOriginalUrl
  const key = url.pathname
  // eslint-disable-next-line
  const { etag: curTag, response } = cacheStore.get(key) || {}
  if (response) {
    res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' })
    return res.end(response, 'utf-8')
  } else {
    res.original_end = res.end
    res.end = function (data: any) {
      if (res.statusCode === 200) {
        cacheStore.set(key, { etag: etag(data), value: data }, undefined)
      }
      return res.original_end(data, 'utf-8')
    }
  }
  next()
}
