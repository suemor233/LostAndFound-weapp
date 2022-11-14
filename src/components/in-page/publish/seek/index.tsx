
import { useSubmit } from '@/hooks/use-submit'
import { Notify } from '@taroify/core'
import { View } from '@tarojs/components'
import { useDidShow, useRouter } from '@tarojs/taro'
import { useMemo, useRef, useState } from 'react'

import LostSeekForm from '../lost-seek-form'
import { foundById, IFound } from '../../../../api/modules/found';

const SeekForm = () => {
  const router = useRouter()
  const _defaultData = useRef<IFound | null>(null)
  const { disabled, notify, onSubmit } = useSubmit('found',router.params.id)
  const [defaultData, setDefaultData] = useState<IFound | null>(null)
  useDidShow(async () => {
    if (router.params.id) {
      const _data = await foundById(router.params.id as string)
      setDefaultData(_data)
      _defaultData.current = _data
    }
  })
  const form = useMemo(
    () => (
      <LostSeekForm
      titlePlaceholder="例: 捡到 xx"
      timeLabel="捡到日期"
      otherLabel="捡到地点 / 领取地点 / 外观 / 特征 等"
      onSubmit={(event) => onSubmit(event,_defaultData.current)}
      formName="foundTime"
      disabled={disabled}
      defaultData={defaultData}
    />
    ),
    [defaultData],
  )
  return (
    <View className="mt-5">
      {router.params.id ? defaultData && form : form}
      <Notify color="warning" open={notify} duration={0}>
        图片正在上传请耐心等待
      </Notify>
    </View>
  )
}

export default SeekForm
