<template>
  <div class="subject-page">
    <div class="section text-center">
      <panel
        ref="panel"
        title="Gestion des Matières"
        :columns="headers"
        :data="Subjects"
        @checked="checked"
      >
        <template slot="show">
          <show-name
            title="Matières"
            :data="SubjectSelected"
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
import SubjectService from '@/services/SubjectService'

export default {
  name: 'Subjects',
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
      Subjects: SubjectService.url(),
      SubjectSelected: [],
      error: false,
      message: false,
      headers: [
        {
          field: 'state',
          checkbox: true,
        },
        {
          title: 'ID',
          field: 'idsubjects',
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
      this.SubjectSelected = rows
    },
    async insert(form) {
      try {
        this.error = false
        this.message = false
        const response = (await SubjectService.insert(form)).data
        this.message = 'Matière ajouté avec succès ' + response.idsubjects
        this.$refs.panel.refresh()
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async updated(row) {
      try {
        this.error = false
        this.message = false
        const response = (await SubjectService.update(row)).data
        this.message = 'Nom de la Matière modifiée '
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
          const response = await SubjectService.delete(row)
          this.message = 'Matières supprimés'
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
.subject-page {
  min-height: calc(100vh - 95px);
}
</style>
