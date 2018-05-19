import {applyMiddleware, createStore} from 'redux'
import reducer from './../reducers/view'

const store = createStore(reducer)
store.close = () => store.dispatch(END)
export default store;
