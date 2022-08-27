import './assets/styles/main.css'
import 'windi.css'
import {  Notify } from "@taroify/core"

import { RootStoreProvider } from './context/root-store'

const App = (props) => {
  return (
    <RootStoreProvider>
      {props.children}
    </RootStoreProvider>
  )
}

export default App
