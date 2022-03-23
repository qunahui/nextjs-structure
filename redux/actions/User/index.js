import * as actionTypes from '../../types'

// Save Account
export const saveAccountAction = (payload, actionSuccess, actionFailure) => ({
  type: actionTypes.SAVE_ACCOUNT_INFORMATION,
  payload,
  actionSuccess,
  actionFailure,
})
export const saveAccountSuccessAction = (payload) => ({
  type: actionTypes.SAVE_ACCOUNT_INFORMATION_SUCCESS,
  payload,
})
export const saveAccountFailureAction = () => ({
  type: actionTypes.SAVE_ACCOUNT_INFORMATION_FAILURE,
})

// Change Password
export const changePasswordAction = (payload, actionSuccess, actionFailure) => ({
  type: actionTypes.CHANGE_PASSWORD,
  payload,
  actionSuccess,
  actionFailure,
})
export const changePasswordSuccessAction = (payload) => ({
  type: actionTypes.CHANGE_PASSWORD_SUCCESS,
  payload,
})
export const changePasswordFailureAction = () => ({
  type: actionTypes.CHANGE_PASSWORD_FAILURE,
})
