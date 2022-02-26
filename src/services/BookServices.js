import Api from './Api'

export default {
	index(offset) {
		const value = offset ? offset : 0
		return Api().get('book?offset=' + value)
	},
	insert(formData) {
		return Api().post('book', formData)
	},
}
