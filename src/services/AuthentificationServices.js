import Api from './Api'

export default {
  register(credentials) {
    return Api().post('register', credentials)
  },
  login(credentials) {
    return Api().post('login', credentials)
  },
  reset(credentials) {
    return Api().post('resetpassword', credentials)
  },
  newPassword(credentials) {
    return Api().post('password', credentials)
  },
}
