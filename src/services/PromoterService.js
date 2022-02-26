import Axios from 'axios'
import config from './Config'
import Api from './Api'
export default {
  stat(id) {
    return Api().get(`promoters/${id}/transactions`)
  }
}
