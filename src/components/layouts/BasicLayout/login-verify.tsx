import type { FC, PropsWithChildren } from 'react'

import Taro, { useDidShow } from '@tarojs/taro'
import { useStore } from '@/store'

const Loginverify: FC<PropsWithChildren> = ({ children }) => {
  const { userStore } = useStore()
  useDidShow(async() => {
      if (!await userStore.checkToken()) {
        Taro.switchTab({
          url: '/pages/user/index',
        })
        setTimeout(() => {
          Taro.showToast({
            title: '请先授权登录',
            icon: 'error',
          })
        })
      }
  })

  if (!userStore.user) {
    return null
  }

  return <>{children}</>
}

export default Loginverify
