import {
  createContext } from 'react'

import ManageItem from '@/components/in-page/user/management/lost'
import LostMange from '@/components/in-page/user/management/lost'
import type { LostFound } from '@/modules/lost-page'
import { ConfigProvider, Tabs } from '@taroify/core'

export const manageListContext = createContext<LostFound | null>(null)

const UserManagement = () => {
  return (
    <ConfigProvider
      theme={{
        tabsActiveColor: '#FFC107',
      }}
    >
      <Tabs animated swipeable>

        {list.map((item) => (
          <Tabs.TabPane
            key={item.title}
            title={item.title}
          >
            {/* {value && <item.component />} */}
            <LostMange />
          </Tabs.TabPane>
        ))}

      </Tabs>
    </ConfigProvider>
  )
}

// const list = ['丢失中', '已找回', '未认领', '已认领']
const list = [
  {
    title: '丢失中',
    component: () => <ManageItem />,
  },
  {
    title: '未认领',
    component: () => <ManageItem />,
  },
]

export default UserManagement
