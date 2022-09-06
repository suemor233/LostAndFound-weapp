import { observer } from 'mobx-react-lite'

import { PATH } from '@/constants/path'
import type { LostDatum } from '@/modules/lost-page'
import { useStore } from '@/store'
import { Swiper } from '@taroify/core'
import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import styles from './index.module.css'

const SwiperView = () => {
  const { lostFoundStore } = useStore()
  return (
    <>
      {
        <Swiper className={styles['image-swiper']} lazyRender autoplay={4000}>
          <Swiper.Indicator className={styles['image-swiper-point']} />
          {lostFoundStore.radomSwiper.randomLostFound.map((item: LostDatum) => (
            <Swiper.Item
              key={item._id}
              onClick={() =>
                Taro.navigateTo({
                  url: `${PATH.DYNAMIC_DETAIL}?id=${item._id}&category=${
                    item.lostTime ? '失物' : '寻物'
                  }`,
                })
              }
            >
              <View className={styles['image-swiper-wrapper']}>
                <Image
                  className={styles['image-swiper-wrapper-image']}
                  src={item.cover}
                  mode="aspectFill"
                />
                <Text className={styles['image-swiper-wrapper-text']}>
                  {item.title}
                </Text>
              </View>
            </Swiper.Item>
          ))}
        </Swiper>
      }
    </>
  )
}

export default observer(SwiperView)
