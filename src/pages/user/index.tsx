import { observer } from 'mobx-react-lite'

import UserDetail from '@/components/in-page/user/user-detail'
import UserList from '@/components/in-page/user/user-list'
import UserPublish from '@/components/in-page/user/user-publish'
import { View } from '@tarojs/components'

const User = () => {
  return (
    <View>
      <UserDetail />
      <UserPublish />
      <UserList />
    </View>
  )
}

export default observer(User)
