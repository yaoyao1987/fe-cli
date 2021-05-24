import { message } from "antd"
import { AxiosResponse, AxiosError } from "axios"

enum HttpStatusCode {
  OK = 200, // 指示请求成功，且请求的信息包含在响应中
  Created = 201, // 指示请求导致在响应被发送前创建新资源
  NoContent = 204, // 指示已成功处理请求并且响应已被设定为无内容
  BadRequest = 400, // 指示服务器未能识别请求
  Unauthorized = 401, // 指示请求的资源要求身份验证
  Forbidden = 403, // 指示服务器拒绝满足请求
  NotFound = 404, // 指示请求的资源不在服务器上
  InternalServerError = 500, // 指示服务器上发生了一般错误
  NotImplemented = 501, // 指示服务器不支持请求的函数
  ServiceUnavailable = 503, // 指示服务器暂时不可用，通常是由于过多加载或维护
  GatewayTimeout = 504 // 指示中间代理服务器在等待来自另一个代理或原始服务器的响应时已超时
}

// 服务端状态码策略
export const SERVER_STRATEGY = new Map([
  [
    HttpStatusCode.OK,
    (response: AxiosResponse) => Promise.resolve(response)
  ],
  [
    HttpStatusCode.Created,
    (response: AxiosResponse) => {
      message.success(response.data.message);
      return Promise.resolve(response)
    }
  ],
  [
    HttpStatusCode.NoContent,
    (response: AxiosResponse) => Promise.resolve(response)
  ],
  [
    HttpStatusCode.BadRequest,
    (response: AxiosResponse) => {
      message.error(response.data.message)
      return Promise.resolve(response)
    }
  ],
  [
    HttpStatusCode.InternalServerError,
    (response: AxiosResponse) => {
      message.error(response.data.message)
      return Promise.resolve(response)
    }
  ]
])

// HTTP状态码策略
export const HTTP_STRATEGY = new Map([
  [
    HttpStatusCode.BadRequest,
    () => {
      message.error('400, 参数错误')
    }
  ],
  [
    HttpStatusCode.Unauthorized,
    () => {
      message.error('授权失败，请重新登录!')
    }
  ],
  [
    HttpStatusCode.Forbidden,
    (error: AxiosError) => {
      message.error(`接口地址错误，不存在接口：'${error.config.url}'`)
    }
  ],
  [
    HttpStatusCode.NotFound,
    () => {
      message.error('授权失败，请重新登录!')
    }
  ]
])