
import client from "../request"

export interface ILost  {
  title: string
  contact: string
  category:string
  lostTime:Date
  detail:string
}

export function createLost(data:ILost) {
    return client.post('/lost',data)
}
