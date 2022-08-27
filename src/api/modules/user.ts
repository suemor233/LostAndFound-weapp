
import type { LoginType } from "@/store/user"
import client from "../request"

export interface IUser  {
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

export function patchUser(data: LoginType) {
  return client.patch('/user', data )
}


export function check() {
  return client.get('/user/check_logged')
}
