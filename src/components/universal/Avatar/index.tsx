import { FC, memo } from 'react'

import { Image, View } from '@tarojs/components'

import styles from './index.module.css'

interface AvatarProps {
  imageUrl?: string
  size?: number
}

export const Avatar: FC<AvatarProps> = memo((props) => {
  const { size = 100 } = props
  return (
    <View className={styles['avatar-wrap']}>
      <Image
        src={props.imageUrl || ''}
        className={styles.avatar}
        style={{ height: `${size}px`, width: `${size}px` }}
      />
    </View>
  )
})
