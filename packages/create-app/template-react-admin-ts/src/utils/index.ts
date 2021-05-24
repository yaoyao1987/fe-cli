import { useEffect, useRef, useState } from 'react'
import { parse } from 'qs'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// 后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    },
  }
}

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current
  // 页面加载时: 旧title
  // 加载后：新title

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧title
        document.title = oldTitle
      }
    }
  }, [keepOnUnmount, oldTitle])
}

export const resetRoute = () => (window.location.href = window.location.origin)

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <O extends { [key in string]: unknown }, K extends keyof O>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) => keys.includes(key as K))
  return Object.fromEntries(filteredEntries) as Pick<O, K>
}

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}

/**
 * @description 获取页面的参数
 */
export function getPageQuery() {
  return parse(window.location.href.split('?')[1])
}

/**
 * 获取token* */
export const getToken = () => {
  const xToken = localStorage.getItem('xToken')
  if (!xToken) {
    location.href = `${location.origin}/user/login`
  }
  return xToken
}
