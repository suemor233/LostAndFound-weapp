
import PopupForm from '@/components/universal/PopupForm'
import { category } from '@/constants/publish/lost/category'
import { Button, Cell, Form, Input, Picker, Toast } from '@taroify/core'
import type { FormItemInstance } from '@taroify/core/form'
import type { BaseEventOrig, FormProps} from '@tarojs/components';
import { View } from '@tarojs/components'
import type { FC, PropsWithChildren} from 'react';
import { useRef, useState } from 'react'



const LostForm = () => {
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    console.log(JSON.stringify(event.detail.value),'====');
    Toast.open(JSON.stringify(event.detail.value))
  }

  return (
    <Form onSubmit={onSubmit}>
      <Cell.Group inset>
        <Form.Item
          name="title"
          rules={[{ required: true, message: '请填写标题' }]}
        >
          <Form.Label>标题</Form.Label>
          <Form.Control>
            <Input placeholder="例: 寻找 xx" />
          </Form.Control>
        </Form.Item>
        <CategoryForm title='分类' placeholder='请选择分类' list={category} formName='category'/>
      </Cell.Group>
      <View style={{ margin: "16px" }}>
        <Button shape="round" block color="primary" formType="submit">
          提交
        </Button>
      </View>
    </Form>
  )
}

interface IProps extends PropsWithChildren {
  list: string[]
  formName: string
  title?: string
  placeholder?: string
}

const CategoryForm: FC<IProps> = (props) => {
  const { list, formName, title, placeholder } = props
  const itemRef = useRef<FormItemInstance>()
  const [open, setOpen] = useState(false)
  return (
    <PopupForm
      open={open}
      formName={formName}
      title={title}
      placeholder={placeholder}
      onChange={(isOpen) => setOpen(isOpen)}
      itemRef={itemRef}
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
    </PopupForm>
  )
}


export default LostForm
