import { useCallback, useState } from 'react'

import type { ILost } from '@/api/modules/lost'
import { createLost } from '@/api/modules/lost'
import { PATH } from '@/constants/path'
import { getToken } from '@/utils'
import { Notify, Toast } from '@taroify/core'
import type { BaseEventOrig, FormProps } from '@tarojs/components'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import LostSeekForm from '../lost-seek-form'

const LostForm = () => {
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState(false)
  const onSubmit = useCallback(
    async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
      const value = event.detail.value as ILost
      setDisabled(true)
      const { id } = await createLost(value)
      value.image.forEach(async (item, index) => {
        setOpen(true)
        setTimeout(
          () => {
            Taro.uploadFile({
              url: `${process.env.API_URL}/lost/upload`,
              filePath: item.url,
              name: 'file',
              formData: {
                id,
                cover: item.cover ? 1 : 0,
              },
              success: () => {
                if (index === value.image.length - 1) {
                  setOpen(false)
                  Toast.success({
                    message: '图片上传成功,将为您跳转到首页',
                    onClose: () => {
                      Taro.switchTab({
                        url: PATH.DYNAMIC,
                      })
                    },
                    duration: 1500,
                  })
                }
              },
              header: {
                Authorization: `Bearer ${getToken()}`,
              },
            })
          },
          index == 0 ? 0 : 500,
        )
      })
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
          <Notify color="warning" open={open} duration={0}>
        图片正在上传请耐心等待
      </Notify>
    </View>
  )
}

export default LostForm
