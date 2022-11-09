import client from "../request"

export function disableRelease() {
  return client.get('/disable/release')
}
