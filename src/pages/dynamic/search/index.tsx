import { useState } from 'react'

import { SearchInput } from '@/components/in-page/dynamic/search/search-input'
import { View } from '@tarojs/components'
import { SearchList } from '@/components/in-page/dynamic/search/search-list'
import { search } from '../../../api/modules/aggregate';
import type { LostDatum } from '@/modules/lost-page';
import type { FoundDatum } from '../../../modules/lost-page';

export type searchType = Array<Array<LostDatum | FoundDatum>>
const SearchPage = () => {
  const [inputValue, setinputValue] = useState("")
  const [result,setResult] = useState<searchType>([])
  const handleSearch = async()=>{
    const res = await search({
      search:inputValue
    })
    setResult(res.data)

  }

  return (
    <View>
      <SearchInput setinputValue={setinputValue} onClick={handleSearch}/>
      {
        result.length > 0 && <SearchList search={result}/>
      }
    </View>
  )
}
export default SearchPage
