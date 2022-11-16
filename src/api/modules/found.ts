
import client from "../request"
import type { PageType } from "./aggregate"
import type { ImageFile } from "./lost"

export interface IFound  {
  title: string
  contact: string
  category:string
  place:string
  foundTime:Date
  detail:string
  image:ImageFile[]
}

export function createFound(data:IFound) {
    return client.post('/found',data)
}

export function foundById(id:string) {
  return client.get(`/found/${id}`)
}

export function updateFound(data: IFound,id:string) {
  return client.patch(`/found/${id}`, data)
}

export function foundList(params: PageType) {
  return client.get('/aggregate/found', params)
}

export function userFoundList(params: PageType) {
  return client.get('/found/list', params)
}

export function foundListAlrealy(params: PageType) {
  return client.get('/aggregate/found/alreary', params)
}

export function userFoundListAlrealy(params: PageType) {
  return client.get('/found/alreary', params)
}

export function foundEnterBack(data:{id:string,state:number}) {
  return client.post('/found/enter_back', data)
}
