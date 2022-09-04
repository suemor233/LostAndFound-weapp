import { observer } from 'mobx-react-lite'

import { useStore } from '@/store'
import { View,Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
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
    <View className={'tab-bar'}>
      {list.map((item, index) => {
        return (
          <View
            key={index}
            className={`tab-bar-item ${item.bulge?'bulge':''}`}
            onClick={() => switchTab(index, item.pagePath)}
          >
            {item.bulge && <View className={'tab-bar-bulge tab-bar-view'}/>}
            <Image
              src={selected === index ? item.selectedIconPath : item.iconPath}
              className='image'
            />
            {item.text && (
              <View
                style={{ color: selected === index ? selectedColor : color }}
                className='tab-bar-view'
              >
                {item.text}
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}

export default observer(CustomTabBar)
