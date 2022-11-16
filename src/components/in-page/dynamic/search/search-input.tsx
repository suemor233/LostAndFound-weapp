import type { Dispatch, FC } from 'react'
import { memo } from 'react'

import { Button, Cell, Image, Sticky } from '@taroify/core'
import type { ITouchEvent} from '@tarojs/components';
import { Input, View } from '@tarojs/components'

export const SearchInput: FC<{
  setinputValue: Dispatch<React.SetStateAction<string>>
  onClick?: ((event: ITouchEvent) => void) | undefined
}> = memo(({ setinputValue, onClick }) => {
  return (
    <Sticky>
      <Cell
        brief="align center"
        align="center"
        rightIcon={
          <Button
            style={{ borderRadius: '15px', height: '35px' }}
            onClick={onClick}
          >
            搜索
          </Button>
        }
        size="medium"
        style={{ padding: '2px', height: '50px' }}
      >
        <View className='bg-gray-100 p-2 rounded-3xl mx-2 fx items-center gap-2'>
          <Image src='https://y.suemor.com/imagessearch.png' style={{width:'20px',height:'20px'}}/>
          <Input
            placeholder="请输入搜索关键词"
            focus={true}
            onInput={(e) => setinputValue(e.detail.value)}
            confirmType="search"
            onConfirm={onClick}
            className='w-full'
          />
        </View>
      </Cell>
    </Sticky>
  )
})
