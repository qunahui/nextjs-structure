import * as actionTypes from '../../types'

const DEFAULT_STATE = {
  loading: false,
  isGettingWhoami: false,
  isOldUser: false,
}

const UserReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: { ...payload },
        isOldUser: new Date(payload?.created_at) < new Date('2021-09-26T17:00:00.000Z'),
      }
    case actionTypes.APP_INIT:
    case actionTypes.GET_WHO_AM_I:
      return {
        ...state,
        isGettingWhoami: true,
      }
    case actionTypes.GET_WHO_AM_I_SUCCESS:
      return {
        ...state,
        ...payload,
        isGettingWhoami: false,
        isOldUser: new Date(payload?.created_at) < new Date('2021-09-26T17:00:00.000Z'),
      }
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        ...payload,
      }
    case actionTypes.GET_WHO_AM_I_FAILURE:
      return {
        ...state,
        isGettingWhoami: false,
      }
    case actionTypes.CREATE_PRODUCER_SUCCESS:
      return {
        ...state,
        ...{
          producer_id: payload?.id,
        },
      }
    case actionTypes.SAVE_ACCOUNT_INFORMATION:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.SAVE_ACCOUNT_INFORMATION_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
      }
    case actionTypes.SAVE_ACCOUNT_INFORMATION_FAILURE:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.UPDATE_REQUIRE_CHANGE_PASSWORD:
      return {
        ...state,
        required_change_password: false,
      }
    default:
      return state
  }
}

export default UserReducer
