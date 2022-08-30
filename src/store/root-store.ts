import LostFoundStore from "./lost-found-list";
import TabStore from "./tab";
import UserStore from "./user";

export interface RootStore {
  tabStore:TabStore,
  userStore:UserStore
  lostFoundStore:LostFoundStore
}
export class RootStore {
  constructor() {
    this.tabStore = new TabStore(),
    this.userStore = new UserStore()
    this.lostFoundStore = new LostFoundStore()
  }
}
