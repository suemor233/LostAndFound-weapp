import { observer } from 'mobx-react-lite'

import UserDetail from '@/components/in-page/user/user-detail'
import UserList from '@/components/in-page/user/user-list'
import UserPublish from '@/components/in-page/user/user-publish'
import ContentLayout from '@/components/layouts/BasicLayout'
import { useStore } from '@/store'
import { Notify } from '@taroify/core'

const User = () => {
  const { userStore } = useStore()
  return (
    <ContentLayout>
      <UserDetail />
      {userStore.isLogin() ? <UserPublish /> : null}
      <UserList />
    </ContentLayout>
  )
}

export default observer(User)
