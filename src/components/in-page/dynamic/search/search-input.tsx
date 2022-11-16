import type { Dispatch, FC} from 'react';
import { memo } from 'react'

import { Button, Cell, Search, Sticky } from '@taroify/core'
import type { ITouchEvent } from '@tarojs/components'

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
        <Search
          placeholder="请输入搜索关键词"
          shape="round"
          focus={true}
          onChange={(e) => setinputValue(e.detail.value)}
        />
      </Cell>
    </Sticky>
  )
})
