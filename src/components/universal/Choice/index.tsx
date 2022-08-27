import { FC } from 'react'

import { Image } from '@taroify/core'

interface IProps {
  size?: number
}
const Choice: FC<IProps> = ({size = 15}) => {
  return (
      <Image
        style={{ width: `${size}px`, height: `${size}px` }}
        src="https://y.suemor.com/imageschoice.png"
      />
  )
}

export default Choice
