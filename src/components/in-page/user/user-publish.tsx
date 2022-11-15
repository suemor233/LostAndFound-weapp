import { Image } from '@taroify/core'
import { Text, View } from '@tarojs/components'
import styles from './index.module.css';
import { userPulish } from '../../../constants/icon'
import Taro from '@tarojs/taro';

const UserPublish = () => {
  return (
    <View className=" mt-4 relative bg-white">
      <View className='p-3'>
        <View className="mb-4 fx">
          <View className={`${styles['line-width']} h-6 bg-yellow-500 absolute left-0`} />
          <Text className="">我的发布</Text>
        </View>
        <View className="fx flex-row justify-between px-4">
          {userPulish.map((item) => (
            <View className="fx flex-col" key={item.name} onClick={() => Taro.navigateTo({url:item.url})}>
              <Image
                className="fx justify-center"
                src={item.icom}
                style={{ width: '30px', height: '30px', margin: '0 auto' }}
              />
              <Text className="text-sm mt-1 text-gray-500">{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default UserPublish
