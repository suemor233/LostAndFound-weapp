import { useCallback, useState } from 'react'

import { PATH } from '@/constants/path'
import { Toast } from '@taroify/core'
import type { BaseEventOrig, FormProps } from '@tarojs/components'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import type { IFound } from '../../../../api/modules/found'
import { createFound } from '../../../../api/modules/found'
import LostSeekForm from '../lost-seek-form'

const SeekForm = () => {
  const [disabled, setDisabled] = useState(false)
  const onSubmit = useCallback(
    async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
      const value = event.detail.value as IFound

      const res = await createFound(value)
      if (res) {
        setDisabled(true)
        Toast.success({
          message: '创建成功,正在为您跳转到首页',
          onClose: () => {
            Taro.switchTab({
              url: PATH.DYNAMIC,
            })
          },
          duration: 1500,
        })
      } 
    },
    [],
  )

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
    </View>
  )
}

export default SeekForm
