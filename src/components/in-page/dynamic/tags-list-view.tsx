import { useCallback, useState } from 'react'

import { lostFoundList } from '@/api/modules/aggregate'
import { FoundDatum, LostDatum, lostFoundType } from '@/modules/lost-page'
import { Grid, Image, List, Loading } from '@taroify/core'
import { Button, Text, View } from '@tarojs/components'
import { usePageScroll } from '@tarojs/taro'

import styles from './index.module.css'

const TagsListView = () => {
  return (
    <View className="mt-3">
      <TagsView />
      <View className="mt-3">
        <ListView />
      </View>
    </View>
  )
}

type tabsType = Array<[string, boolean]>

const TagsView = () => {
  const [tabs, setTabs] = useState<tabsType>([
    ['全部', true],
    ['最新发布', false],
    ['只看失物', false],
    ['只看寻物', false],
  ])

  const handleSelecated = useCallback(
    (e: React.MouseEvent, tab: [string, boolean]) => {
      setTabs(
        tabs.map((item) => {
          if (item[0] === tab[0]) {
            return [item[0], true]
          }
          return [item[0], false]
        }),
      )
    },
    [tabs],
  )

  return (
    <View className="fx gap-2">
      {tabs.map((key) => {
        return (
          <Button
            onClick={(e: any) => handleSelecated(e, key)}
            className={`${styles.tagsButton} ${key[1] ? styles.selected : ''}`}
            key={key[0]}
          >
            {key[0]}
          </Button>
        )
      })}
    </View>
  )
}

const ListView = () => {
  const [hasMore, setHasMore] = useState(true)
  const [lost, setLost] = useState<LostDatum[]>([])
  const [found, setFound] = useState<FoundDatum[]>([])
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [pageCurrent, setPageCurrent] = useState(1)
  usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

  const onLoad = async () => {
    setLoading(true)

    const res = (await lostFoundList({
      pageCurrent,
      pageSize: 10,
    })) as lostFoundType

    setLost((current) => [...current, ...res.lostFound[0].lostData])
    setFound((current) => [...current, ...res.lostFound[1].foundData])
    setPageCurrent((current) => current + 1)
    setHasMore(!!res.totalCount)
    setLoading(false)

    console.log(lost,found);

    // setTimeout(() => {
    //   for (let i = 0; i < 10; i++) {
    //     const text = list.length + 1
    //     list.push(text < 10 ? `0${text}` : String(text))
    //   }
    //   setList([...list])
    //
    //
    // }, 1000)
  }
  return (
    <List
      loading={loading}
      hasMore={hasMore}
      scrollTop={scrollTop}
      onLoad={onLoad}
    >
      <Grid columns={2} bordered={false}>
        {lost.map((item) => (
          <Grid.Item key={item.id}>
            <ListItem />
          </Grid.Item>
        ))}

        {found.map((item) => (
          <Grid.Item key={item.id}>
            <ListItem />
          </Grid.Item>
        ))}
      </Grid>
      <List.Placeholder>
        {loading && <Loading>加载中...</Loading>}
        {!hasMore && '没有更多了'}
      </List.Placeholder>
    </List>
  )
}

const ListItem = () => {
  return <Text className="h-24">我是每一项</Text>
}

export default TagsListView
