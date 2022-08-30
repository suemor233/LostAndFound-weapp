import { makeAutoObservable } from 'mobx'

import { lostFoundListByUrl } from '@/api/modules/aggregate'
import type { FoundDatum, LostDatum, lostFoundType } from '@/modules/lost-page'

export default class LostFoundStore {
  lost: LostDatum[] = []
  found: FoundDatum[] = []
  pageCurrent = 1
  hasMore = true
  constructor() {
    makeAutoObservable(this)
  }

  async getLostFoundList(url: string) {
    const res = (await lostFoundListByUrl(url, {
      pageCurrent: this.pageCurrent,
      pageSize: 10,
    })) as lostFoundType

    if (res) {
      this.lost.push(...res.lostFound[0].lostData)
      this.found.push(...res.lostFound[1].foundData)
    }

    this.hasMore = !!res.totalCount
    this.pageCurrent++
  }

  async reset () {
    this.lost = []
    this.found = []
    this.pageCurrent = 1
    this.hasMore = true
  }
}
