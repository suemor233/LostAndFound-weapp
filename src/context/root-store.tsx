import { configure } from 'mobx'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { RootStore } from '../store/root-store'

configure({
  useProxies: 'always',
})

let $store: RootStore
const StoreContext = createContext<RootStore | undefined>(undefined)
StoreContext.displayName = 'StoreContext'

export function useRootStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider')
  }

  return context
}
export const store = initializeStore()
export function RootStoreProvider({ children }: { children: ReactNode }) {

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

function initializeStore(): RootStore {
  const _store = $store ?? new RootStore()

  return _store
}
