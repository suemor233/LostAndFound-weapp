import { observer } from 'mobx-react-lite'

import { useStore } from '@/store'
import { Swiper } from '@taroify/core'
import { Image, Text, View } from '@tarojs/components'

import styles from './index.module.css'

const SwiperView = () => {
  const { lostFoundStore } = useStore()
  return (
    <>
      {lostFoundStore.found.length > 0 && lostFoundStore.found.length > 0 && (
        <Swiper className={styles['image-swiper']} lazyRender autoplay={4000}>
          <Swiper.Indicator className={styles['image-swiper-point']} />
          {lostFoundStore.radomSwiper.randomLostFound.map((item) => (
            <Swiper.Item key={item.id}>
              <View className={styles['image-swiper-wrapper']}>
                <Image
                  className={styles['image-swiper-wrapper-image']}
                  src={item.image[0]}
                  mode="aspectFill"
                />
                <Text className={styles['image-swiper-wrapper-text']}>
                  {item.title}
                </Text>
              </View>
            </Swiper.Item>
          ))}
        </Swiper>
      )}
    </>
  )
}

export default observer(SwiperView)
