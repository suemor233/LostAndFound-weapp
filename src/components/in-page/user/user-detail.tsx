import { observer } from 'mobx-react-lite'
import { Avatar } from '@/components/universal/Avatar'
import { Button } from '@/components/universal/Button'
import Card from '@/components/universal/Card'
import { userNum } from '@/constants/icon'
import { url } from '@/constants/url'
import { useStore } from '@/store'
import { Text, View } from '@tarojs/components'

import styles from './index.module.css'

const UserDetail = () => {
  const { userStore } = useStore()
  return (
    <Card className=" p-4 fx flex-col mt-5 mx-5">
      <View className="fx flex-row ml-3">
        <Avatar
          imageUrl={userStore.user?.avatarUrl || url.defaultAvatar}
          size={60}
        />
        <View className="fx items-center ml-5">
          {userStore.user ? (
            <Text className="text-lg">{userStore.user.nickName}</Text>
          ) : (
            <Button
              openType="getUserInfo"
              onClick={() => userStore.authorizeLogin()}
            >
              授权登录
            </Button>
          )}
        </View>
      </View>
      <View className="fx justify-between my-3 ml-5">
        {userNum.map((item, index) => (
            <View key={item.name} className={`fx ${index < userNum.length - 1 ? 'w-full' : 'w-3_4'}`}>
              <View className="fx flex-col">
                <Text className="text-center">{item.num}</Text>
                <Text className="text-gray-500">{item.name}</Text>
              </View>
              {index < userNum.length - 1 && (
                <View className={`${styles.fg}`} style={{ margin: '0 auto' }} />
              )}
            </View>
        ))}
      </View>
    </Card>
  )
}

export default observer(UserDetail)
