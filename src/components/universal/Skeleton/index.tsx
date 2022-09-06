import { Fragment } from 'react'

import { Skeleton, WhiteSpace } from '@taroify/core'
import { View } from '@tarojs/components'

const MySkeleton = () => {
  return (
    <View className="h-full">
      <Skeleton variant="circle" />
      {[...new Array(3)].map((item) => (
        <Fragment key={item}>
          <WhiteSpace />
          <Skeleton style={{ width: '40%' }} />
          <WhiteSpace size="20px" />
          <Skeleton />
          <WhiteSpace />
          <Skeleton />
          <WhiteSpace />
          <Skeleton style={{ width: '60%' }} />
        </Fragment>
      ))}
    </View>
  )
}

export default MySkeleton
