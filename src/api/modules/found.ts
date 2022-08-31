
import client from "../request"
import type { ImageFile } from "./lost"

export interface IFound  {
  title: string
  contact: string
  category:string
  foundTime:Date
  detail:string
  image:ImageFile[]
}

export function createFound(data:IFound) {
    return client.post('/found',data)
}
