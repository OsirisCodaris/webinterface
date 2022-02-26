<template>
  <div class="Admin-page">
    <div class="section text-center">
      <vue-confirm-dialog></vue-confirm-dialog>
      <panel
        ref="panel"
        title="Gestion des Administrateurs"
        :columns="headers"
        :data="Admins"
        @checked="checked"
      >
        <template slot="show">
          <admin
            ref="admin"
            title="Administrateur"
            :data="AdminSelected"
            @delete="deleted"
            @update="updated"
            @insert="insert"
          ></admin>
          <alert type="danger" v-if="error" class="col-12">{{ error }}</alert>
          <alert type="success" v-if="message" class="col-12">
            {{ message }}
          </alert>
        </template>
      </panel>
    </div>
  </div>
</template>
<script>
import { Alert, Card, Button, FormGroupInput } from '@/components'
import Admin from '@/dev_page/Setting/Admin'
import Panel from '@/dev_page/Setting/Panel'
import AdminService from '@/services/AdminService'
import config from '@/services/Config'

function operateFormatter(value, row, index) {
  return '<a class="like" href="javascript:void(0)" title="Modifier"><i class="fa fa-edit"></i></a>'
}

export default {
  name: 'Admins',
  components: {
    Card,
    Alert,
    Admin,
    Panel,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      Admins: AdminService.url(),
      AdminSelected: [],
      error: false,
      message: false,
      headers: [
        {
          field: 'state',
          checkbox: true,
        },
        {
          title: 'ID',
          field: 'idadmins',
          sortable: true,
        },
        {
          field: 'User.fullname',
          title: 'Noms',
          sortable: true,
        },
        {
          field: 'User.email',
          title: 'Email',
          sortable: true,
        },
        {
          field: 'User.phone',
          title: 'Téléphone',
          sortable: true,
        },
        {
          field: 'role',
          title: 'Role',
          sortable: true,
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
    checked(rows) {
      this.AdminSelected = rows
      if (rows.length >= 1) {
        this.$refs.admin.setData(null)
      }
      //
    },
    async edit(e, value, row, index) {
      this.AdminSelected = []
      this.AdminSelected.push(row)
      this.$refs.admin.setData(row)
    },
    async insert(form, confirm) {
      try {
        this.error = false
        this.message = false
        if (form.user.password == confirm) {
          const response = (await AdminService.insert(form)).data
          this.message = 'Administrateur ajouté avec succès ' + response.user
          this.$refs.panel.refresh()
        } else {
          this.error = 'Les mots de passe ne sont pas identiques'
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async updated(form, confirm) {
      try {
        this.error = false
        this.message = false
        const verifpass = form.row.user.password
          ? form.row.user.password == confirm
            ? confirm
            : false
          : true
        if (verifpass) {
          const response = (await AdminService.update(form.row, form.id)).data
          this.message = "L'administrateur a été modifiée "
          this.$refs.panel.refresh()
        } else {
          this.error = 'Les mots de passe ne sont pas identiques'
        }
      } catch (error) {
        this.error = error.response.data.error
      }
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
                  const response = await AdminService.delete(row)
                  this.message = 'Administrateurs supprimés'
                  this.$refs.panel.refresh()
                })
              } else if (confirm && password != config.password) {
                alert('Mauvais mot de passe')
              }
            },
          })
        } else {
          this.refreshTable()
        }
      } catch (error) {
        this.error = error.response.data.error
        this.$refs.panel.refresh()
      }
    },
  },
}
</script>
<style>
.Admin-page {
  min-height: calc(100vh - 95px);
}
</style>
