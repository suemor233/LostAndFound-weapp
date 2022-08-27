import { FC, PropsWithChildren } from 'react'

import { ConfigProvider, Notify, Toast } from '@taroify/core'
import { View } from '@tarojs/components'

const ContentLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View>
      <Notify id="notify" />
      <Toast id="toast" />
      <ConfigProvider theme={{
        notifyPrimaryBackgroundColor:'#FFE33F'
      }}>
      {children}
      </ConfigProvider>
    </View>
  )
}

export default ContentLayout
