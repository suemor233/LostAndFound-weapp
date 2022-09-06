import type { FC, PropsWithChildren} from 'react';
import { useMemo } from 'react'

import { ConfigProvider, Notify, Toast } from '@taroify/core'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

interface IProps extends  PropsWithChildren{
  className?:string
}

const ContentLayout: FC<IProps> = (props) => {
  const {children,className} = props
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
    <View style={{ paddingBottom: `${safeBottom}px` }} className={className}>
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
