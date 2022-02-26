import Axios from 'axios'
import config from './Config'
import Api from './Api'
export default {
	index(id) {
		return Api().get(`/users/${id}/subscribers`)
	},
	url() {
		return config.baseUrl + 'subscribers'
	},
}
