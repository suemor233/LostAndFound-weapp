import { makeAutoObservable, runInAction } from 'mobx'

import type { userType } from '@/modules/user'
import { getToken, setToken } from '@/utils/auth'
import Taro from '@tarojs/taro'

import { check, getUserInfo, login } from '../api/modules/user'
import { removeToken } from '../utils/auth'
import { isDev } from '../utils/state';

interface LoginType {
  avatarUrl: string
  nickName: string
}

export default class UserStore {
  user: userType | null

  constructor() {
    makeAutoObservable(this)
    this.userInfoByToken()
  }

  async getUserInfo() {
    Taro.getUserProfile({
      desc: '获取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: async (res) => {
        await this.login(res.userInfo)
      },
    })
  }

  async login(user: LoginType) {
    return await Taro.login({
      success: async (res) => {
        const userData = await login({
          id: res.code,
          nickName: user.nickName,
          avatarUrl: user.avatarUrl,
        })
        setToken(userData.token)
        this.userInfoByToken()
      },
    })
  }

  async userInfoByToken() {
    const res: userType = await getUserInfo()
    if (res) {
      runInAction(() => {
        this.user = res
      })
    } else {
      getToken() && removeToken()
    }
  }

  async checkToken() {
    const token = Taro.getStorageSync('user-token')
    if (!token) {
      return
    }
    const user = await check()
    return !!user
  }

  isLogin() {
    return !!this.user
  }
}
