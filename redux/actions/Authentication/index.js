import * as actionTypes from '../../types'

// Sign Up
export const signUpAction = (payload, actionSuccess, actionFailure) => ({
  type: actionTypes.SIGN_UP,
  payload,
  actionSuccess,
  actionFailure,
})
export const signUpSuccessAction = (payload) => ({
  type: actionTypes.SIGN_UP_SUCCESS,
  payload,
})
export const signUpFailureAction = () => ({
  type: actionTypes.SIGN_UP_FAILURE,
})

// Login
export const loginAction = (payload, actionSuccess, actionFailure) => ({
  type: actionTypes.LOGIN,
  payload,
  actionSuccess,
  actionFailure,
})
export const loginSuccessAction = (payload) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload,
})
export const loginFailureAction = () => ({
  type: actionTypes.LOGIN_FAILURE,
})
export const setAccountAction = (payload) => ({
  type: actionTypes.SET_ACCOUNT,
  payload,
})
// Logout
export const logoutAction = () => ({
  type: actionTypes.LOGOUT,
})
export const logoutSuccessAction = () => ({
  type: actionTypes.LOGOUT_SUCCESS,
})
export const logoutFailureAction = () => ({
  type: actionTypes.LOGOUT_FAILURE,
})
// Whoami
export const getWhoamiAction = (actionSuccess) => ({
  type: actionTypes.GET_WHO_AM_I,
  actionSuccess,
})
export const getWhoamiSuccessAction = (payload) => ({
  type: actionTypes.GET_WHO_AM_I_SUCCESS,
  payload,
})
export const getWhoamiFailureAction = () => ({
  type: actionTypes.GET_WHO_AM_I_FAILURE,
})
