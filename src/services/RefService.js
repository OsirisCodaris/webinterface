import Axios from 'axios'
import config from './Config'
import Api from './Api'
export default {
	index() {
		return Api().get('references')
	},
	url() {
		return config.baseUrl + 'references'
	},
}
