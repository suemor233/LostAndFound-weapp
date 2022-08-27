import { FC } from 'react'

import { Image } from '@taroify/core'
import { View } from '@tarojs/components'

interface IProps {
  size?: number
}
const Choice: FC<IProps> = ({ size = 15 }) => {
  return (
    <View className="fx items-center">
      <Image
        style={{ width: `${size}px`, height: `${size}px` }}
        src="https://y.suemor.com/imageschoice.png"
      />
    </View>
  )
}

export default Choice
