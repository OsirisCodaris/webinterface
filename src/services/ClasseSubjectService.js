import Axios from 'axios'
import config from './Config'
import Api from './Api'
export default {
	index(id) {
		return Api().get(`classes/${id}/subjects`)
	},
	classe(id) {
		return Api().get(`subjects/${id}/classes`)
	},
	associate(id, formData) {
		return Api().post(`classes/${id}/subjects`, { idsubjects: formData })
	},
	/*
	update(form) {
		return Api().put(`classes/${form.row.idclasses}/`, { name: form.name })
	},
	delete(form) {
		return Api().delete(`classes/${form.idclasses}/`)
	},*/
	url() {
		return config.baseUrl + 'classes'
	},
}
