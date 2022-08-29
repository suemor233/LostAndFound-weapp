
import client from "../request"


export function aggregateInfo() {
  return client.get('/aggregate/stat')
}
