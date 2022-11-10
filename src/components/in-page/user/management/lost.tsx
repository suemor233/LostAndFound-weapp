import type { FC } from 'react'
import { useCallback, useRef, useState } from 'react'

import { enterBack, lostList } from '@/api/modules/lost'
import type { LostDatum, LostFound } from '@/modules/lost-page'
import { parseDate } from '@/utils'
import { Dialog, Image, List, Loading, Tag, Toast } from '@taroify/core'
import Button from '@taroify/core/button/button'
import { openDialog } from '@taroify/core/dialog/dialog.imperative'
import { Text, View } from '@tarojs/components'
import Taro, { usePageScroll, usePullDownRefresh } from '@tarojs/taro'

let timeout
const LostMange: FC<{ value?: LostFound }> = () => {
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
    const list = (await lostList({
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
  const { title, created, category, _id, resetData } = props
  const [dialogOpen, setDialogOpen] = useState(false)

  const openDialog = useCallback(async () => {
    await enterBack({ id: _id })
    resetData()
    setDialogOpen(false)
    Toast.open({
      type: 'success',
      message: '成功',
    })
  }, [_id, resetData])
  return (
    <View className="mt-2 fx gap-2 p-3 shadow-md bg-white">
      <Image
        src="http://qiniu.suemor.com/1662424128116-tmp_c6c5c09437b6fbbbc65d91bafdf65f1c.jpg"
        style={{ width: '150px', height: '90px' }}
        mode="aspectFill"
      />
      <View className="fx flex-col justify-between">
        <View>
          <Text className="text-md">{title}</Text>
          <Tag
            color="info"
            shape="rounded"
            style={{ borderRadius: '10%', padding: '0px 5px' }}
            className="ml-2"
          >
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
            onClick={() => setDialogOpen(true)}
          >
            确认找回
          </Button>
        </View>
      </View>
      <Dialog open={dialogOpen} onClose={setDialogOpen}>
        <Dialog.Content>是否确认找回？</Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setDialogOpen(false)}>取消</Button>
          <Button onClick={openDialog}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}
export default LostMange
