import { DependencyList, useEffect } from 'react'

import Taro from '@tarojs/taro'

export function useAsyncEffect(
  effect: () => Promise<any>,
  deps?: DependencyList,
) {
  useEffect(() => {
    effect()
  }, deps)
}

export const ToastClipboardData = (data: string, title = '链接已复制') => {
  Taro.setClipboardData({
    data,
    success: () => {
      Taro.showToast({
        title,
      })
    },
  })
}
