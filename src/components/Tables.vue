/* eslint-disable vue/no-dupe-keys */
<template>
  <div>
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

export default {
  mixins: [tableMixin],
  props: {
    head: Array,
    data: String,
  },
  data() {
    return {
      selectRows: [],
      options: {
        sortable: true,
        search: true,
        pagination: true,
        trimOnSearch: false,
        clickToSelect: true,
        checkboxHeader: false,
        showRefresh: true,
        autoRefresh: true,
        refresh: true,
        url: this.data,
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
      this.$emit('check', this.selectRows)
    },
    unCheck(rows) {
      this.selectRows = this.selectRows.filter(el => {
        //if rows is classe subject typedocs
        if (el.name) {
          return el.name !== rows.name
        } else {
          //if rows is admin
          return el.User.fullname !== rows.User.fullname
        }
      })
      this.$emit('check', this.selectRows)
    },
    refresh() {
      this.$refs.table.refresh()
    },
    refreshed() {
      this.selectRows = []
      this.$emit('check', this.selectRows)
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
