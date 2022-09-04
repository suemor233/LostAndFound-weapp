import { FC, PropsWithChildren, useMemo } from 'react'
import { useEffect } from 'react'

import { ConfigProvider, Notify, Toast } from '@taroify/core'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

const ContentLayout: FC<PropsWithChildren> = ({ children }) => {
  const safeBottom = useMemo(() => {
    const res = Taro.getSystemInfoSync()
    const {
      screenHeight,
      safeArea: { bottom },
    } = res as any
    if (screenHeight && bottom) {
      return 48 + screenHeight - bottom
    }
  }, [])

  return (
    <View style={{ paddingBottom: `${safeBottom}px` }}>
      <Notify id="notify" />
      <Toast id="toast" />
      <ConfigProvider
        theme={{
          notifyPrimaryBackgroundColor: '#FFE33F',
        }}
      >
        {children}
      </ConfigProvider>
    </View>
  )
}

export default ContentLayout
