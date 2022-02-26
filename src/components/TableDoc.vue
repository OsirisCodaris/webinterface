/* eslint-disable vue/no-dupe-keys */
<template>
  <div>
    <div id="toolbar">
      <button id="remove" class="btn btn-danger" @click="deleteRows">
        <i class="fa fa-trash"></i> Supprimer
        <span v-if="selectRows.length">({{ selectRows.length }})</span>
      </button>
      <div class="fas fa-spinner fa-pulse m-2" v-if="isLoad"></div>
    </div>
    <BootstrapTable
      ref="table"
      :columns="head"
      :options="options"
      @on-refresh="refreshed"
      @on-check="check"
      @on-uncheck="unCheck"
      @on-post-body="vueFormatterPostBody"
    />
  </div>
</template>

<script>
import tableMixin from '../mixins/table'
import ClasseService from '@/services/ClasseService'
import config from '@/services/Config'

export default {
  name: 'tabledoc',
  mixins: [tableMixin],
  props: {
    head: Array,
    data: String,
  },
  data() {
    return {
      isLoad: false,
      selectRows: [],
      options: {
        toolbar: '#toolbar',
        sortable: true,
        search: true,
        pagination: true,
        trimOnSearch: false,
        clickToSelect: true,
        checkboxHeader: false,
        advancedSearch: true,
        idTable: 'advancedTable',
        showRefresh: true,
        refresh: true,
        url: this.data,
        buttons: () => [
          {
            text: 'Add new row',
            icon: 'fa-plus',
            event: {
              click: () => {
                this.addRow()
              },
            },
            attributes: {
              title: 'Ajouter un document',
            },
          },
        ],
        undefinedText: 'N/A',
        responseHandler: function(res) {
          return res
        },
        loadingTemplate: function() {
          return '<div class="m-3 fa-2x"><div class="fas fa-spinner fa-pulse"></div></div>'
        },
      },
    }
  },
  methods: {
    check(row) {
      this.selectRows.push(row)
    },
    unCheck(rows) {
      this.selectRows = this.selectRows.filter(el => el.name !== rows.name)
    },
    refresh() {
      this.isLoad = false
      this.$refs.table.refresh()
    },
    refreshed() {
      this.selectRows = []
      this.$emit('check', this.selectRows)
    },
    addRow() {
      this.$emit('addRow')
    },
    deleteRows() {
      this.isLoad = true
      this.$emit('deleteRows', this.selectRows)
    },
  },
  async mounted() {
    switch (this.list) {
      case 'Classes':
        try {
          const response = (await ClasseService.index()).data
          this.list = response.classe
        } catch (error) {
          //console.log(error.response.data)
        }
        break
      case 'Subjects':
        break
      case 'TypesofDoc':
        break
      default:
        break
    }
  },
}
</script>
