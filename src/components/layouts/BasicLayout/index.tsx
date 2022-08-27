import { FC, PropsWithChildren } from 'react'

import { ConfigProvider, Notify } from '@taroify/core'
import { View } from '@tarojs/components'

const ContentLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View>
      <Notify id="notify" />
      <ConfigProvider theme={{
        notifyPrimaryBackgroundColor:'#FFE33F'
      }}>
      {children}
      </ConfigProvider>
    </View>
  )
}

export default ContentLayout
