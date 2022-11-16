import type { FC } from 'react'
import { useCallback, useRef, useState } from 'react'

import { lostEnterBack, userLostList } from '@/api/modules/lost'
import type { LostDatum, LostFound } from '@/modules/lost-page'
import { parseDate } from '@/utils'
import { Image, List, Loading, Tag, Toast } from '@taroify/core'
import Button from '@taroify/core/button/button'
import { Text, View } from '@tarojs/components'
import Taro, { usePageScroll, usePullDownRefresh } from '@tarojs/taro'

let timeout
const LostMange = () => {
  const [value, setValue] = useState<LostDatum[]>([])
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [currentPage, setcurrentPage] = useState(1)
  const hasMore = useRef(true)

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
  })

  usePullDownRefresh(async () => {
    resetData()
    Taro.stopPullDownRefresh()
  })

  const resetData = useCallback(() => {
    setcurrentPage(1)
    setValue([])
    hasMore.current = true
  }, [])

  const onLoad = async () => {
    if (!timeout) {
      timeout = setTimeout(async () => {
        setLoading(true)
        await getData()
        setLoading(false)
        timeout = null
      }, 300)
    }
  }

  const getData = useCallback(async () => {
    const list = (await userLostList({
      pageCurrent: currentPage,
      pageSize: 10,
    })) as LostFound

    setcurrentPage((currentPage) => currentPage + 1)
    hasMore.current = !!list.lostData.length
    setValue([...value, ...list.lostData])
  }, [currentPage, value])

  return (
    <View className="h-full">
      <Toast id="toast" />
      <List
        loading={loading}
        hasMore={hasMore.current}
        scrollTop={scrollTop}
        onLoad={onLoad}
        className="h-full"
      >
        {value.map((item) => (
          <LostMangeItem {...item} key={item._id} resetData={resetData} />
        ))}
        <List.Placeholder>
          {loading && <Loading>加载中...</Loading>}
          {!hasMore.current && '没有更多了'}
        </List.Placeholder>
      </List>
    </View>
  )
}

const LostMangeItem: FC<LostDatum & { resetData: () => void }> = (props) => {
  const { title, created, category, _id, resetData, cover } = props

  const openDialog = useCallback(async () => {
    await lostEnterBack({ id: _id, state: 0 })
    resetData()
    Taro.showToast({
      title: '成功',
      icon: 'success',
    })
  }, [_id, resetData])
  return (
    <View className="mt-2 fx gap-2 p-3 shadow-md bg-white">
      <Image
        src={cover}
        style={{ width: '150px', height: '100px' }}
        mode="aspectFill"
        placeholder={!cover && '暂无图片'}
      />
      <View className="fx flex-col gap-1" style={{ maxWidth: '200px' }}>
        <View>
          <Text className="text-md overflow-hidden text-ellipsis whitespace-nowrap w-full inline-block">
            {title}
          </Text>
          <Tag color="info" shape="rounded" size="medium">
            {category}
          </Tag>
        </View>
        <Text className="text-sm text-gray-500">
          {parseDate(created, 'yyyy年M月d日 HH:mm:ss')}
        </Text>
        <View className="fx gap-2">
          <Button
            shape="round"
            color="warning"
            style={{ height: '30px', color: '#fff' }}
            onClick={() =>
              Taro.navigateTo({
                url: `/pages/publish/lost/index?id=${_id}`,
              })
            }
          >
            编辑
          </Button>
          <Button
            shape="round"
            style={{
              height: '30px',
              backgroundColor: '#FFC107',
              color: '#fff',
            }}
            onClick={openDialog}
          >
            确认找回
          </Button>
        </View>
      </View>
    </View>
  )
}
export default LostMange
