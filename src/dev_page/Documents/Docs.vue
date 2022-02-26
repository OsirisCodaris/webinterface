<template>
  <div class="class-page">
    <div class="section text-center">
      <vue-confirm-dialog></vue-confirm-dialog>

      <div class="m-2">
        <alert type="danger" v-if="error" class="col-12">{{ error }}</alert>
        <alert type="success" v-if="message" class="col-12">{{
          message
        }}</alert>

        <card raised>
          <table-doc
            ref="table"
            :data="data"
            :head="headers"
            @addRow="add"
            @deleteRows="deleted"
          ></table-doc>
        </card>
      </div>

      <modal
        :show.sync="modals.classic"
        modal-classes="modal-lg"
        headerClasses="justify-content-center"
      >
        <add-book ref="add" @success="refreshTable"></add-book>
        <template slot="footer">
          <n-button type="danger" @click.native="modals.classic = false"
            >Close</n-button
          >
        </template>
      </modal>
    </div>
  </div>
</template>
<script>
import {
  Alert,
  Card,
  Button,
  FormGroupInput,
  TableDoc,
  Modal,
} from '@/components'
import AddBook from '@/dev_page/Documents/AddBook'
import DocService from '@/services/DocService'
import CustomView from './AddBook.vue'
import config from '@/services/Config'

function operateFormatter(value, row, index) {
  return '<a class="like" href="javascript:void(0)" title="Modifier"><i class="fa fa-edit"></i></a>'
}

window.operateEvents = {
  'click .like': function(e, value, row, index) {
    alert('You click like action, row: ' + JSON.stringify(row))
  },
}
export default {
  name: 'classes',
  components: {
    Card,
    Alert,
    AddBook,
    TableDoc,
    Modal,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      doc: {},
      data: DocService.url(),
      classeSelected: [],
      error: false,
      message: false,
      modals: {
        classic: false,
      },
      event: (window.operateEvents = {
        'click .like': function(e, value, row, index) {
          alert('You click like action, row: ' + JSON.stringify(row))
        },
      }),
      headers: [
        {
          field: 'state',
          checkbox: true,
        },
        {
          title: 'ID',
          field: 'iddocuments',
          sortable: true,
          formatter: this.nameFormat,
        },
        {
          field: 'name',
          title: 'Nom',
          sortable: true,
          formatter: this.nameFormat,
        },
        {
          field: 'year',
          title: 'Année',
          sortable: true,
          formatter: this.nameFormat,
        },
        {
          field: 'status',
          title: 'Disp. Document',
          sortable: true,
          formatter: value => {
            return value === true
              ? "<p class='text-success'>Payant</p>"
              : "<p class='text-danger'>Gratuit</p>"
          },
        },
        {
          field: 'docAnswer.pathfile',
          title: 'Corrigé',
          sortable: true,
          formatter: this.answerFormat,
        },
        {
          field: 'docAnswer.status',
          title: 'Disp. Corrigé',
          formatter: this.statusFormat,
        },
        {
          field: 'operate',
          title: 'Options',
          align: 'center',
          clickToSelect: false,
          events: (window.operateEvents = {
            'click .like': this.edit,
          }),
          formatter: operateFormatter,
        },
      ],
    }
  },
  methods: {
    add() {
      this.$refs.add.setData(null)
      this.modals.classic = true
    },
    nameFormat(value) {
      return `<p> ${value} </p>`
    },
    statusFormat(value) {
      if (value != undefined) {
        return value === true
          ? "<p class='text-success'>Payant</p>"
          : "<p class='text-danger'>Gratuit</p>"
      }
      return value
    },
    answerFormat(value) {
      if (value != undefined) {
        return this.nameFormat('Oui')
      }
      return value
    },
    async edit(e, value, row, index) {
      try {
        const response = (await DocService.show(row.iddocuments)).data
        this.doc = response.doc
        this.$refs.add.setData(this.doc)
      } catch (error) {
        this.error = error.response.data.error
      }
      this.modals.classic = true
    },
    async deleted(rows) {
      try {
        if (rows.length) {
          this.$confirm({
            auth: true,
            message: 'Voulez-vous vraiment supprimer ?',
            button: {
              yes: 'Continuer',
              no: 'Annuler',
            },
            /**
             * Callback Function
             * @param {Boolean} confirm
             * @param {String} password
             */
            callback: async (confirm, password) => {
              if (confirm && password == config.password) {
                await rows.forEach(async row => {
                  this.error = false
                  this.message = false
                  const response = await DocService.delete(row)
                  this.message = 'Documents supprimés'
                  this.refreshTable()
                })
              } else if (confirm && password != config.password) {
                alert('Mauvais mot de passe')
                this.refreshTable()
              } else {
                this.refreshTable()
              }
            },
          })
        } else {
          this.refreshTable()
        }

        /*	*/
      } catch (error) {
        this.error = error.response.data.error
        this.refreshTable()
      }
    },
    refreshTable() {
      this.$refs.table.refresh()
    },
  },
}
</script>
<style>
.class-page {
  min-height: calc(100vh - 95px);
}
</style>
