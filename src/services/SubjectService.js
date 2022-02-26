import Axios from 'axios'
import config from './Config'
import Api from './Api'
export default {
  index() {
    return Api().get('subjects')
  },
  insert(formData) {
    return Api().post('subjects', formData)
  },
  update(form) {
    return Api().put(`subjects/${form.row.idsubjects}/`, { name: form.name })
  },
  delete(form) {
    return Api().delete(`subjects/${form.idsubjects}/`)
  },
  url() {
    return config.baseUrl + 'subjects'
  },
}
