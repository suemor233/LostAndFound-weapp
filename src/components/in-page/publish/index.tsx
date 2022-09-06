import type { FC} from 'react';

import Choice from '@/components/universal/Icon/Choice'
import { Image } from '@taroify/core'
import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { dropList } from '../../../constants/publish/dropList'

interface IPros {
  open: boolean
}

// Todo suggest refactor becaouse of component flashing
const DropList: FC<IPros> = (props) => {
  return (
    <View className="h-full fx flex-col justify-center px-5">
        {dropList.map((item, index) => (
          <View
            key={item.title}
            className={`fx flex-row justify-between p-3 rounded-xl shadow-md ${
              index < dropList.length - 1 ? 'mb-5' : ''
            }`}
            style={{ backgroundColor: item.backgroundColor }}
            onClick={() =>
              Taro.navigateTo({
                url: item.url,
              })
            }
          >
            <View className="fx flex-row items-center">
              <Image
                style={{ width: `${item.width}px` }}
                src={item.icon}
                mode={'widthFix'}
              />
              <View className="fx flex-col ml-5">
                <Text>{item.title}</Text>
                <Text className="text-gray-500 text-xs opacity-80 mt-1">
                  {item.subtitle}
                </Text>
              </View>
            </View>
              <Choice />
          </View>
        ))}
      </View>
  )
}

export default DropList
