import { combineReducers } from 'redux'
import * as actionTypes from '../types'
import layout from './Layout'
import user from './User'

const appReducer = combineReducers({
  user,
  layout,
})

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT) {
    localStorage.removeItem('persist:root')
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer
