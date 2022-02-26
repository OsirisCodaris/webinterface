<template>
  <div class="TypeDoc-page">
    <div class="section text-center">
      <panel
        ref="panel"
        title="Gestion des Catégories"
        :columns="headers"
        :data="TypeDocs"
        @checked="checked"
      >
        <template slot="show">
          <show-name
            title="Catégories"
            :data="TypeDocSelected"
            @delete="deleted"
            @update="updated"
            @insert="insert"
          ></show-name>
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
import ShowName from '@/dev_page/Setting/ShowName'
import Panel from '@/dev_page/Setting/Panel'
import TypeDocService from '@/services/TypeDocService'

export default {
  name: 'TypeDocs',
  components: {
    Card,
    Alert,
    ShowName,
    Panel,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      TypeDocs: TypeDocService.url(),
      TypeDocSelected: [],
      error: false,
      message: false,
      headers: [
        {
          field: 'state',
          checkbox: true,
        },
        {
          title: 'ID',
          field: 'idtypedocs',
          sortable: true,
        },
        {
          field: 'name',
          title: 'Nom',
          sortable: true,
        },
      ],
    }
  },
  methods: {
    checked(rows) {
      this.TypeDocSelected = rows
    },
    async insert(form) {
      try {
        this.error = false
        this.message = false
        const response = (await TypeDocService.insert(form)).data
        this.message = 'Catégorie ajouté avec succès ' + response.idtypedocs
        this.$refs.panel.refresh()
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async updated(row) {
      try {
        this.error = false
        this.message = false
        const response = (await TypeDocService.update(row)).data
        this.message = 'Nom de la Catégorie modifiée '
        this.$refs.panel.refresh()
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deleted(rows) {
      try {
        await rows.forEach(async row => {
          this.error = false
          this.message = false
          const response = await TypeDocService.delete(row)
          this.message = 'Catégories supprimés'
          this.$refs.panel.refresh()
        })
      } catch (error) {
        this.error = error.response.data.error
        this.$refs.panel.refresh()
      }
    },
  },
}
</script>
<style>
.TypeDoc-page {
  min-height: calc(100vh - 95px);
}
</style>
