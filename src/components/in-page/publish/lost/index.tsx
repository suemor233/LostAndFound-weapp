import { useCallback, useState } from 'react'

import type { ILost } from '@/api/modules/lost'
import { createLost } from '@/api/modules/lost'
import { PATH } from '@/constants/path'
import { getToken } from '@/utils'
import { Toast } from '@taroify/core'
import type { BaseEventOrig, FormProps } from '@tarojs/components'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import LostSeekForm from '../lost-seek-form'

const LostForm = () => {
  const [disabled, setDisabled] = useState(false)
  const onSubmit = useCallback(
    async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
      const value = event.detail.value as ILost
      const { id } = await createLost(value)
      value.image.forEach((item) => {
        Taro.uploadFile({
          url: `${process.env.API_URL}/lost/upload`,
          filePath: item.url,
          name: 'file',
          formData: {
            id
          },
          header: {
            Authorization: `Bearer ${getToken()}`,
          }
        })
      })

      if (id) {
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
        titlePlaceholder="例: 寻求 xx"
        timeLabel="丢失日期"
        otherLabel="丢失地点 / 外观 / 特征 等"
        onSubmit={(event) => onSubmit(event)}
        formName="lostTime"
        disabled={disabled}
      />
    </View>
  )
}

export default LostForm
