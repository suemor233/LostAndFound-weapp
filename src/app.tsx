import './assets/styles/main.css'
import 'windi.css'

import { RootStoreProvider } from './context/root-store'
import { useEffect } from 'react';

const App = (props) => {

  return (
    <RootStoreProvider>
      {props.children}
    </RootStoreProvider>
  )
}

export default App
