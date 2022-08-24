import { makeAutoObservable, runInAction } from 'mobx'

import type { userType } from '@/modules/user'
import Taro from '@tarojs/taro'

export default class UserStore {
  user: userType | null = Taro.getStorageSync('search-user')
    ? JSON.parse(Taro.getStorageSync('search-user'))
    : null

  constructor() {
    makeAutoObservable(this)
  }

  async authorizeLogin() {
    Taro.getUserProfile({
      desc: '获取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
          this.user = JSON.parse(res.rawData)
          Taro.setStorage({
            key: 'search-user',
            data: res.rawData,
          })
      },
    })

    // this.user = {
    //   avatarUrl:
    //     'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJx4BCnqjdnkSTRlCrRnMnBQkFf36jbopY8y115v1vUicicGq6eZlicURbHDmNgXk2t3wMJyGo8cc4sg/132',
    //   country: '',
    //   gender: 0,
    //   language: 'zh_CN',
    //   nickName: 'suemor',
    //   province: '',
    // }
  }
}
