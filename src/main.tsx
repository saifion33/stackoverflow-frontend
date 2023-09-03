import Alert from './components/Alert/Alert.tsx'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store.ts'
import App from './App.tsx'
import React from 'react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <Alert />
      <App />
    </Provider>
  </React.StrictMode>,
)
