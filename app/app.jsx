import React from 'react'
import ReactDOM from 'react-dom'
import MainComponent from './components/MainComponent'
import {Provider} from 'react-redux'
//This store will contain
import store from './store/configureStore'
import {startApp, updateStateData} from 'actions'
import {getDefaultAppProps} from 'ISD_API'
//import rootSaga from './sagas';
const rootEl = document.getElementById('isd_app')
//let defaultProps = getDefaultAppProps();
//store.dispatch(startApp(defaultProps));
//Loading data from server 
//let api = 'http://erpapp';
fetch('/')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    store.dispatch(updateStateData({
      orderData: json
    }));
    ReactDOM.render(
      <Provider store={store}>
        <MainComponent/>
      </Provider>
      ,
      rootEl
    );
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
ReactDOM.render(
  <Provider store={store}>
    <MainComponent/>
  </Provider>
  ,
  rootEl
);

