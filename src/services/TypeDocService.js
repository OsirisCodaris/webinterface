import Axios from 'axios'
import config from './Config'
import Api from './Api'
export default {
  index() {
    return Api().get('typedocs')
  },
  insert(formData) {
    return Api().post('typedocs', formData)
  },
  update(form) {
    return Api().put(`typedocs/${form.row.idtypedocs}/`, { name: form.name })
  },
  delete(form) {
    return Api().delete(`typedocs/${form.idtypedocs}/`)
  },
  url() {
    return config.baseUrl + 'typedocs'
  },
}
