<template>
  <div class="class-page">
    <div class="section ">
      <div class="container">
        <h1 class="text-center" type="success">Association Classe-Matière</h1>
        <hr />
        <alert type="warning" v-show="warning"
          >Donées modifiées non enregistrer</alert
        >
        <alert type="danger" v-if="error" class="col-12">{{ error }}</alert>
        <alert type="success" v-if="message" class="col-12">
          {{ message }}
        </alert>
        <div class="input-group m-3">
          <select
            class="custom-select "
            id="inputGroupSelect01"
            @change="getSubjects"
            v-model="selectedClass"
          >
            <option selected value="-1">Choisir une classe...</option>
            <option
              v-for="classe in classes"
              :key="classe.idclasses"
              v-bind:value="classe.idclasses"
              >{{ classe.name }}</option
            >
          </select>
        </div>
        <br class="space" />
        <div
          class="m-3 fa-2x text-center"
          v-show="subjects.length == 0 ? true : false"
        >
          <div class="fas fa-spinner fa-pulse"></div>
        </div>

        <div class="row text-left pl-5">
          <div
            class="col col-md-2 col-12 col-sm-3 m-2"
            v-for="subject in subjects"
            :key="subject.idsubjects"
          >
            <n-checkbox
              @input="oncheck(subject)"
              :checked="subject.status"
              :class="classe(subject)"
              >{{ subject.name }}</n-checkbox
            >
          </div>
        </div>
        <div>
          <br class="space" />
          <div class="text-center ">
            <n-button type="success" @click="submit"
              >Enregistrer
              <div class="fas fa-spinner fa-pulse" v-if="isloading"></div>
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Alert, Card, Button, FormGroupInput, Checkbox } from '@/components'
import ShowName from '@/dev_page/Setting/ShowName'
import Panel from '@/dev_page/Setting/Panel'
import ClasseService from '@/services/ClasseService'
import SubjectService from '@/services/SubjectService'
import ClasseSubjectService from '@/services/ClasseSubjectService'
import Utils from '@/utils/Utils'

export default {
  name: 'classes',
  components: {
    Card,
    Alert,
    ShowName,
    Panel,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      classes: [],
      subjects: [],
      classeSubject: [],
      selectedClass: -1,
      unchecked: false,
      checked: true,
      error: false,
      message: false,
      warning: false,
      isloading: false,
    }
  },
  computed: {},
  methods: {
    async getSubjects() {
      try {
        this.subjects = this.subjects.map(subject => {
          subject['status'] = false
          return subject
        })
        this.warning = this.error = this.message = false

        if (this.selectedClass != -1) {
          this.error = false
          const response = (
            await ClasseSubjectService.index(this.selectedClass)
          ).data

          this.classeSubject = response.subjectHasClasses
          this.classeSubject = this.classeSubject.map(element => {
            delete element.subjectsHasClasses
            element['status'] = false
            return element
          })
          this.Checked()
        } else {
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    Checked() {
      this.subjects = this.subjects.map(subject => {
        subject.status = Utils(this.classeSubject, subject)
        return subject
      })
    },
    oncheck(subject1) {
      this.subjects = this.subjects.map(subject => {
        if (subject1.idsubjects == subject.idsubjects) {
          subject.status = !subject1.status
        }
        return subject
      })
      this.warning = this.selectedClass != -1 ? true : false
      this.error = this.message = false
      return subject1.status
    },
    classe(s) {
      return s.status ? 'text text-success text-bold' : 'text text-danger'
    },
    async submit() {
      try {
        this.error = false
        this.message = false
        this.warning = false
        this.isloading = true
        var regsubjects = []
        this.subjects.forEach(subject => {
          if (subject.status === true) {
            regsubjects.push(subject.idsubjects)
          }
        })
        const response = (
          await ClasseSubjectService.associate(this.selectedClass, regsubjects)
        ).data
        this.message = 'Les matières ont correctement été associé'
        this.isloading = false
      } catch (error) {
        this.isloading = false
        this.error = error.response.data.error
      }
    },
  },
  async mounted() {
    try {
      this.error = false
      this.message = false
      const responseClasse = (await ClasseService.index()).data
      this.classes = responseClasse.rows
      const responseSubject = (await SubjectService.index()).data
      this.subjects = responseSubject.rows
      this.subjects = this.subjects.map(subject => {
        subject['status'] = false
        return subject
      })
    } catch (error) {
      this.error = error.response.data.error
    }
  },
}
</script>
<style>
.class-page {
  min-height: calc(100vh - 95px);
}
.space {
  margin-bottom: 7%;
}
</style>
