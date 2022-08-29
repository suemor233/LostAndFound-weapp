import { Toast } from '@taroify/core'

const customInterceptor = (chain) => {
  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then((res) => {
    const { data } = res
    if (data.ok === 0) {
      if (Array.isArray(data.message)) {
        res.statusCode == 422 && Toast.fail(data.message[0])
        console.log(data.message[0])
      } else {
        console.log(data.message)
      }
      return ''
    }

    return res
  })
}

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
// const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]
const interceptors = [customInterceptor]

export default interceptors
