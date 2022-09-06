import Choice from '@/components/universal/Icon/Choice'
import { Cell } from '@taroify/core'
import List from '@taroify/core/list/list'
import { Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

import styles from './index.module.css'

const UserList = () => {
  const handleShowModal = () => {
    Taro.showModal({
      title: '更新日志',
      content: '暂无更新日志',
      showCancel:false
    })
  }
  return (
    <List className={'mt-5 rounded-2xl shadow-md bg-white'}>
      {list.map((item) => (
        <Cell key={item.title} rightIcon={<Choice />} open-type="feedback">
          <Button
            open-type={item.openType}
            className={styles.button}
            onClick={
              item.title === '更新日志' ? () => handleShowModal() : undefined
            }
          >
            <Text>{item.title}</Text>
          </Button>
        </Cell>
      ))}
    </List>
  )
}

const list = [
  {
    title: '更新日志',
    openType: null,
  },
  {
    title: '关于',
    openType: null,
  },
  {
    title: '意见反馈',
    openType: 'feedback',
  },
  {
    title: '联系客服',
    openType: 'contact',
  },
]
export default UserList
