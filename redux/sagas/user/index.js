import { call, put, takeLatest } from 'redux-saga/effects'
import {
  changePasswordFailureAction,
  changePasswordSuccessAction,
  saveAccountFailureAction,
  saveAccountSuccessAction,
} from '~/redux/actions/User'
import { changePasswordAPI, updateUserAPI } from '~/redux/apis'
import * as actionTypes from '~/redux/types'

export default function* watchAll() {
  yield takeLatest(actionTypes.SAVE_ACCOUNT_INFORMATION, saveAccountSaga)
  yield takeLatest(actionTypes.CHANGE_PASSWORD, changePasswordSaga)
}

function* saveAccountSaga({ payload, actionSuccess, actionFailure }) {
  try {
    yield call(updateUserAPI, payload)
    yield put(saveAccountSuccessAction(payload))
    actionSuccess && actionSuccess()
  } catch (error) {
    yield put(saveAccountFailureAction())
    actionFailure && actionFailure()
    console.log(error)
  }
}

function* changePasswordSaga({ payload, actionSuccess, actionFailure }) {
  try {
    yield call(changePasswordAPI, payload)
    yield put(changePasswordSuccessAction())
    actionSuccess && actionSuccess()
  } catch (error) {
    yield put(changePasswordFailureAction())
    actionFailure && actionFailure()
    console.log(error)
  }
}
