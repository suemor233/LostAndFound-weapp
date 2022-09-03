import { useCallback, useState } from 'react'

import { createFound } from '@/api/modules/found'
import { ILost, createLost } from '@/api/modules/lost'
import { PATH } from '@/constants/path'
import { getToken, setReFresh } from '@/utils'
import { Toast } from '@taroify/core'
import type { BaseEventOrig, FormProps } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { IFound } from '../api/modules/found'

interface IProps {
  type: string
}

export const useSubmit = (type: string) => {
  const [disabled, setDisabled] = useState(false)
  const [notify, setNotify] = useState(false)
  const onSubmit = useCallback(
    async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
      const value = event.detail.value as ILost & IFound
      setDisabled(true)
      let res
      if (type === 'lost') {
        res = await createLost(value)
      } else {
        res = await createFound(value)
      }
      if (res) {
        setNotify(true)
        value.image.forEach(async (item, index) => {
          setTimeout(
            () => {
              Taro.uploadFile({
                url: `${process.env.API_URL}/${type}/upload`,
                filePath: item.url,
                name: 'file',
                formData: {
                  id: res.id,
                  cover: item.cover ? 1 : 0,
                },
                success: () => {
                  if (index === value.image.length - 1) {
                    setNotify(false)
                    Toast.success({
                      message: '图片上传成功,将为您跳转到首页',
                      onClose: () => {
                        setReFresh(true)
                        Taro.switchTab({
                          url: PATH.DYNAMIC,
                        })
                      },
                      duration: 1500,
                    })
                  }
                },
                fail: (res) => {
                  setDisabled(false)
                  Toast.fail({
                    message: '图片上传失败',
                    duration: 1500,
                  })
                },
                header: {
                  Authorization: `Bearer ${getToken()}`,
                },
              })
            },
            index == 0 ? 0 : 500,
          )
        })
      } else {
        setDisabled(false)
        setNotify(false)
      }
    },
    [],
  )

  return {
    onSubmit,
    disabled,
    notify,
  }
}
