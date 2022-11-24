import { observer } from 'mobx-react-lite'

import { Avatar } from '@/components/universal/Avatar'
import { Button } from '@/components/universal/Button'
import Choice from '@/components/universal/Icon/Choice'
import { PATH } from '@/constants/path'
import { url } from '@/constants/url'
import { useStore } from '@/store'
import { Text, View } from '@tarojs/components'
import Taro, { usePullDownRefresh } from '@tarojs/taro'

import styles from './index.module.css'

const UserDetail = () => {
  const { userStore } = useStore()
  const stateCount = [
    {
      count: userStore.user?.lost.lostCount,
      name: '丢失中',
      url: '/pages/user/management/index?type=lost',
    },
    {
      count: userStore.user?.lost.foundCount,
      name: '已找回',
      url: '/pages/user/management/index?type=alreayLost',
    },
    {
      count: userStore.user?.found.UnclaimedCount,
      name: '未认领',
      url: '/pages/user/management/index?type=found',
    },
  ]
  usePullDownRefresh(async () => {
    await userStore.userInfoByToken()
    Taro.stopPullDownRefresh()
  })

  const handleNavigateTo = () => {
    userStore.isLogin() &&
      Taro.navigateTo({
        url: PATH.USER_SETTING,
      })
  }
  return (
    <View className="p-4 pb-2 fx flex-col bg-white">
      <View
        className="fx ml-3 justify-between items-center"
        onClick={handleNavigateTo}
      >
        <View className="fx">
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
        {userStore.isLogin() && <Choice />}
      </View>
      <View className="fx my-3 ml-5">
        {stateCount.map((item, index) => (
          <View
            key={item.name}
            className={`fx ${
              index < stateCount.length - 1 ? 'w-full' : 'w-3_4'
            }`}
            onClick={() => Taro.navigateTo({ url: item.url })}
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
