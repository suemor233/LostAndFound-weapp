
import client from "../request"

export interface IFound  {
  title: string
  contact: string
  category:string
  foundTime:Date
  detail:string
}

export function createFound(data:IFound) {
    return client.post('/found',data)
}
