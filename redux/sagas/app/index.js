import { call, put, takeLatest } from 'redux-saga/effects'
import { getWhoamiFailureAction, getWhoamiSuccessAction } from '~/redux/actions/Authentication'
import * as actionTypes from '~/redux/types'
import { setToken } from '~/utils/axios'

export default function* watchAll() {
  yield takeLatest(actionTypes.APP_INIT, appInitSaga)
}

function* appInitSaga({ payload }) {
  try {
    if (payload?.token?.access_token) {
      const token = `${payload.token.token_type} ${payload.token.access_token}`
      setToken(token)
      const whoami = yield call(getWhoamiAPI)
      yield put(getWhoamiSuccessAction(whoami.data))
    }
  } catch (error) {
    yield put(getWhoamiFailureAction())
    console.log(error)
  }
}
