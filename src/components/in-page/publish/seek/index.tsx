
import { useSubmit } from '@/hooks/use-submit'
import { Notify } from '@taroify/core'
import { View } from '@tarojs/components'

import LostSeekForm from '../lost-seek-form'

const SeekForm = () => {
  const { disabled, notify, onSubmit } = useSubmit('found')

  return (
    <View className="mt-5">
      <LostSeekForm
        titlePlaceholder="例: 捡到 xx"
        timeLabel="捡到日期"
        otherLabel="捡到地点 / 领取地点 / 外观 / 特征 等"
        onSubmit={(event) => onSubmit(event)}
        formName="foundTime"
        disabled={disabled}
      />
      <Notify color="warning" open={notify} duration={0}>
        图片正在上传请耐心等待
      </Notify>
    </View>
  )
}

export default SeekForm
