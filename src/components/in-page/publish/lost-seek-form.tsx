import type { FC, PropsWithChildren} from 'react';
import {  useRef, useState , useEffect } from 'react'

import type { ILost, ImageFile} from '@/api/modules/lost';
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

import type { IFound } from '../../../api/modules/found'
import { url } from '@/constants/url';

interface LostSeekFormProps {
  titlePlaceholder: string
  timeLabel: string
  otherLabel: string
  formName: string
  disabled: boolean
  onSubmit?: (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => void
  defaultData?: ILost | IFound | null
}

const LostSeekForm: FC<LostSeekFormProps> = (props) => {
  const {
    titlePlaceholder,
    timeLabel,
    formName,
    otherLabel,
    onSubmit,
    disabled,
    defaultData,
  } = props
  return (
    <Form onSubmit={onSubmit} >
      <Cell.Group inset>
        <Form.Item name="title" defaultValue={defaultData?.title}  >
          <Form.Label>标题</Form.Label>
          <Form.Control >
            <Input placeholder={titlePlaceholder} />
          </Form.Control>
        </Form.Item>

        <Form.Item name="contact" defaultValue={defaultData?.contact}>
          <Form.Label>联系方式</Form.Label>
          <Form.Control>
            <Input placeholder="例: qq: xxxxx"  />
          </Form.Control>
        </Form.Item>
        <CategoryForm
          title="分类"
          placeholder="请选择分类"
          list={category}
          formName="category"
          defaultValue={defaultData?.category}
        />
        <DatetimePickerForm
          title={timeLabel}
          placeholder="选择时间"
          formName={formName}
          // @ts-ignore
          defaultValue={defaultData?.lostTime || defaultData?.foundTime}
        />

        <Form.Item name="detail" defaultValue={defaultData?.detail}>
          <Form.Control>
            <Textarea
              style={{ height: '100px' }}
              placeholder={otherLabel}
            />
          </Form.Control>
        </Form.Item>
        <UploaderField defaultValue={defaultData?.image as any as string[]} />
      </Cell.Group>
      <View style={{ margin: '16px' }}>
        <Button
          shape="round"
          block
          style={{ backgroundColor: 'var(--primary)' }}
          formType="submit"
          disabled={disabled}
        >
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
  newValue?: (value: any) => void
  defaultValue?: string
}

export const CategoryForm: FC<IProps> = (props) => {
  const { list, formName, title, placeholder, defaultValue } = props
  const itemRef = useRef<FormItemInstance>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    itemRef.current?.setValue(defaultValue)
  }, [defaultValue])
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
          props.newValue?.(newValue[0])
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
  const [defaultValue, setDefaultValue] = useState<Date>(new Date())
  useEffect(() => {
    if (props.defaultValue) {
      setDefaultValue(new Date(props.defaultValue))
      itemRef.current?.setValue(new Date(props.defaultValue))
    }
  }, [props.defaultValue])
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
        value={defaultValue}
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

export const UploaderField: FC<{ defaultValue?: string[] }> = ({
  defaultValue,
}) => {
  const itemRef = useRef<FormItemInstance>()
  const [files, setFiles] = useState<ImageFile[]>([])
  useEffect(() => {
    if (defaultValue && files.length == 0) {
      itemRef.current?.setValue(
        defaultValue.map((item) => ({
          url: item,
        })),
      )
      setFiles(
        defaultValue.map((item) => ({
          url: item,
        })),
      )
    }
  }, [defaultValue])
  useEffect(() => {
    itemRef.current?.setValue(files.map((item,index) => ({url:item.url,cover:!index})))
  }, [files])
  const onUpload = () => {
    Taro.chooseImage({
      count: 5,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
    }).then(({ tempFiles }) => {
      setFiles([
        ...files,
        ...tempFiles.map((item, index) => ({
          url: item.path,
          type: item.type,
          name: item.originalFileObj?.name,
        })),
      ])


    })
  }

  return (
    <Form.Item ref={itemRef as any} name="image">
      <Form.Label>上传图片</Form.Label>
      <Form.Control>
        <Uploader
          value={files}
          multiple={true}
          maxFiles={5}
          onUpload={onUpload}
          onChange={setFiles as any}
        />
      </Form.Control>
    </Form.Item>
  )
}

export default LostSeekForm
