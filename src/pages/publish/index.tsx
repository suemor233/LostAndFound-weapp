import { useState } from 'react'

import DropList from '@/components/in-page/publish'
import ContentLayout from '@/components/layouts/BasicLayout'
import Loginverify from '@/components/layouts/BasicLayout/login-verify'
import { Backdrop, Popup } from '@taroify/core'
import { useDidHide, useDidShow } from '@tarojs/taro'


const Publish = () => {
  const [open, setOpen] = useState(false)
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
