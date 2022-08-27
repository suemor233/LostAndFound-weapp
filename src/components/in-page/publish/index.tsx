import { FC, useCallback } from 'react'

import TranslateCard from '@/components/universal/Card/TranslateCard'
import Choice from '@/components/universal/Choice'
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
    <View className='h-full'>

      <View className="px-5 py-1 mt-5 fx h-full flex-col justify-center">

        {dropList.map((item, index) => (
          <View
            key={item.title}
            className={`fx flex-row justify-between p-3 rounded-xl shadow-md ${
              index < dropList.length - 1 ? 'mb-5' : ''
            }`}
            style={{ backgroundColor: item.backgroundColor }}
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
            <View className="fx items-center">
              <Choice />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default DropList
