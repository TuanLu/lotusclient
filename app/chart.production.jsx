import React from 'react'
import ReactDOM from 'react-dom'
import ReportPage from './components/ReportPage'
import {Provider} from 'react-redux'
import store from './store/configureStoreProduction'

const rootEl = document.getElementById('isd_chart')
ReactDOM.render(
  <Provider store={store}>
    <ReportPage/>
  </Provider>
  ,
  rootEl
);

