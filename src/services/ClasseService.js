import Axios from 'axios'
import config from './Config'
import Api from './Api'
export default {
	index() {
		return Api().get('classes')
	},
	insert(formData) {
		return Api().post('classes', formData)
	},
	update(form) {
		return Api().put(`classes/${form.row.idclasses}/`, { name: form.name })
	},
	delete(form) {
		return Api().delete(`classes/${form.idclasses}/`)
	},
	url() {
		return config.baseUrl + 'classes'
	},
}
