import { useCallback, useState } from 'react'

import { PATH } from '@/constants/path'
import { getToken } from '@/utils'
import { Notify, Toast } from '@taroify/core'
import type { BaseEventOrig, FormProps } from '@tarojs/components'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import type { IFound } from '../../../../api/modules/found'
import { createFound } from '../../../../api/modules/found'
import LostSeekForm from '../lost-seek-form'

const SeekForm = () => {
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState(false)
  const onSubmit = useCallback(
    async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
      const value = event.detail.value as IFound
      setDisabled(true)
      const { id } = await createFound(value)
      value.image.forEach(async (item, index) => {
        setOpen(true)
        setTimeout(
          () => {
            Taro.uploadFile({
              url: `${process.env.API_URL}/found/upload`,
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
        titlePlaceholder="例: 捡到 xx"
        timeLabel="捡到日期"
        otherLabel="捡到地点 / 领取地点 / 外观 / 特征 等"
        onSubmit={(event) => onSubmit(event)}
        formName="foundTime"
        disabled={disabled}
      />
      <Notify color="warning" open={open} duration={0}>
        图片正在上传请耐心等待
      </Notify>
    </View>
  )
}

export default SeekForm
