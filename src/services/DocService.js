import Axios from 'axios'
import config from './Config'
import Api from './Api'
export default {
  index() {
    return Api().get('documents')
  },
  insert(formData) {
    return Api().post('documents', formData)
  },
  show(id) {
    return Api().get(`documents/${id}/`)
  },
  update(id, form) {
    return Api().put(`documents/${id}`, form)
  },
  delete(form) {
    return Api().delete(`documents/${form.iddocuments}/`)
  },
  url() {
    return config.baseUrl + 'documents'
  },
}
