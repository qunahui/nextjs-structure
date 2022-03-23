import axios from 'axios'
import { logoutAction } from '~/redux/actions/Authentication'
import { store } from '~/redux/store'
import { API_URL, PROD_API_URL } from './constants'

const isProd = process.env.APP_ENV == 'production'
let baseURL = API_URL
if (isProd) {
  baseURL = PROD_API_URL
}
const instance = axios.create({
  baseURL,
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
instance.defaults.timeout = 60000

instance.interceptors.response.use(
  (response) => response.data,
  function (error) {
    if (401 == error?.response?.status && error?.response?.config?.url != '/api/v1/users/logout') {
      store.dispatch(logoutAction())
      window.location.href = '/login'
    } else {
      return Promise.reject({
        code: error.response?.status,
        message: error.response?.data?.meta?.message,
      })
    }
  },
)

export const setToken = (token) => (instance.defaults.headers.common['Authorization'] = token)

export const setReqHeaderPlatform = (platform) =>
  (instance.defaults.headers.common['Platform'] = platform)

export default instance
