import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import rootSaga from '../sagas'

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null)
  },
  setItem(_key, value) {
    return Promise.resolve(value)
  },
  removeItem() {
    return Promise.resolve()
  },
})

const saga = createSagaMiddleware()

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login', 'user', 'layout'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(saga)))
const persistor = persistStore(store)

saga.run(rootSaga)

export { store, persistor }
