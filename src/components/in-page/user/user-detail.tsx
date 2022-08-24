import { Avatar } from '@/components/universal/Avatar'
import { url } from '@/constants/url'
import { useStore } from '@/store'
import { Button, Text, View } from '@tarojs/components'
import { observer } from 'mobx-react-lite'

const UserDetail = () => {
  const { userStore } = useStore()
  return (
    <View className="bg-white w-4_5 mt-8 rounded-md p-5 fx">
      <Avatar imageUrl={userStore.user?.avatarUrl || url.defaultAvatar} size={60} />
      <View className="fx items-center ml-5">
        {userStore.user ? (
          <>
            <Text className='text-lg'>{userStore.user.nickName}</Text>
          </>
        ) : (
          <Button
            openType="getUserInfo"
            onClick={()=>userStore.authorizeLogin()}
            size={'mini'}
          >
            授权登录
          </Button>
        )}

      </View>
    </View>
  )
}

export default observer(UserDetail)
