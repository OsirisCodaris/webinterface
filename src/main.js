/*!

 =========================================================
 * Vue Now UI Kit - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import VuejsDialog from 'vuejs-dialog'
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js' // only needed in custom components
import VueConfirmDialog from 'vue-confirm-dialog'


// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import { sync } from 'vuex-router-sync'
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
//import router from './starterRouter';
import router from './starterRouter'
import store from './store/store'
import NowUiKit from './plugins/now-ui-kit'
import '@/plugins/Dayjs';



Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
// Tell Vue to install the plugin.
Vue.use(VuejsDialog)
Vue.use(VuejsDialogMixin)

//Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

Vue.config.productionTip = false
sync(store, router)
import './plugins/table.js'
Vue.use(NowUiKit)
Vue.use(VueConfirmDialog)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
