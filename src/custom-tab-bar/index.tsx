import { observer } from 'mobx-react-lite'

import { useStore } from '@/store'
import { CoverImage, CoverView } from '@tarojs/components'
import Taro from '@tarojs/taro'

import styles from './index.module.css'

const CustomTabBar = () => {
  const { tabStore } = useStore()
  const {
    tabData: { list, selected, color, selectedColor },
  } = tabStore
  const switchTab = (id, url) => {
    tabStore.updateTab(id)
    Taro.switchTab({ url })
  }

  return (
    <CoverView className={styles['tab-bar']}>
      {list.map((item, index) => {
        return (
          <CoverView
            key={index}
            className={styles['tab-bar-item']}
            onClick={() => switchTab(index, item.pagePath)}
          >
            <CoverImage
              src={selected === index ? item.selectedIconPath : item.iconPath}
            />
            <CoverView
              style={{ color: selected === index ? selectedColor : color }}
            >
              {item.text}
            </CoverView>
          </CoverView>
        )
      })}
    </CoverView>
  )
}

export default observer(CustomTabBar)
