import { observer } from 'mobx-react-lite'

import { useStore } from '@/store'
import { Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './index.css'

import { useMemo } from 'react'

const CustomTabBar = () => {
  const { tabStore, disableStore } = useStore()
  const {
    tabData: { list, selected, color, selectedColor },
  } = tabStore
  const switchTab = (id, url) => {
    tabStore.updateTab(id)
    Taro.switchTab({ url })
  }

  return (
    <View className={'tab-bar'}>
      {list.map((item, index) => {
        return (
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useMemo(
            () => (item.bulge ? !disableStore.disableRelease : true),
            [],
          ) && (
            <View
              key={index}
              className={`tab-bar-item ${item.bulge ? 'bulge' : ''}`}
              onClick={() => switchTab(index, item.pagePath)}
            >
              {item.bulge && <View className={'tab-bar-bulge tab-bar-view'} />}
              <Image
                src={selected === index ? item.selectedIconPath : item.iconPath}
                className="image"
              />
              {item.text && (
                <View
                  style={{ color: selected === index ? selectedColor : color }}
                  className="tab-bar-view"
                >
                  {item.text}
                </View>
              )}
            </View>
          )
        )
      })}
    </View>
  )
}

export default observer(CustomTabBar)
