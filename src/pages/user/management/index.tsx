import { createContext, useState , useEffect } from 'react'

import FoundMange from '@/components/in-page/user/management/found'
import LostMange from '@/components/in-page/user/management/lost'
import type { LostFound } from '@/modules/lost-page'
import { ConfigProvider, Tabs, Toast } from '@taroify/core'
import { useRouter } from '@tarojs/taro'

import FoundAlready from '../../../components/in-page/user/management/found-already'
import LostAlready from '../../../components/in-page/user/management/lost-already'

export const manageListContext = createContext<LostFound | null>(null)

const UserManagement = () => {
  const [tab, setTab] = useState(0)
  const router = useRouter()
  useEffect(() => {
    if (router.params.type === 'lost') {
      setTab(0)
    } else if (router.params.type === 'alreadyLost') {
      setTab(1)
    } else if (router.params.type === 'found') {
      setTab(2)
    } else if (router.params.type === 'alreadyFound'){
      setTab(3)
    }
  }, [])
  return (
    <ConfigProvider
      theme={{
        tabsActiveColor: '#FFC107',
      }}
    >
       <Toast id="toast" />
      <Tabs animated swipeable value={tab} onChange={setTab}>
        <Tabs.TabPane title={'丢失中'}>
          <LostMange />
        </Tabs.TabPane>
        <Tabs.TabPane title={'已找回'}>
          <LostAlready />
        </Tabs.TabPane>
        <Tabs.TabPane title={'未认领'}>
          <FoundMange />
        </Tabs.TabPane>

        <Tabs.TabPane title={'已认领'}>
          <FoundAlready />
        </Tabs.TabPane>
      </Tabs>
    </ConfigProvider>
  )
}

export default UserManagement
