import TabStore from "./tab";
import UserStore from "./user";

export interface RootStore {
  tabStore:TabStore,
  userStore:UserStore
}
export class RootStore {
  constructor() {
    this.tabStore = new TabStore(),
    this.userStore = new UserStore()
  }
}
