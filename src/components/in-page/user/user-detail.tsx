import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'

import { Avatar } from '@/components/universal/Avatar'
import { Button } from '@/components/universal/Button'
import Card from '@/components/universal/Card'
import { userNum } from '@/constants/icon'
import { url } from '@/constants/url'
import { useStore } from '@/store'
import { Text, View } from '@tarojs/components'

import styles from './index.module.css'
import UserPublish from './user-publish'

const UserDetail = () => {
  const { userStore } = useStore()
  return (
    <View className="bg-white w-full p-5 fx flex-col shadow-md">
      <View className="fx flex-row">
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
                <Text className="text-gray-600">{item.name}</Text>
              </View>
              {index < userNum.length - 1 && (
                <View className={`${styles.fg}`} style={{ margin: '0 auto' }} />
              )}
            </View>
        ))}
      </View>
      <UserPublish />
    </View>
  )
}

export default observer(UserDetail)
