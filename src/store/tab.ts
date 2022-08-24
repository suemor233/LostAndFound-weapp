import { makeAutoObservable } from 'mobx'

import { tabBar } from '@/constants/tabBar'

export default class TabStore {
  tabData = tabBar

  constructor() {
    makeAutoObservable(this)
  }

  async updateTab(id: number) {
    this.tabData.selected = id
  }
}
