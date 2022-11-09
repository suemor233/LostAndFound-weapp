import type { FC, PropsWithChildren } from 'react'
import { useCallback } from 'react'

import ShareIcon from '@/components/universal/Icon/Share'
import type { FoundDatum, LostDatum } from '@/modules/lost-page'
import { useStore } from '@/store'
import { parseDate, relativeTimeFromNow } from '@/utils'
import { Button, Image, Tag } from '@taroify/core'
import { Text, View } from '@tarojs/components'
import Taro, { useShareAppMessage } from '@tarojs/taro'

import styles from './index.module.css'

export interface IProps<T> {
  isLost?: boolean
  dynamicDetail: T extends true ? LostDatum : FoundDatum
}

export const DynamicAvatar = <T extends boolean>(props: IProps<T>) => {
  const { dynamicDetail, isLost } = props
  useShareAppMessage((res) => {
    return {
      title: `${dynamicDetail.title}`,
    }
  })

  return (
    <View className="fx justify-between">
      <View className="fx">
        <Image
          src={dynamicDetail.user.avatarUrl}
          style={{ width: '45px', height: '45px' }}
          shape={'circle'}
        />
        <View className="fx flex-col ml-3 justify-around">
          <View className="fx gap-2">
            <Text>{dynamicDetail.user.nickName}</Text>
            <Tag
              style={{
                backgroundColor: '#EAF8FE',
                color: '#00AFFB',
                borderRadius: '20px',
                padding: '0 10px',
              }}
            >
              {isLost ? '失物' : '寻物'}
            </Tag>
          </View>
          <Text className="text-gray-400 text-xs">
            {relativeTimeFromNow(dynamicDetail.created)}
          </Text>
        </View>
      </View>
      <View className="fx items-center">
        <ShareButton>分享</ShareButton>
      </View>
    </View>
  )
}

export const DetailContent = <T extends boolean>(props: IProps<T>) => {
  const { dynamicDetail, isLost } = props

  return (
    <View className="fx flex-col gap-1 mt-5">
      <View>
        <Text className="text-xl">{dynamicDetail.title}</Text>
      </View>
      <View>
        <Text className="ltracking-widerine leading-loose text-base text-gray-600">
          {dynamicDetail.detail}
        </Text>
      </View>
    </View>
  )
}

export const OtherParameter = <T extends boolean>(props: IProps<T>) => {
  const { dynamicDetail, isLost } = props
  const { disableStore } = useStore()
  const list = [
    {
      title: '类型',
      value: dynamicDetail.category,
    },
    {
      title: isLost ? '丢失日期' : '捡到日期',
      value: isLost
        ? parseDate((dynamicDetail as LostDatum).lostTime)
        : parseDate((dynamicDetail as FoundDatum).foundTime),
    },
    !disableStore.disable()
      ? {
          title: '联系方式',
          value: dynamicDetail.contact,
        }
      : null,
  ]
  return (
    <View className="fx mt-5 px-10">
      {list.map((item, index) => (
        <View key={item?.title} className="fx w-full flex-1">
          <View className="fx flex-col text-xs gap-1 text-center">
            <Text className=" text-gray-400 ">{item?.title}</Text>
            <Text>{item?.value}</Text>
          </View>
          {index < list.length - 1 && (
            <View className="fx items-center" style={{ margin: '0 auto' }}>
              <View className={`${styles.divider} `} />
            </View>
          )}
        </View>
      ))}
    </View>
  )
}

const ShareButton: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Button
      style={{
        background: '#f2f0f0',
        color: '#000',
        borderRadius: '20px',
        padding: '0px 10px',
        height: '35px',
      }}
      openType="share"
    >
      <View className="mr-1">
        <ShareIcon />
      </View>
      {children}
    </Button>
  )
}

export const PictureDetail = <T extends boolean>(
  props: Omit<IProps<T>, 'isLost'>,
) => {
  const handlepreviewImage = useCallback((url: string) => {
    Taro.previewImage({
      current: url,
      urls: props.dynamicDetail.image,
    })
  }, [])
  return (
    <View className="grid grid-cols-2 mt-5 gap-1 rounded-md overflow-hidden">
      {props.dynamicDetail.image.map((item, index) => (
        <Image
          style={{ width: '100%', height: '200px' }}
          src={`${index === 0 ? props.dynamicDetail.cover : item}`}
          mode={'widthFix'}
          key={index}
          placeholder="正在玩命加载中..."
          className={`${
            index === 0 ||
            (props.dynamicDetail.image.length % 2 === 0 &&
              index === props.dynamicDetail.image.length - 1)
              ? 'col-span-2'
              : 'col-span-1'
          }`}
          onClick={() =>
            handlepreviewImage(index === 0 ? props.dynamicDetail.cover : item)
          }
        />
      ))}
    </View>
  )
}
