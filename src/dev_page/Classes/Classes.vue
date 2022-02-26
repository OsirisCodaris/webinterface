<template>
  <div class="class-page">
    <div class="section text-center">
      <panel
        ref="panel"
        title="Gestion des Classes"
        :columns="headers"
        :data="classes"
        @checked="checked"
      >
        <template slot="show">
          <show-name
            title="Classes"
            :data="classeSelected"
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
import ClasseService from '@/services/ClasseService'

export default {
  name: 'classes',
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
      classes: ClasseService.url(),
      classeSelected: [],
      error: false,
      message: false,
      headers: [
        {
          field: 'state',
          checkbox: true,
        },
        {
          title: 'ID',
          field: 'idclasses',
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
      this.classeSelected = rows
    },
    async insert(form) {
      try {
        this.error = false
        this.message = false
        const response = (await ClasseService.insert(form)).data
        this.message = 'Classes ajouté avec succes ' + response.idclasses
        this.$refs.panel.refresh()
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async updated(row) {
      try {
        this.error = false
        this.message = false
        const response = (await ClasseService.update(row)).data
        this.message = 'Nom de la classe modifiée '
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
          const response = await ClasseService.delete(row)
          this.message = 'Classes supprimés'
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
.class-page {
  min-height: calc(100vh - 95px);
}
</style>
