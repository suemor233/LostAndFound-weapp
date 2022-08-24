import type { PropsWithChildren } from 'react'
import { FC } from 'react'

import { View } from '@tarojs/components'

interface IProps extends PropsWithChildren {
  className: string
}

const Card: FC<IProps> = ({ children,className }) => {
  return <View className={`rounded-2xl shadow-md bg-white ${className}`}>{children}</View>
}

export default Card
