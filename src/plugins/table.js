// import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-table/dist/bootstrap-table.min.css'

import './jquery.js'
import Vue from 'vue'
import 'bootstrap'
import 'tableexport.jquery.plugin/libs/FileSaver/FileSaver.min.js'
import 'tableexport.jquery.plugin/tableExport.min.js'
import 'bootstrap-table/dist/bootstrap-table'
import 'bootstrap-table/dist/locale/bootstrap-table-fr-FR.js'
import 'bootstrap-table/dist/extensions/auto-refresh/bootstrap-table-auto-refresh.js'
import 'bootstrap-table/dist/extensions/toolbar/bootstrap-table-toolbar.js'
import BootstrapTable from 'bootstrap-table/dist/bootstrap-table-vue.esm'
import 'bootstrap-table/dist/extensions/export/bootstrap-table-export.min.js'

Vue.component('BootstrapTable', BootstrapTable)
