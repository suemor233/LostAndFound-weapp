import Taro from '@tarojs/taro'

const TokenKey = 'user-token'

export function getToken(): string | null {
  return Taro.getStorageSync(TokenKey) || null
}

export async function setToken(token: string) {
  return Taro.setStorageSync(TokenKey, token)
}

export function removeToken() {
  try {
    Taro.removeStorageSync(TokenKey)
  } catch (error) {
    console.log(error)
  }
}
const ReFresh = 'refresh'

export function getReFresh(): string | null {
  return Taro.getStorageSync(ReFresh) || null
}

export async function setReFresh(token: boolean) {
  return Taro.setStorageSync(ReFresh, token)
}

export function removeReFresh() {
  try {
    Taro.removeStorageSync(ReFresh)
  } catch (error) {
    console.log(error)
  }
}
