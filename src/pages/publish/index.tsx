import { useEffect, useState } from 'react'

import DropList from '@/components/in-page/publish'
import ContentLayout from '@/components/layouts/BasicLayout'
import Loginverify from '@/components/layouts/BasicLayout/login-verify'
import { useStore } from '@/store'
import { Toast } from '@/utils/toast'
import { Backdrop, Popup } from '@taroify/core'
import { Text, View } from '@tarojs/components'
import { useDidHide, useDidShow, useLoad, useTabItemTap } from '@tarojs/taro'
import Taro from '@tarojs/taro'

import styles from './index.module.css'

const Publish = () => {
  const [open, setOpen] = useState(false)
  const { userStore } = useStore()
  useDidShow(() => {
    setOpen(true)
  })

  useDidHide(() => {
    setOpen(false)
  })

  return (
    <ContentLayout>
      <Loginverify>
        <Popup
          open={open}
          placement="bottom"
          rounded
          style={{ height: '60%', backgroundColor: '#f7f7f7' }}
        >
          <Backdrop open={true} />
          <DropList open />
        </Popup>
      </Loginverify>
    </ContentLayout>
  )
}

export default Publish
