export interface userType {
  id: string
  openid: string
  avatarUrl: string
  nickName: string
  lost: {
    lostCount: number
    foundCount: number
  }
  found: {
    UnclaimedCount: number
    claimedCount: number
  }
}
