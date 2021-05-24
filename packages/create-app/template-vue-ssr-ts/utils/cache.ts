import LRU from 'lru-cache'

const cacheStore: any = new LRU({
  max: 10, // 设置最大缓存数
  maxAge: 1 * 60 * 1000, // 1分分钟
})

export const cache = {
  get: (key: string) =>
    cacheStore.get(key) ? JSON.parse(cacheStore.get(key)) : null,
  set: (key: string, value: any) => cacheStore.set(key, JSON.stringify(value)),
}
