import type { CSSProperties, FC, PropsWithChildren } from 'react'

import { Button as TButton } from '@taroify/core'
import type { ButtonColor, ButtonShape } from '@taroify/core/button'
import type { ButtonProps } from '@tarojs/components/types/Button'
import type { ITouchEvent } from '@tarojs/components/types/common'

interface IProps extends PropsWithChildren {
  type?: ButtonColor
  style?: CSSProperties
  className?: string
  onClick?: ((event: ITouchEvent) => void) | undefined
  openType?: ButtonProps.OpenType
  shape?:ButtonShape
}

export const Button: FC<IProps> = (props) => {
  const { openType, onClick, style, className,shape='round' } = props
  return (
    <TButton
      color={props.type}
      style={{
        background: 'var(--yellow)',
        color: 'var(--button-gray)',
        ...style,
      }}
      shape={shape}
      openType={openType}
      onClick={onClick}
      className={className}
    >
      {props.children}
    </TButton>
  )
}
