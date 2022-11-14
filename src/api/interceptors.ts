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

const interceptors = [customInterceptor]

export default interceptors
