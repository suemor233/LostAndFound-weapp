import { observer } from 'mobx-react-lite'

import UserDetail from '@/components/in-page/user/user-detail'
import UserList from '@/components/in-page/user/user-list'
import UserPublish from '@/components/in-page/user/user-publish'
import ContentLayout from '@/components/layouts/BasicLayout'
import { useStore } from '@/store'
import Taro, { useDidShow } from '@tarojs/taro'

const User = () => {
  const { userStore } = useStore()

  useDidShow(() => {
    !userStore.isLogin() &&
      Taro.showToast({
        title: '请先授权登录',
        icon: 'error',
      })
  })

  return (
    <ContentLayout>
      <UserDetail />
      {userStore.isLogin() ? <UserPublish /> : null}
      <UserList />
    </ContentLayout>
  )
}

export default observer(User)
