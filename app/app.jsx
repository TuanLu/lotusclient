import React from 'react'
import ReactDOM from 'react-dom'
import ManageDataPage from './components/ManageDataPage'
import {Provider} from 'react-redux'
//This store will contain
import store from './store/managePageConfigureStore'
import {startApp, updateStateData} from 'actions'
import {getDefaultAppProps} from 'ISD_API'
//import rootSaga from './sagas';
window.ISD_BASE_URL = 'http://erpapp/';
const rootEl = document.getElementById('isd_app')
ReactDOM.render(
  <Provider store={store}>
    <ManageDataPage/>
  </Provider>
  ,
  rootEl
);

