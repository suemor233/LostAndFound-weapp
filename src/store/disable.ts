import { makeAutoObservable } from 'mobx'
import { disableRelease } from '../api/modules/disable';

export default class DisableStore {
  disableRelease = false

  constructor() {
    makeAutoObservable(this)
    this.check()
  }

  async check() {
    const res = await disableRelease()
    this.disableRelease = res.disable_release
  }

  disable(){
    return this.disableRelease
  }
}
