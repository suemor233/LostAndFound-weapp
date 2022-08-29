import { getToken } from '@/utils/auth'
import Taro from '@tarojs/taro'
import interceptors from './interceptors'


interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))
class httpRequest {
  baseOptions(params: any, method = 'GET') {
    const { url, data } = params

    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const option = {
      url: process.env.API_URL + url,
      data,
      method,
      header: {
        'content-type': contentType,
        Authorization: `Bearer ${getToken()}`,
      },
    } as any
    return Taro.request(option).then((res) => res.data)
  }

  get(url, data?) {
    const option = { url, data }
    return this.baseOptions(option)
  }

  post(url, data) {
    const params = { url, data }
    return this.baseOptions(params, 'POST')
  }

  put(url, data = '') {
    const option = { url, data }
    return this.baseOptions(option, 'PUT')
  }

  patch(url, data ) {
    const params = { url, data }
    return this.baseOptions(params, 'PATCH')
  }

  delete(url, data = '') {
    const option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
}

export default new httpRequest()
