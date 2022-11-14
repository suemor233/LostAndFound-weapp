import { useCallback, useState } from 'react'

import { createFound, updateFound } from '@/api/modules/found'
import { ILost, updateLost } from '@/api/modules/lost'
import { createLost } from '@/api/modules/lost'
import { removePhotoFound, removePhotoLost } from '@/api/modules/upload'
import { PATH } from '@/constants/path'
import { getToken, setReFresh } from '@/utils'
import { Toast } from '@taroify/core'
import type { BaseEventOrig, FormProps } from '@tarojs/components'
import Taro from '@tarojs/taro'

import type { IFound } from '../api/modules/found'

export const useSubmit = (type: string, update: string | undefined) => {
  const [disabled, setDisabled] = useState(false)
  const [notify, setNotify] = useState(false)
  const onSubmit = useCallback(
    async (
      event: BaseEventOrig<FormProps.onSubmitEventDetail>,
      _defaultData: ILost | IFound | null | { image: string[] },
    ) => {
      const value = event.detail.value as ILost & IFound

      setDisabled(true)
      let res = {
        id: '',
      }
      if (update) {
        if (type === 'lost') {
          updateLost(value,update)
        } else if (type === 'found') {
          updateFound(value,update)
        }
        // 找 image 有 ，value.image 没有的
        _defaultData?.image.forEach((image) => {
          const diff = value.image.filter((item) => item.url == image)
          if (type === 'lost') {
            diff.length == 0 &&
              removePhotoLost({
                id: update,
                url: image,
              })
          } else if (type === 'found') {
            diff.length == 0 &&
              removePhotoFound({
                id: update,
                url: image,
              })
          }
        })
        if (!value.image.find((item) => item.url.includes('tmp'))) {
          Toast.success({
            message: '修改成功,将为您跳转到首页',
            onClose: () => {
              setReFresh(true)
              Taro.switchTab({
                url: PATH.DYNAMIC,
              })
            },
            duration: 1500,
          })
        }

        res.id = update
      } else {
        if (type === 'lost') {
          res = await createLost(value)
        } else if (type === 'found') {
          res = await createFound(value)
        }
      }

      if (value.image.length === 0) {
        return Toast.success({
          message: `${update ? '修改' : '创建'}成功,将为您跳转到首页`,
          onClose: () => {
            setReFresh(true)
            Taro.switchTab({
              url: PATH.DYNAMIC,
            })
          },
          duration: 1500,
        })
      }

      if (res) {
        setNotify(true)

        value.image.forEach(async (item, index) => {
          if (item.url.includes('tmp')) {
            setTimeout(
              () => {
                Taro.uploadFile({
                  url: `${process.env.API_URL}/${type}/upload`,
                  filePath: item.url,
                  name: 'file',
                  formData: {
                    id: res.id,
                    cover: item.cover ? 1 : 0,
                    update: update ? 1 : 0,
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
          }
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
