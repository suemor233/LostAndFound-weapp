import { makeAutoObservable, runInAction } from 'mobx'

import type { userType } from '@/modules/user'
import { getToken, setToken } from '@/utils/auth'
import Taro from '@tarojs/taro'

import { check, login, patchUser } from '../api/modules/user'
import { removeToken } from '../utils/auth'
import { Toast } from '@taroify/core'
import { aggregateInfo } from '../api/modules/aggregate';

export interface LoginType {
  avatarUrl: string
  nickName: string
}

export default class UserStore {
  user: userType | null

  constructor() {
    makeAutoObservable(this)
    this.userInfoByToken()
  }

  async getUserInfo(isLogin = true) {
    Taro.getUserProfile({
      desc: '获取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: async (res) => {
        isLogin ? await this.login(res.userInfo) : await patchUser(res.userInfo)
      },
    })
  }

  async login(user: LoginType) {
    return await Taro.login({
      success: async (res) => {
        const userData = await login({
          id: res.code,
          nickName: user.nickName || '',
          avatarUrl: user.avatarUrl || '',
        })

        await setToken(userData.token)
        this.userInfoByToken()
        Toast.success('登录成功')
      },
    })
  }

  async userInfoByToken() {
    const {user}  = await aggregateInfo() as Record<'user',userType>
    if (user) {
      runInAction(() => {
        this.user = user
      })
    } else {
      getToken() && removeToken()
    }
  }

  async checkToken() {
      const token = Taro.getStorageSync('user-token') || null
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
