import { makeAutoObservable } from 'mobx'

import { lostFoundListByUrl } from '@/api/modules/aggregate'
import type { FoundDatum, LostDatum, lostFoundType } from '@/modules/lost-page'

export default class LostFoundStore {
  lost: LostDatum[] = []
  found: FoundDatum[] = []
  pageCurrent = 1
  hasMore = true

  radomSwiper = {
    randomLostFound: [] as (LostDatum | FoundDatum)[],
    radomFlag: true,
  }

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
    this.radomSwiper.radomFlag && this.randomLostFoundList(6)
    this.radomSwiper.radomFlag = false
  }

  async randomLostFoundList(num: number) {
    const _num = num / 2
    const resultLost = [] as LostDatum[]
    const resultFound = [] as FoundDatum[]

    let lostCount = this.lost.length
    let foundCount = this.found.length

    for (let i = 0; i < _num; i++) {
      const index = ~~(Math.random() * lostCount) + i
      resultLost[i] = this.lost[index]
      this.lost[index] = this.lost[i]
      lostCount--
    }

    for (let i = 0; i < _num; i++) {
      const index = ~~(Math.random() * foundCount) + i
      resultFound[i] = this.found[index]
      this.found[index] = this.found[i]
      foundCount--
    }
    this.radomSwiper.randomLostFound = [...resultLost, ...resultFound]
  }

  async reset() {
    this.lost = []
    this.found = []
    this.pageCurrent = 1
    this.hasMore = true
  }
}
