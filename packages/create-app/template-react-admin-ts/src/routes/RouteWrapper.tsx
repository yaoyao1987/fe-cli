import React, { useMemo } from 'react'
import DocumentTitle from 'react-document-title'
import queryString from 'query-string'

const RouteWrapper = (props: any) => {
  const { Comp, route, ...restProps } = props
  /** useMemo 缓存query，避免每次生成生的query */
  const queryMemo = useMemo(() => {
    const queryReg = /\?\S*/g
    const matchQuery = (reg: RegExp) => {
      const queryParams = restProps.location.search.match(reg)
      return queryParams ? queryParams[0] : '{}'
    }
    return queryString.parse(matchQuery(queryReg))
  }, [restProps.location.search])
  const mergeQueryToProps = () => {
    const queryReg = /\?\S*/g
    let newProps = { ...restProps }
    const removeQueryInRouter = (restProps: any, reg: RegExp) => {
      const { params } = restProps.match
      Object.keys(params).forEach((key) => {
        params[key] = params[key] && params[key].replace(reg, '')
      })
      restProps.match.params = { ...params }
    }

    newProps = removeQueryInRouter(newProps, queryReg)
    const merge = {
      ...newProps,
      query: queryMemo,
    }
    return merge
  }
  return (
    <DocumentTitle title={route.title}>
      <Comp {...mergeQueryToProps()} />
    </DocumentTitle>
  )
}

export default RouteWrapper
