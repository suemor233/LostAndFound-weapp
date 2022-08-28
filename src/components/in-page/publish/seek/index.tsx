import { BaseEventOrig, FormProps, View } from '@tarojs/components'
import { useCallback } from 'react'
import { Toast as myToast } from '@/utils/toast'
import LostSeekForm from '../lost-seek-form'
import { createFound, IFound } from '../../../../api/modules/found';
import { Toast } from '@taroify/core';
import Taro from '@tarojs/taro';
import { PATH } from '@/constants/path';

const SeekForm = () => {
  const onSubmit = useCallback(
    async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
      const value = event.detail.value as IFound
      const _notNull =
        Object.keys(value).filter((v) => value[v]).length ===
        Object.keys(value).length
      if (_notNull) {
        const res = await createFound(value)
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
        titlePlaceholder="例: 捡到 xx"
        timeLabel="捡到日期"
        otherLabel="捡到地点 / 领取地点 / 外观 / 特征 等"
        onSubmit={(event) => onSubmit(event)}
        formName='foundTime'
      />
    </View>
  )
}

export default SeekForm
