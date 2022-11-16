import type { FC } from 'react'

import { PATH } from '@/constants/path'
import type { FoundDatum, LostDatum } from '@/modules/lost-page'
import type { searchType } from '@/pages/dynamic/search'
import { parseDate } from '@/utils'
import { Image, Tag } from '@taroify/core'
import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

export const SearchList: FC<{ search: searchType }> = ({ search }) => {
  return (
    <View>
      {search[0].map((item) => (
        <SearchItem {...item} key={item._id} type="失物" />
      ))}
      {search[1].map((item) => (
        <SearchItem {...item} key={item._id} type="寻物" />
      ))}
    </View>
  )
}

const SearchItem: FC<(LostDatum | FoundDatum) & { type: '失物' | '寻物' }> = ({
  cover,
  title,
  category,
  created,
  type,
  _id,
}) => {
  return (
    <View
      className="mt-2 fx gap-2 p-2 shadow-md bg-white"
      onClick={() =>
        Taro.navigateTo({
          url: `${PATH.DYNAMIC_DETAIL}?id=${_id}&category=${type}`,
        })
      }
    >
      <Image
        src={cover}
        style={{ width: '250px', height: '90px' }}
        mode="aspectFill"
        placeholder={!cover && '暂无图片'}
      />

      <View className="fx flex-col justify-between w-full">
        <View className="fx gap-2 flex-wrap">
          <Text
            className="text-md overflow-hidden whitespace-nowrap text-ellipsis"
            style={{ maxWidth: '200px' }}
          >
            {title}
          </Text>
        </View>
        <Text className="text-sm text-gray-500">
          {parseDate(created, 'yyyy年M月d日 HH:mm:ss')}
        </Text>
        <View className="fx items-center gap-2">
          <Tag color="info" shape="rounded" size="large">
            {type}
          </Tag>

          <Tag color="info" shape="rounded" size="large">
            {category}
          </Tag>
        </View>
      </View>
    </View>
  )
}
