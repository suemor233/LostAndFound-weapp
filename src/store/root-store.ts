import TabStore from "./tab";

export interface RootStore {
  tabStore:TabStore
}
export class RootStore {
  constructor() {
    this.tabStore = new TabStore()
  }
}
