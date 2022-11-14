import client from "../request"

export const removePhotoLost = (data:{id:string,url:string})=> {
  return client.post('/lost/upload/remove',data)
}


export const removePhotoFound = (data:{id:string,url:string})=> {
  return client.post('/lost/upload/remove',data)
}
