import { makeAutoObservable } from 'mobx'

import { lostFoundListByUrl } from '@/api/modules/aggregate'
import type { FoundDatum, LostDatum } from '@/modules/lost-page'

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
    }))

    if (res) {
      if (res.lostFound) {
        this.lost.push(...res.lostFound[0].lostData)
        this.found.push(...res.lostFound[1].foundData)
      } else if (res.lostData) {
        this.lost.push(...res.lostData)
      } else if (res.foundData) {
        this.found.push(...res.foundData)
      }
    }
    this.hasMore = !!res.totalCount
    this.pageCurrent++
    if (this.lost.length > 0 && this.found.length > 0) {
      this.radomSwiper.radomFlag &&
        this.randomLostFoundList(
          this.lost.length < 2 || this.lost.length < 2 ? 2 : 4,
        )

      this.radomSwiper.radomFlag = false
    }
  }

  async randomLostFoundList(num: number) {
    const _num = num / 2
    const resultLost = [] as LostDatum[]
    const resultFound = [] as FoundDatum[]
    const lost = JSON.parse(JSON.stringify(this.lost))
    const found = JSON.parse(JSON.stringify(this.found))
    let lostCount = this.lost.length
    let foundCount = this.found.length

    for (let i = 0; i < _num; i++) {
      const index = ~~(Math.random() * lostCount) + i
      resultLost[i] = lost[index]
      lost[index] = lost[i]
      lostCount--
    }

    for (let i = 0; i < _num; i++) {
      const index = ~~(Math.random() * foundCount) + i
      resultFound[i] = found[index]
      found[index] = found[i]
      foundCount--
    }

    this.radomSwiper.randomLostFound = [
      ...resultLost.filter((res) => res?.cover != ''),
      ...resultFound.filter((res) => res?.cover != ''),
    ]
  }

  async reset() {
    this.lost = []
    this.found = []
    this.pageCurrent = 1
    this.hasMore = true
  }
}
