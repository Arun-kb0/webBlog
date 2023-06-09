import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// redux
// import {store}  from './store';
// import { Provider } from 'react-redux';

// * new redux
import store from './features/redux/store'
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>
)

