import { userNum } from '@/constants/icon'
import { Cell } from '@taroify/core'
import List from '@taroify/core/list/list'

const UserList = () => {
  return (
    <List className={'mt-5 rounded-2xl shadow-md bg-white'}>
      {userNum.map((item) => (
        <Cell key={item.name}>{item.num}</Cell>
      ))}
    </List>
  )
}

export default UserList
