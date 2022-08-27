import type { FC, PropsWithChildren } from 'react'
import styles from './index.module.css';
import { View } from '@tarojs/components'

const TranslateCard: FC<PropsWithChildren> = ({ children }) => {
  return <View className={styles.popup}>{children}</View>
}

export default TranslateCard
