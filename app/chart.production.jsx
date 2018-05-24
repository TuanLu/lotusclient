import React from 'react'
import ReactDOM from 'react-dom'
import ReportComponent from './components/ReportComponent'
import {Provider} from 'react-redux'
//This store will contain
import store from './store/configureStoreProduction'
import {startApp, updateStateData} from 'actions'
import {getDefaultAppProps} from 'ISD_API'
//import rootSaga from './sagas';
const rootEl = document.getElementById('isd_app')
ReactDOM.render(
  <Provider store={store}>
    <ReportComponent/>
  </Provider>
  ,
  rootEl
);

