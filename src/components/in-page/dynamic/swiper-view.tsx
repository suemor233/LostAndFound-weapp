import { Swiper } from '@taroify/core'
import { Image, Text, View } from '@tarojs/components'

import styles from './index.module.css'

const SwiperView = () => {
  const SwiperItem = [
    {
      title: 'xxx',
      url: 'https://suemor.oss-cn-beijing.aliyuncs.com/img/illust_54257893_20210819_092656.jpeg',
    },
    {
      title: 'xxx',
      url: 'https://y.suemor.com/imagesstudent-card.jpg',
    },
    {
      title: 'xxx',
      url: 'https://y.suemor.com/imagesstudent-card.jpg',
    },
  ]
  return (
      <Swiper className={styles['image-swiper']} lazyRender autoplay={4000}>
        <Swiper.Indicator className={styles['image-swiper-point']}/>
        {SwiperItem.map((item) => (
          <Swiper.Item key={item.url}>
            <View className={styles['image-swiper-wrapper']}>
              <Image className={styles['image-swiper-wrapper-image']} src={item.url} mode='aspectFill' />
              <Text className={styles['image-swiper-wrapper-text']}>在学校食堂里面丢失了胸卡</Text>
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
  )
}

export default SwiperView
