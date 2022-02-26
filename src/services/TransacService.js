import Axios from 'axios'
import config from './Config'
import Api from './Api'
export default {
	index(id) {
		return Api().get(`/users/${id}/transactions`)
	},
    purchase(form){
        return Api().post('/purchase', form)
    },
	url() {
		return config.baseUrl + 'transactions'
	},
}
