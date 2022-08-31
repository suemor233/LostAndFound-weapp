import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react'

import type { FoundDatum, LostDatum } from '@/modules/lost-page'
import { useStore } from '@/store'
import { Image, List, Loading, Sticky, Tag } from '@taroify/core'
import { Button, Text, View } from '@tarojs/components'
import Taro, {
  useDidShow,
  usePageScroll,
  usePullDownRefresh,
} from '@tarojs/taro'

import styles from './index.module.css'

const TagsListView = () => {
  const [selectedTab, setSelectedTab] = useState('list')
  const [fixed, setFix] = useState(false)
  return (
    <View>
      <Sticky offsetTop="50" onChange={(fix) => setFix(fix)}>
        <TagsView onChangeTab={(tab) => setSelectedTab(tab)} fixed={fixed} />
      </Sticky>
      <View>
        <ListView selectedTab={selectedTab} />
      </View>
    </View>
  )
}

type tabsType = Array<[string, string, boolean]>

const TagsView: FC<{ onChangeTab?: (name: string) => void; fixed: boolean }> = (
  props,
) => {
  const [tabs, setTabs] = useState<tabsType>([
    ['猜你想要', 'list', true],
    ['最新发布', 'last', false],
    ['只看失物', 'lost', false],
    ['只看寻物', 'found', false],
  ])
  const handleSelecated = useCallback(
    (e: React.MouseEvent, tab: [string, string, boolean]) => {
      setTabs(
        tabs.map((item) => {
          if (item[0] === tab[0]) {
            return [item[0], item[1], true]
          }
          return [item[0], item[1], false]
        }),
      )
      props.onChangeTab?.(tab[1])
    },
    [tabs],
  )

  return (
    <View
      className={`fx gap-2 justify-center ${
        props.fixed && 'bg-white'
      } py-2 px-1`}
    >
      {tabs.map((key) => {
        return (
          <Button
            onClick={(e: any) => handleSelecated(e, key)}
            className={`${styles.tagsButton} ${key[2] ? styles.selected : ''}`}
            key={key[0]}
          >
            {key[0]}
          </Button>
        )
      })}
    </View>
  )
}

const ListView: FC<{ selectedTab: string }> = observer((props) => {
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const firstUpdate = useRef(true)
  const { lostFoundStore } = useStore()
  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
  })
  usePullDownRefresh(async () => {
    lostFoundStore.reset()
    await onLoad()
    Taro.stopPullDownRefresh()
  })

  useDidShow(() => {
    lostFoundStore.reset()
    onLoad()
  })

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    } else {
      lostFoundStore.reset()
      onLoad()
    }
  }, [props.selectedTab])

  const onLoad = async () => {
    setLoading(true)
    await lostFoundStore.getLostFoundList(props.selectedTab)
    setLoading(false)
  }
  return (
    <List
      loading={loading}
      hasMore={lostFoundStore.hasMore}
      scrollTop={scrollTop}
      onLoad={onLoad}
    >
      <View className={styles['grid-masonry']}>
        {lostFoundStore.lost.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}

        {lostFoundStore.found.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </View>
      <List.Placeholder>
        {loading && <Loading>加载中...</Loading>}
        {!lostFoundStore.hasMore && '没有更多了'}
      </List.Placeholder>
    </List>
  )
})

const ListItem: FC<{ item: LostDatum | FoundDatum }> = memo((props) => {
  const { item } = props
  return (
    <View className="w-full rounded-md bg-white shadow-md  whitespace-nowrap">
      <Image
        src={item.image[0] || 'https://y.suemor.com/imagesstudent-card.jpg'}
        style={{ width: '100%', height: '200px' }}
        mode="aspectFill"
        className="rounded-t-md"
        placeholder="加载中..."
      />
      <View className="p-2 fx">
        <Tag
          color="info"
          shape="rounded"
          style={{ borderRadius: '10%', padding: '3px' }}
        >
          {item.category}
        </Tag>
        <Text className="text-base ml-2 overflow-ellipsis overflow-hidden ">
          {item.title}
        </Text>
      </View>
    </View>
  )
})

export default TagsListView
