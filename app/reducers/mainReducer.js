import actionTypes from 'ACTION_TYPES'
import {cloneDeep} from 'lodash'


let _designDefault = {
    filter: {
      year: 2017//(new Date()).getFullYear()
    }
  },
  cloneState;

export default (state = _designDefault, action) => {
  switch (action.type) {
    case actionTypes.START_APP:
      cloneState = cloneDeep(state);
      cloneState = {
        ...cloneState,
        ...action.defaultProps
      }
      return cloneState;
      break;
    case actionTypes.UPDATE_STATE_DATA:
      cloneState = cloneDeep(state);
      cloneState = {
        ...cloneState,
        ...action.updateData
      }
      return cloneState;
      break;
  }
  return state;
}
