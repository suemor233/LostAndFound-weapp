import Taro from '@tarojs/taro'

const TokenKey = 'user-token'

export function getToken(): string | null {
  return Taro.getStorageSync(TokenKey) || null
}

export function setToken(token: string) {
  return Taro.setStorageSync('user-token', token)
}

export function removeToken() {
  try {
    Taro.removeStorageSync(TokenKey)
  } catch (error) {
    console.log(error)
  }
}
