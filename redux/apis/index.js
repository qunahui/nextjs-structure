import axios from '~/utils/axios'

// Authentication
export const signUpAPI = (payload) => axios.post('/api/v1/registrations', payload)
export const logoutAPI = () => axios.post('/api/v1/users/logout')
export const getWhoamiAPI = () => axios.get('/api/v1/users/whoami')
export const loginAPI = (payload) => {
  payload.grant_type = 'password'
  return axios.post('/oauth/token', payload)
}

// User
export const updateUserAPI = (payload) => axios.put('/api/v1/users', payload)
export const changePasswordAPI = (payload) => axios.put('/api/v1/users/password', payload)
export const forgotPasswordAPI = (payload) => axios.post('/api/v1/users/forgot_password', payload)
export const resetPasswordAPI = (payload) => axios.post('/api/v1/users/reset_password', payload)
