import type { FC } from 'react';
import { useRef, useState  } from 'react'

import Choice from '@/components/universal/Choice'
import { Form, Input, Picker, Popup } from '@taroify/core'
import type { FormItemInstance } from '@taroify/core/form'

interface IProps {
  list: string[]
  formName: string
  title?:string
  placeholder?:string
}

const CategoryPicker: FC<IProps> = ({ list, formName,placeholder,title }) => {
  const itemRef = useRef<FormItemInstance>()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Form.Item ref={itemRef} name={formName} clickable rightIcon={<Choice />}>
        <Form.Label>{title}</Form.Label>
        <Form.Control>
          <Input
            readonly
            placeholder={placeholder}
            onClick={() => setOpen(true)}
          />
        </Form.Control>
      </Form.Item>
      <Popup
        mountOnEnter={false}
        open={open}
        rounded
        placement="bottom"
        onClose={setOpen}
      >
        <Picker
          onCancel={() => setOpen(false)}
          onConfirm={(newValue) => {
            itemRef.current?.setValue(newValue)
            setOpen(false)
          }}
        >
          <Picker.Toolbar>
            <Picker.Button>取消</Picker.Button>
            <Picker.Button>确认</Picker.Button>
          </Picker.Toolbar>
          <Picker.Column>
            {list.map((item) => (
              <Picker.Option key={item}>{item}</Picker.Option>
            ))}
          </Picker.Column>
        </Picker>
      </Popup>
    </>
  )
}

export default CategoryPicker
