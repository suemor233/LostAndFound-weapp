import { useState } from 'react'

import { Tabs } from '@taroify/core'
import { View } from '@tarojs/components'

const UserManagement = () => {
  const [value, setValue] = useState(0)
  return (
    <View>
      <Tabs value={value} onChange={setValue} animated swipeable>
        {
          list.map(item => <Tabs.TabPane key={item} title={item}>{item}</Tabs.TabPane>)
        }

      </Tabs>
    </View>
  )
}

const list = ['丢失中','已找回', '未认领', '已认领']

export default UserManagement
