import { useMemo, useState , useRef } from 'react'

import type { ILost} from '@/api/modules/lost';
import { lostById } from '@/api/modules/lost'
import { Notify } from '@taroify/core'
import { View } from '@tarojs/components'
import { useDidShow, useRouter } from '@tarojs/taro'

import { useSubmit } from '../../../../hooks/use-submit'
import LostSeekForm from '../lost-seek-form'


const LostForm = () => {
  const router = useRouter()

  const _defaultData = useRef<ILost | null>(null)
  const { disabled, notify, onSubmit } = useSubmit('lost',router.params.id)

  const [defaultData, setDefaultData] = useState<ILost | null>(null)
  useDidShow(async () => {
    if (router.params.id) {
      const _data = await lostById(router.params.id as string)
      setDefaultData(_data)
      _defaultData.current = _data
    }
  })
  const form = useMemo(
    () => (
      <LostSeekForm
        titlePlaceholder="例: 丢失 xx"
        timeLabel="丢失日期"
        otherLabel="丢失地点 / 外观 / 特征 等"
        onSubmit={(event) => onSubmit(event,_defaultData.current)}
        place="丢失地点"
        formName="lostTime"
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

export default LostForm
