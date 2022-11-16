import client from '../request'
import type { PageType } from './aggregate'

export interface ILost {
  title: string
  contact: string
  category: string
  lostTime: Date
  detail: string
  image: ImageFile[]
}

export interface ImageFile {
  /** 本地临时文件路径 */
  url: string
  /** 本地临时文件大小，单位 B */
  size?: number
  /** 文件的 MIME 类型
   * @supported h5
   */
  type?: string

  cover?: boolean
}

export function createLost(data: ILost) {
  return client.post('/lost', data)
}

export function lostById(id: string):Promise<ILost> {
  return client.get(`/lost/${id}`)
}

export function lostList(params: PageType) {
  return client.get('/aggregate/lost', params)
}

export function userLostList(params: PageType) {
  return client.get('/lost/list', params)
}

export function updateLost(data: ILost,id:string) {
  return client.patch(`/lost/${id}`, data)
}

export function lostListAlrealy(params: PageType) {
  return client.get('/aggregate/lost/alreary', params)
}

export function userLostListAlrealy(params: PageType) {
  return client.get('/lost/alreary', params)
}



export function lostEnterBack(data:{id:string,state:number}) {
  return client.post('/lost/enter_back', data)
}
