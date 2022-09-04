import Choice from '@/components/universal/Choice'
import { Cell } from '@taroify/core'
import List from '@taroify/core/list/list'
import { Button, Text } from '@tarojs/components'

import styles from './index.module.css'

const UserList = () => {
  return (
    <List className={'mt-5 rounded-2xl shadow-md bg-white'}>
      {list.map((item, index) => (
        <Cell key={item} rightIcon={<Choice />} open-type="feedback">
          {index >= list.length - 1 ? (
            <Button open-type="feedback" className={styles.button}>
              <Text>{item}</Text>
            </Button>
          ) : (
            <Button className={styles.button}>
              <Text>{item}</Text>
            </Button>
          )}
        </Cell>
      ))}
    </List>
  )
}

const list = ['我的防丢码', '更新日志', '关于', '意见反馈']

export default UserList
