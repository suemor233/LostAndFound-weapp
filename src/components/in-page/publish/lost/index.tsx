
import { Notify } from '@taroify/core'
import { View } from '@tarojs/components'

import { useSubmit } from '../../../../hooks/use-submit'
import LostSeekForm from '../lost-seek-form'

const LostForm = () => {
  const { disabled, notify, onSubmit } = useSubmit('lost')

  return (
    <View className="mt-5">
      <LostSeekForm
        titlePlaceholder="例: 寻求 xx"
        timeLabel="丢失日期"
        otherLabel="丢失地点 / 外观 / 特征 等"
        onSubmit={(event) => onSubmit(event)}
        formName="lostTime"
        disabled={disabled}
      />
      <Notify color="warning" open={notify} duration={0}>
        图片正在上传请耐心等待
      </Notify>
    </View>
  )
}

export default LostForm
