import client from '../request'

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
  size: number
  /** 文件的 MIME 类型
   * @supported h5
   */
  type?: string

  cover: boolean
}

export function createLost(data: ILost) {
  return client.post('/lost', data)
}

export function lostById(id: string) {
  return client.get(`/lost/${id}`)
}
