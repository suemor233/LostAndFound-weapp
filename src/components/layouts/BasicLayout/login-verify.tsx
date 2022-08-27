import { FC, PropsWithChildren } from 'react'

import Taro from '@tarojs/taro'
import { useDidShow } from '@tarojs/taro'
import { useStore } from '@/store'

const Loginverify: FC<PropsWithChildren> = ({ children }) => {
  const { userStore } = useStore()
  useDidShow(() => {
    setTimeout(()=>{
      if (!userStore.isLogin()) {
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
  })

  if (!userStore.isLogin()) {
    return null
  }

  return <>{children}</>
}

export default Loginverify
