import { Cell } from '@taroify/core'
import List from '@taroify/core/list/list'


const UserList = () => {
  return (
    <List className={'mt-5 rounded-2xl shadow-md bg-white'}>
      {list.map((item) => (
        <Cell key={item}>{item}</Cell>
      ))}
    </List>
  )
}

const list = ['我的防丢码','更新日志','关于']

export default UserList
