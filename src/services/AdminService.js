import Axios from 'axios'
import config from './Config'
import Api from './Api'
export default {
  index() {
    return Api().get('admins')
  },
  insert(formData) {
    return Api().post('admins', formData)
  },
  update(form, id) {
    return Api().put(`admins/${id}/`, form)
  },
  delete(form) {
    return Api().delete(`admins/${form.idadmins}/`)
  },
  url() {
    return config.baseUrl + 'admins'
  },
  sendMail(form) {
    return Api().post('mailer', form)
  },
}
