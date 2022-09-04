import { observer } from 'mobx-react-lite'

import { Avatar } from '@/components/universal/Avatar'
import { Button } from '@/components/universal/Button'
import { url } from '@/constants/url'
import { useStore } from '@/store'
import { Text, View } from '@tarojs/components'
import { usePullDownRefresh } from '@tarojs/taro'

import styles from './index.module.css'
import Taro from '@tarojs/taro'

const UserDetail = () => {
  const { userStore } = useStore()
  const stateCount = [
    {
      count: userStore.user?.lost.lostCount,
      name: '丢失中',
    },
    {
      count: userStore.user?.lost.foundCount,
      name: '已找回',
    },
    {
      count: userStore.user?.found.UnclaimedCount,
      name: '未认领',
    },
  ]
  usePullDownRefresh(async () => {
    await userStore.userInfoByToken()
    Taro.stopPullDownRefresh()
  })
  return (
    <View className="p-4 pb-2 fx flex-col bg-white">
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
              onClick={() => userStore.getUserInfo()}
            >
              授权登录
            </Button>
          )}
        </View>
      </View>
      <View className="fx justify-between my-3 ml-5">
        {stateCount.map((item, index) => (
          <View
            key={item.name}
            className={`fx ${
              index < stateCount.length - 1 ? 'w-full' : 'w-3_4'
            }`}
          >
            <View className="fx flex-col">
              <Text className="text-center">
                {userStore.isLogin() ? item.count : '-'}
              </Text>
              <Text className="text-gray-500">{item.name}</Text>
            </View>
            <View className="fx items-center" style={{ margin: '0 auto' }}>
              {index < stateCount.length - 1 && (
                <View className={`${styles.fg} `} />
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default observer(UserDetail)
