import type { CSSProperties, FC, PropsWithChildren } from 'react'

import { Button as TButton } from '@taroify/core'
import type { ButtonColor } from '@taroify/core/button'
import type { ButtonProps } from '@tarojs/components/types/Button'
import type { ITouchEvent } from '@tarojs/components/types/common'

interface IProps extends PropsWithChildren {
  type?: ButtonColor
  style?: CSSProperties
  onClick?: ((event: ITouchEvent) => void) | undefined
  openType?: ButtonProps.OpenType
}

export const Button: FC<IProps> = (props) => {
  const { openType,onClick,style } = props
  return (
    <TButton
      color={props.type}
      style={{ background: 'var(--yellow)', color: 'var(--button-gray)' ,...style}}
      shape={'round'}
      openType={openType}
      onClick={onClick}
    >
      {props.children}
    </TButton>
  )
}
