import { all } from 'redux-saga/effects'
import appSaga from '../sagas/app'
import authSaga from '../sagas/auth'
import userSaga from '../sagas/user'

export default function* watchAll() {
  yield all([authSaga(), appSaga(), userSaga()])
}
