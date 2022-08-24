import { Image } from '@taroify/core'
import { Text, View } from '@tarojs/components'

import { userPulish } from '../../../constants/icon'

const UserPublish = () => {
  return (
    <View className="fx flex-row justify-between mt-4 px-2">
      {userPulish.map((item,index) => (
        <View className="fx flex-col" key={item.name}>
          <Image
            className="fx justify-center"
            src={item.icom}
            style={{ width: '30px', height: '30px', margin: '0 auto' }}
          />
          <Text className='text-sm mt-1 text-gray-600'>{item.name}</Text>
        </View>
      ))}
    </View>
  )
}

export default UserPublish
