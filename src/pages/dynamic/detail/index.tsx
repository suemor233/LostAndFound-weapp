import { useState } from 'react'

import { foundById } from '@/api/modules/found'
import { lostById } from '@/api/modules/lost'
import {
  DetailContent,
  DynamicAvatar,
  OtherParameter,
  PictureDetail,
} from '@/components/in-page/dynamic/detail'
import ContentLayout from '@/components/layouts/BasicLayout'
import MySkeleton from '@/components/universal/Skeleton'
import type { FoundDatum, LostDatum } from '@/modules/lost-page'
import { Cell } from '@taroify/core'
import { getCurrentInstance, useLoad } from '@tarojs/taro'

interface routerParamsType {
  id?: string
  category?: string
}

const DynamicDetail = () => {
  const [dynamicDetail, setDynamicDetail] = useState<LostDatum | FoundDatum>()
  const [lost, setLost] = useState<boolean>()
  useLoad(async () => {
    const routerParams = getCurrentInstance().router?.params as routerParamsType
    let res
    if (routerParams.category === '失物') {
      res = await lostById(routerParams.id as string)
      setDynamicDetail(res)
      setLost(true)
    } else {
      res = await foundById(routerParams.id as string)
      setLost(false)
    }
    setDynamicDetail(res)
  })
  if (!dynamicDetail || lost === undefined) {
    return <MySkeleton />
  }
  return (
    <Cell >
      <ContentLayout>
        {<DynamicAvatar dynamicDetail={dynamicDetail} isLost={lost} />}
        {<DetailContent dynamicDetail={dynamicDetail} isLost={lost} />}
        {<OtherParameter dynamicDetail={dynamicDetail} isLost={lost} />}
        {<PictureDetail dynamicDetail={dynamicDetail} />}
      </ContentLayout>
    </Cell>
  )
}
export default DynamicDetail
