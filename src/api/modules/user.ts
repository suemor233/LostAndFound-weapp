
import client from "../request"

interface IUser  {
  id: string
  avatarUrl: string
  nickName:string
}

export function login(data:IUser) {
    return client.post('/user',data)
}

export function getUserInfo() {
  return client.get('/user')
}


export function check() {
  return client.get('/user/check_logged')
}
