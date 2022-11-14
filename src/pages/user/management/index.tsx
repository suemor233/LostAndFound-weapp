import { createContext } from 'react'

import LostMange from '@/components/in-page/user/management/lost'
import type { LostFound } from '@/modules/lost-page'
import { ConfigProvider, Tabs } from '@taroify/core'
import FoundMange from '@/components/in-page/user/management/found'

export const manageListContext = createContext<LostFound | null>(null)

const UserManagement = () => {
  return (
    <ConfigProvider
      theme={{
        tabsActiveColor: '#FFC107',
      }}
    >
      <Tabs animated swipeable>
        <Tabs.TabPane title={'丢失中'}>
          <LostMange />
        </Tabs.TabPane>

        <Tabs.TabPane title={'未认领'}>
          <FoundMange  />
        </Tabs.TabPane>
      </Tabs>
    </ConfigProvider>
  )
}

export default UserManagement
