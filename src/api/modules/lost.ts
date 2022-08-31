
import client from "../request"

export interface ILost  {
  title: string
  contact: string
  category:string
  lostTime:Date
  detail:string
  image:ImageFile[]
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
  /** 原始的浏览器 File 对象
   * @supported h5
   */
  originalFileObj?: File
}

export function createLost(data:ILost) {
    return client.post('/lost',data)
}
