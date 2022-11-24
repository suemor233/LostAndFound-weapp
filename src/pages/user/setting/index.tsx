import fi from 'date-fns/esm/locale/fi/index'
import { observer } from 'mobx-react-lite'
import { useRef, useState } from 'react'
import { useEffect } from 'react'

import { patchUser } from '@/api/modules/user'
import LoginAuth from '@/components/layouts/BasicLayout/login-verify'
import { Avatar } from '@/components/universal/Avatar'
import { PATH } from '@/constants/path'
import { useStore } from '@/store'
import UserStore from '@/store/user'
import { getToken } from '@/utils'
import { Button, Cell, Form, Input, Toast } from '@taroify/core'
import { FormItemInstance } from '@taroify/core/form'
import { BaseEventOrig, FormProps, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import stlyes from './index.module.css'

const UserManagement = () => {
  const { userStore } = useStore()
  const avatarRef = useRef<FormItemInstance>()
  const [avatar, setAvatar] = useState('')
  useEffect(() => {
    avatarRef.current?.setValue(userStore.user?.avatarUrl)
    setAvatar(avatarRef.current?.getValue())
  }, [])

  return (
    <LoginAuth>
      <Toast id="toast" />
      <View className="mt-2">
        <Form onSubmit={(event) => onSubmit(event, userStore)}>
          <Cell.Group inset>
            <Form.Item
              name="avatar"
              className="fx items-center"
              defaultValue={userStore.user?.avatarUrl}
              ref={avatarRef}
            >
              <Form.Label>头像</Form.Label>
              <Form.Control>
                <Button
                  className={stlyes.button}
                  open-type="chooseAvatar"
                  onChooseAvatar={(e) => {
                    avatarRef.current?.setValue(e.detail.avatarUrl)
                    setAvatar(avatarRef.current?.getValue())
                  }}
                >
                  <Avatar imageUrl={avatar} size={40} />
                </Button>
              </Form.Control>
            </Form.Item>

            <Form.Item name="nickName" defaultValue={userStore.user?.nickName}>
              <Form.Label>昵称</Form.Label>
              <Form.Control>
                <Input placeholder="请输入昵称" />
              </Form.Control>
            </Form.Item>
          </Cell.Group>
          <View style={{ margin: '16px' }}>
            <Button
              shape="round"
              block
              style={{ backgroundColor: 'var(--primary)' }}
              formType="submit"
            >
              提交
            </Button>
          </View>
        </Form>
      </View>
    </LoginAuth>
  )
}

const onSubmit = async (
  event: BaseEventOrig<FormProps.onSubmitEventDetail>,
  userStore: UserStore,
) => {
  await patchUser({ nickName: event.detail.value?.nickName })

  if (!event.detail.value?.avatar.includes('tmp')) {
    return Toast.success({
      message: '修改成功',
      onClose: async () => {
        await userStore.userInfoByToken()
        Taro.switchTab({
          url: PATH.USER,
        })
      },
      duration: 1500,
    })
  }

  Taro.uploadFile({
    url: `${process.env.API_URL}/user/upload`,
    filePath: event.detail.value?.avatar,
    name: 'file',
    success: () => {
      Toast.success({
        message: '修改成功',
        onClose: async () => {
          await userStore.userInfoByToken()
          Taro.switchTab({
            url: PATH.USER,
          })
        },
        duration: 1500,
      })
    },
    fail: () => {
      Toast.fail({
        message: '服务器异常',
        duration: 1500,
      })
    },
    header: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export default observer(UserManagement)
