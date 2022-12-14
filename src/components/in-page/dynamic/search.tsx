import { observer } from 'mobx-react-lite'
import type { FC } from 'react'

import { Button } from '@/components/universal/Button'
import { url } from '@/constants/url'
import { Avatar, Cell, Search, Sticky } from '@taroify/core'
import Taro from '@tarojs/taro'

import { useStore } from '../../../store/index'

const SearchBar = () => {
  const { userStore } = useStore()

  return (
    <Sticky>
      <Cell
        brief="align center"
        align="center"
        icon={<LeftAvatar src={userStore.user?.avatarUrl} />}
        rightIcon={<RightButton />}
        size="medium"
        style={{ padding: '2px', height: '50px' }}
      >
        <SearchItem />
      </Cell>
    </Sticky>
  )
}

const SearchItem = () => {
  return (
    <Search
      placeholder="请输入搜索关键词"
      shape="round"
      onClick={() =>
        Taro.navigateTo({
          url: '/pages/dynamic/search/index',
        })
      }
      disabled={true}
    />
  )
}

const RightButton = () => {
  return (
    <Button
      style={{ borderRadius: '15px', height: '35px' }}
      onClick={() =>
        Taro.navigateTo({
          url: '/pages/dynamic/search/index',
        })
      }
    >
      搜索
    </Button>
  )
}

const LeftAvatar: FC<{ src?: string }> = ({ src }) => {
  const { userStore } = useStore()
  return (
    <Avatar
      className="ml-2"
      src={src || url.defaultAvatar}
      size="medium"
      onClick={() => !userStore.isLogin() && userStore.getUserInfo()}
    />
  )
}

export default observer(SearchBar)
