import { Notify } from '@taroify/core'

const duration = 2000

export const Toast = {
  success: (msg: string) => {
    Notify.open({
      color: 'warning',
      message: msg,
      duration,
    })
  },
  error: (msg: string) => {
    Notify.open({
      color: 'danger',
      message: msg,
      duration,
    })
  },
}
