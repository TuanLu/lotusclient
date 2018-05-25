import React from 'react'
import ReactDOM from 'react-dom'
//import ReportComponent from './components/ReportComponent'
import ReportPage from './components/ReportPage'
import {Provider} from 'react-redux'
//This store will contain
import store from './store/configureStore'
import {startApp, updateStateData} from 'actions'
import {getDefaultAppProps} from 'ISD_API'
//import rootSaga from './sagas';
const rootEl = document.getElementById('isd_chart')
ReactDOM.render(
  <Provider store={store}>
    <ReportPage/>
  </Provider>
  ,
  rootEl
);

