import type { FC, PropsWithChildren } from 'react'
import { useRef, useState } from 'react'

import PopupForm from '@/components/universal/PopupForm'
import { category } from '@/constants/publish/lost/listData'
import {
  Button,
  Cell,
  DatetimePicker,
  Form,
  Input,
  Picker,
  Textarea,
  Uploader,
} from '@taroify/core'
import type { FormItemInstance } from '@taroify/core/form'
import type { BaseEventOrig, FormProps } from '@tarojs/components'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

interface LostSeekFormProps {
  titlePlaceholder: string
  timeLabel: string
  otherLabel: string
  formName:string
  onSubmit?:(event: BaseEventOrig<FormProps.onSubmitEventDetail>)=>void
}

const LostSeekForm: FC<LostSeekFormProps> = (props) => {
  const { titlePlaceholder, timeLabel,formName, otherLabel,onSubmit } = props

  return (
    <Form onSubmit={onSubmit}>
      <Cell.Group inset>
        <Form.Item name="title">
          <Form.Label>标题</Form.Label>
          <Form.Control>
            <Input placeholder={titlePlaceholder}/>
          </Form.Control>
        </Form.Item>

        <Form.Item name="contact">
          <Form.Label>联系方式</Form.Label>
          <Form.Control>
            <Input placeholder="例: qq: xxxxx" />
          </Form.Control>
        </Form.Item>
        <CategoryForm
          title="分类"
          placeholder="请选择分类"
          list={category}
          formName="category"
        />
        <DatetimePickerForm
          title={timeLabel}
          placeholder="选择时间"
          formName={formName}
        />

        <Form.Item name="detail">
          <Form.Control>
            <Textarea
              style={{ height: '100px' }}
              placeholder={otherLabel}
            />
          </Form.Control>
        </Form.Item>
        {/* <UploaderField /> */}
      </Cell.Group>
      <View style={{ margin: '16px' }}>
        <Button shape="round" block style={{'backgroundColor': 'var(--primary)'}} formType="submit">
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

export const CategoryForm: FC<IProps> = (props) => {
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
          itemRef.current?.setValue(newValue[0])
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

export const DatetimePickerForm: FC<Omit<IProps, 'list'>> = (props) => {
  const { formName, title, placeholder } = props
  const itemRef = useRef<FormItemInstance>()
  const [open, setOpen] = useState(false)

  const [minDate] = useState(new Date(2021, 9, 14))
  const [maxDate] = useState(new Date())
  const [defaultValue] = useState(new Date(2022, 8, 28))
  function formatDate(date?: Date) {
    if (date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
    return ''
  }

  return (
    <PopupForm
      open={open}
      formName={formName}
      title={title}
      placeholder={placeholder}
      onChange={(isOpen) => setOpen(isOpen)}
      itemRef={itemRef}
      inputValue={formatDate}
    >
      <DatetimePicker
        type="date"
        min={minDate}
        max={maxDate}
        defaultValue={defaultValue}
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
      </DatetimePicker>
    </PopupForm>
  )
}

export const UploaderField = () => {
  const itemRef = useRef<FormItemInstance>()

  const onUpload = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then(({ tempFiles }) => {
      itemRef.current?.setValue([
        ...(itemRef.current?.getValue()
          ? [...(itemRef.current?.getValue() as any)]
          : []),
        {
          url: tempFiles[0].path,
          type: tempFiles[0].type,
          name: tempFiles[0].originalFileObj?.name,
        },
      ])
    })
  }

  return (
    <Form.Item ref={itemRef as any} name="uploader">
      <Form.Label>上传图片</Form.Label>
      <Form.Control>
        <Uploader multiple={true} maxFiles={4} onUpload={onUpload} />
      </Form.Control>
    </Form.Item>
  )
}

export default LostSeekForm
