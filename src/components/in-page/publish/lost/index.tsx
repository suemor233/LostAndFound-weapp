import { useCallback } from 'react'

import { ILost, createLost } from '@/api/modules/lost'
import { PATH } from '@/constants/path'
import { Toast as myToast } from '@/utils/toast'
import { Toast } from '@taroify/core'
import { BaseEventOrig, FormProps, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import LostSeekForm from '../lost-seek-form'

const LostForm = () => {
  const onSubmit = useCallback(
    async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
      const value = event.detail.value as ILost
      const _notNull =
        Object.keys(value).filter((v) => value[v]).length ===
        Object.keys(value).length
      if (_notNull) {
        const res = await createLost(value)
        if (res) {
          Toast.success({
            message: '创建成功,正在为您跳转到首页',
            onClose: () => {
              Taro.switchTab({
                url: PATH.DYNAMIC,
              })
            },
            duration: 1500,
          })
        } else {
          Toast.fail('创建失败')
        }
      } else {
        myToast.success('填写内容的不能为空')
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
        formName='lostTime'
      />
    </View>
  )
}

export default LostForm
