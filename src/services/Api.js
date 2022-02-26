import axios from 'axios'
import LocalStorageService from '../store/localstorageservice'
import router from '../starterRouter'
import store from '../store/store'

// LocalstorageService
const localStorageService = LocalStorageService.getService()

import config from './Config'
export default () => {
  let custom = axios.create({
    baseURL: config.baseUrl,
  })

  // Add a request interceptor
  custom.interceptors.request.use(
    config => {
      const token = localStorageService.getAccessToken()
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      // config.headers['Content-Type'] = 'application/json';
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  //Add a response interceptor

  custom.interceptors.response.use(
    response => {
      return response
    },
    function(error) {
      const originalRequest = error.config

      if (error.response.status === 401 && originalRequest.url === `token`) {
        store.dispatch('setUser', null)
        store.dispatch('setToken', null)
        store.dispatch('setRefresh', null)
        router.push('login')
        return Promise.reject(error)
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const refreshToken = localStorageService.getRefreshToken()
        return custom
          .post('token', {
            refresh_token: refreshToken,
          })
          .then(res => {
            if (res.status === 201) {
              localStorageService.setToken({
                access_token: res.data.token,
                refresh_token: res.data.refreshToken,
              })
              //localStorageService.setToken(res.data)
              custom.defaults.headers.common['Authorization'] =
                'Bearer ' + localStorageService.getAccessToken()
              return custom(originalRequest)
            }
          })
      }
      return Promise.reject(error)
    }
  )
  return custom
}
