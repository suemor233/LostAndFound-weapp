import client from '../request'

export interface PageType {
  pageCurrent: number
  pageSize: number
}

export function aggregateInfo() {
  return client.get('/aggregate/stat')
}

export function lostFoundList(params: PageType) {
  return client.get('/aggregate/list',  params )
}

export function lostFoundListByUrl(url:string,params: PageType) {
  return client.get(`/aggregate/${url}`,  params )
}


export function search(params: {search:string}) {
  return client.get(`/aggregate/search`,  params )
}
