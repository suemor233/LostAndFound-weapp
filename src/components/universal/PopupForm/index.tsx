import type { FC, PropsWithChildren } from 'react'

import Choice from '@/components/universal/Icon/Choice'
import { Form, Input, Popup } from '@taroify/core'
import type { FormItemInstance } from '@taroify/core/form'

interface IProps extends PropsWithChildren {
  formName: string
  title?: string
  placeholder?: string
  open: boolean
  onChange: (opened: boolean) => void
  inputValue?: (opened: any) => string
  itemRef?: React.MutableRefObject<FormItemInstance | undefined>
}

const PopupForm: FC<IProps> = ({
  open,
  formName,
  placeholder,
  title,
  children,
  itemRef,
  inputValue,
  onChange,
}) => {
  return (
    <>
      <Form.Item ref={itemRef} name={formName} clickable rightIcon={<Choice />}>
        <Form.Label>{title}</Form.Label>
        <Form.Control>
          {inputValue ? (
            (controller) => (
              <Input
                value={inputValue?.(controller.value)}
                readonly
                placeholder={placeholder}
                onClick={() => onChange(true)}
              />
            )
          ) : (
            <Input
              readonly
              placeholder={placeholder}
              onClick={() => onChange(true)}
            />
          )}
        </Form.Control>
      </Form.Item>
      <Popup
        mountOnEnter={false}
        open={open}
        rounded
        placement="bottom"
        onClose={() => onChange(false)}
      >
        {children}
      </Popup>
    </>
  )
}

export default PopupForm
