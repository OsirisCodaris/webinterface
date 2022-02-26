import Axios from 'axios'
import config from './Config'
import Api from './Api'
export default {
  dashboard() {
    return Api().get('stats/dashboard')
  },
}
