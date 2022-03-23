import * as actionTypes from '../../types'

const DEFAULT_STATE = {
  loading: false,
  username: '',
  password: '',
  remember: false,
  isLogout: false,
}

const LoginReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.LOGIN_FAILURE:
      return { ...state, loading: false }
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.SET_ACCOUNT:
      return {
        ...state,
        username: payload.remember ? payload.username : '',
        password: payload.remember ? payload.password : '',
        remember: payload.remember,
      }
    case actionTypes.APP_INIT:
      return {
        ...state,
        token: null,
        loading: false,
      }
    default:
      return state
  }
}

export default LoginReducer
