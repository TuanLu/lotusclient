import React from 'react'
import ReactDOM from 'react-dom'
import MainComponent from './components/MainComponent'
import {Provider} from 'react-redux'
//This store will contain
import store from './store/configureStore'
import {startApp} from 'actions'
import {getDefaultAppProps} from 'ISD_API'
//import rootSaga from './sagas';
const rootEl = document.getElementById('isd_app')
let defaultProps = getDefaultAppProps();
store.dispatch(startApp(defaultProps));

ReactDOM.render(
  <Provider store={store}>
    <MainComponent/>
  </Provider>
  ,
  rootEl
);
