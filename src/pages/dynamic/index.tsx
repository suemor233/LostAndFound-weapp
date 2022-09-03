import SearchBar from '@/components/in-page/dynamic/search'
import ContentLayout from '@/components/layouts/BasicLayout'
import { View } from '@tarojs/components'

import SwiperView from '../../components/in-page/dynamic/swiper-view'
import TagsListView from '@/components/in-page/dynamic/tags-list-view';
import { useDidShow } from '@tarojs/taro';
import Taro from '@tarojs/taro';

const Dynamic = () => {



  return (
    <ContentLayout>
      <SearchBar />
      <View className='m-1'>
        <SwiperView />
        <TagsListView/>
      </View>
    </ContentLayout>
  )
}

export default Dynamic
