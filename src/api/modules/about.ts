import client from "../request"

export const basicInfo = ()=> {
  return client.get('/about/basic')
}


export function detailInfo() {
  return client.get('/about/detail')
}
