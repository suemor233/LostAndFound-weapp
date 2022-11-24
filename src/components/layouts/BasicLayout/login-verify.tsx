import type { FC, PropsWithChildren } from 'react'

import Taro, { useDidShow } from '@tarojs/taro'
import { useStore } from '@/store'

const LoginAuth: FC<PropsWithChildren> = ({ children }) => {
  const { userStore } = useStore()
  useDidShow(async() => {
      if (!await userStore.checkToken()) {
        Taro.switchTab({
          url: '/pages/user/index',
        })

      }
  })

  if (!userStore.user) {
    return null
  }

  return <>{children}</>
}

export default LoginAuth
