import { call, put, takeLatest } from 'redux-saga/effects'
import {
  getWhoamiFailureAction,
  getWhoamiSuccessAction,
  loginFailureAction,
  loginSuccessAction,
  logoutSuccessAction,
  signUpFailureAction,
  signUpSuccessAction,
} from '~/redux/actions/Authentication'
import { getWhoamiAPI, loginAPI, logoutAPI, registerDepartmentAPI, signUpAPI } from '~/redux/apis'
import * as actionTypes from '~/redux/types'
import { setToken } from '~/utils/axios'

export default function* watchAll() {
  yield takeLatest(actionTypes.SIGN_UP, signUpSaga)
  yield takeLatest(actionTypes.LOGIN, loginSaga)
  yield takeLatest(actionTypes.GET_WHO_AM_I, getWhoamiSaga)
  yield takeLatest(actionTypes.LOGOUT, logoutSaga)
  yield takeLatest(actionTypes.REGISTER_DEPARTMENT, registerDepartmentSaga)
}

function* getWhoamiSaga({ actionSuccess, actionFailure }) {
  try {
    const response = yield call(getWhoamiAPI)
    yield put(getWhoamiSuccessAction(response.data))
    actionSuccess && actionSuccess(response.data)
  } catch (error) {
    yield put(getWhoamiFailureAction())
    actionFailure && actionFailure()
    console.log(error)
  }
}

function* signUpSaga({ payload, actionSuccess, actionFailure }) {
  try {
    const response = yield call(signUpAPI, payload)
    yield put(signUpSuccessAction(response.data))

    actionSuccess && actionSuccess()
  } catch (error) {
    yield put(signUpFailureAction())
    actionFailure && actionFailure()
    console.log(error)
  }
}

function* registerDepartmentSaga({ payload, actionSuccess, actionFailure }) {
  try {
    const response = yield call(registerDepartmentAPI, payload)
    yield put(signUpSuccessAction(response.data))

    actionSuccess && actionSuccess()
  } catch (error) {
    yield put(signUpFailureAction())
    actionFailure && actionFailure()
    console.log(error)
  }
}

function* loginSaga({ payload, actionSuccess, actionFailure }) {
  try {
    const response = yield call(loginAPI, payload)
    yield put(loginSuccessAction(response))
    if (response?.access_token) {
      const { token_type, access_token } = response
      const token = `${token_type} ${access_token}`
      setToken(token)
      actionSuccess && actionSuccess()
    }
  } catch (error) {
    yield put(loginFailureAction())
    actionFailure && actionFailure()
    console.log(error)
  }
}

function* logoutSaga() {
  try {
    yield call(logoutAPI)
    setToken(null)
    yield put(logoutSuccessAction())
  } catch (error) {
    console.log(error)
    yield put(loginFailureAction())
  }
}
