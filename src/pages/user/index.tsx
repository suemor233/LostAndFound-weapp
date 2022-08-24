import UserDetail from '@/components/in-page/user/user-detail';
import { Text, View } from '@tarojs/components'
import { observer } from 'mobx-react-lite';


const User = () => {

  return (
    <View className='center'>
      <UserDetail/>
    </View>
  )
}

export default observer(User)

