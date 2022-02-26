<template>
  <div class="addBook" ref="add">
    <h4 class="card-title text-left text-muted ">
      Document
    </h4>

    <form>
      <div class="card-text blockquote">
        <fg-input
          type="String"
          class="no-border input-lg"
          addon-left-icon="now-ui-icons users_circle-08"
          placeholder="Titre du document..."
          v-model="form.title"
          required
        >
        </fg-input>
        <fg-input>
          <select
            class="custom-select "
            id="inputGroupSelect01"
            v-model="form.year"
          >
            <option selected value="-1">Choisir l'année...</option>
            <option v-for="year in years" :key="year" v-bind:value="year">{{
              year
            }}</option>
          </select>
        </fg-input>
        <fg-input default class="input-lg">
          <div class="custom-file input-lg">
            <label class="custom-file-label" for="file">{{ docName }}</label>
            <input
              type="file"
              class="custom-file-input"
              id="file"
              ref="file"
              @change="docFile"
              accept="application/pdf"
            />
          </div>
          <span v-if="existDoc"
            ><a :href="existDoc" target="_blank"
              >Télécharger le document<i class="fa fa-download"></i></a
          ></span>
        </fg-input>
        <n-switch v-model="form.statusDoc">
          <span slot="label">
            Document gratuit / payant
          </span>
          <i class="now-ui-icons business_money-coins" slot="on"></i>
          <i
            class="now-ui-icons ui-1_lock-circle-open"
            style="color:red;"
            slot="off"
          ></i>
        </n-switch>

        <fg-input default class="input-lg">
          <div class="custom-file">
            <label class="custom-file-label" for="file">{{ ansName }}</label>
            <input
              type="file"
              class="custom-file-input"
              id="ans"
              ref="ans"
              @change="ansFile"
              accept="application/pdf"
            />
          </div>
          <span v-if="existAns"
            ><a :href="existAns" target="_blank"
              >Télécharger le corrigé<i class="fa fa-download"></i></a
          ></span>
        </fg-input>
        <n-switch v-model="form.statusAns">
          <span slot="label">
            Correction gratuit / payant
          </span>
          <i class="now-ui-icons business_money-coins" slot="on"></i>
          <i
            class="now-ui-icons ui-1_lock-circle-open"
            style="color:red;"
            slot="off"
          ></i>
        </n-switch>
        <fg-input>
          <select
            class="custom-select "
            id="inputGroupSelect2"
            v-model="selectedType"
          >
            <option selected value="-1">Choisir le type du document...</option>
            <option
              v-for="type in typedocs"
              :key="type.idtypedocs"
              v-bind:value="type.idtypedocs"
              >{{ type.name }}</option
            >
          </select>
        </fg-input>
        <fg-input>
          <select
            class="custom-select "
            id="inputGroupSelect1"
            @change="getClasses"
            v-model="selectedSubject"
          >
            <option selected value="-1">Choisir une matières...</option>
            <option
              v-for="subject in subjects"
              :key="subject.idsubjects"
              v-bind:value="subject.idsubjects"
              >{{ subject.name }}</option
            >
          </select>
        </fg-input>
        <div class="row text-left ">
          <div
            class="col col-md-2 col-12 col-sm-3 m-2"
            v-for="classe in classes"
            :key="classe.idclasses"
          >
            <n-checkbox
              :disabled="classe.disabled"
              @input="oncheck(classe)"
              :checked="classe.status"
              >{{ classe.name }}</n-checkbox
            >
          </div>
        </div>
        <fg-input
          type="String"
          class="no-border input-lg"
          addon-left-icon="now-ui-icons users_circle-08"
          placeholder="notion1;notion2;notion3;..."
          v-model="form.notion"
        >
        </fg-input>
      </div>
      <div class="fas fa-spinner fa-pulse" v-if="isLoad"></div>
      <alert type="danger" v-if="error" class="col-12">{{ error }}</alert>
      <alert type="success" v-if="message" class="col-12">{{ message }}</alert>
      <div class="text-right">
        <n-button type="success" @click="addDoc">Enregistrer</n-button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  Alert,
  Card,
  Button,
  FormGroupInput,
  Switch,
  Checkbox,
} from '@/components'
import { DatePicker } from 'element-ui'
import ClasseService from '@/services/ClasseService'
import SubjectService from '@/services/SubjectService'
import TypeDocService from '@/services/TypeDocService'
import ClasseSubjectService from '@/services/ClasseSubjectService'
import DocService from '@/services/DocService'
import Utils from '@/utils/Utils'

export default {
  name: 'starter',

  components: {
    Card,
    Alert,
    [Switch.name]: Switch,
    [Button.name]: Button,
    [DatePicker.name]: DatePicker,
    [FormGroupInput.name]: FormGroupInput,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      document: '',
      isLoad: false,
      years: [],
      selectedSubject: -1,
      selectedType: -1,
      typedocs: [],
      classes: [],
      subjects: [],
      classeSubject: [],
      regClasse: [],
      existDoc: false,
      existAns: false,
      form: {
        title: '',
        year: -1,
        file: null,
        statusDoc: false,
        ans: null,
        statusAns: false,
        notion: '',
      },
      docName: 'Inserer document',
      ansName: 'Inserer correction',
      error: false,
      message: false,
    }
  },

  methods: {
    async setData(doc) {
      this.document = null
      this.form = {
        title: '',
        year: -1,
        file: null,
        statusDoc: false,
        ans: null,
        statusAns: false,
        notion: '',
      }
      this.docName = 'Inserer document'
      this.ansName = 'Inserer correction'
      this.existAns = this.existDoc = false
      this.error = this.message = false
      this.selectedSubject = this.selectedType = -1
      await this.getClasses()
      if (doc) {
        this.document = doc
        this.form.title = doc.name
        this.form.year = doc.year
        this.form.statusDoc = doc.status
        this.selectedType = doc.idtypedocs
        this.existDoc = doc.pathfile
        if (doc.docAnswer) {
          this.existAns = doc.docAnswer.pathfile
          this.form.statusAns = doc.docAnswer.status
        }
        if (doc.Notion) {
          this.form.notion = doc.Notion.notions
        }

        if (doc.docInSubjectClasses) {
          this.selectedSubject = doc.docInSubjectClasses[0].idsubjects
          await this.getClasses()
          doc.docInSubjectClasses.forEach(element => {
            this.classes = this.classes.map(classe => {
              if (classe.idclasses == element.idclasses) {
                classe.status = true
              }
              return classe
            })
          })
        }
      }
    },
    ansFile() {
      this.form.ans = this.$refs.ans.files[0]
      this.ansName = this.form.ans.name
    },
    docFile() {
      this.form.file = this.$refs.file.files[0]
      this.docName = this.form.file.name
    },
    async getClasses() {
      try {
        this.resetStatus()
        //	this.warning = this.error = this.message = false

        if (this.selectedSubject != -1) {
          this.error = false
          const response = (
            await ClasseSubjectService.classe(this.selectedSubject)
          ).data

          this.classeSubject = response.subjectHasClasses
          this.classeSubject = this.classeSubject.map(element => {
            // delete element.subjectsHasClasses
            element['status'] = false
            element['disabled'] = true

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
      this.classes = this.classes.map(classe => {
        classe.disabled = !Utils(this.classeSubject, classe)
        return classe
      })
    },
    resetStatus() {
      this.classes = this.classes.map(classe => {
        classe['status'] = false
        classe['disabled'] = true
        return classe
      })
    },
    oncheck(classe1) {
      this.classes = this.classes.map(classe => {
        if (classe1.idclasses == classe.idclasses) {
          classe.status = !classe1.status
        }
        return classe
      })
      //	this.warning = this.selectedClass != -1 ? true : false
      //	this.error = this.message = false
      return classe1.status
    },
    async addDoc() {
      this.isLoad = true
      const formData = new FormData()
      formData.append('name', this.form.title)
      if (this.form.year != -1) {
        formData.append('year', this.form.year)
      }
      if (this.form.file) {
        formData.append('pathfile', this.form.file)
      }
      formData.append('status', this.form.statusDoc)
      if (this.form.ans) {
        formData.append('answerfile', this.form.ans)
      }
      formData.append('answerstatus', this.form.statusAns)

      if (this.form.notion) {
        formData.append('notions', this.form.notion)
      }
      if (this.selectedType != -1) {
        formData.append('idtypedocs', this.selectedType)
      }
      if (this.selectedSubject != -1) {
        formData.append('idsubjects', this.selectedSubject)
      }
      var regclasses = []
      this.classes.forEach(classe => {
        if (classe.status === true) {
          formData.append('idclasses', classe.idclasses)
        }
      })
      try {
        this.error = false
        this.message = false
        if (this.existDoc) {
          const response = await DocService.update(
            this.document.iddocuments,
            formData
          )
          this.message = 'Document modifier avec succes '
        } else {
          const response = (await DocService.insert(formData)).data
          this.message = 'Document ajouté avec succes ' + response.iddocuments
        }
        this.isLoad = false

        this.$emit('success')
      } catch (error) {
        this.isLoad = false
        //console.log(error.response.data)
        this.error = error.response.data.error
      }
    },
  },
  async mounted() {
    let date1 = new Date()
    let firstDate = 2000
    for (var i = 0; firstDate + i <= date1.getFullYear(); i++) {
      this.years.push(firstDate + i)
    }
    try {
      this.error = false
      this.message = false
      const responseClasse = (await ClasseService.index()).data
      this.classes = responseClasse.rows
      const responseSubject = (await SubjectService.index()).data
      this.subjects = responseSubject.rows
      const responseType = (await TypeDocService.index()).data
      this.typedocs = responseType.rows
      this.resetStatus()
    } catch (error) {
      //	console.log(error)
      this.error = error.response.data.error
    }
  },
}
</script>
<style>
.addBook {
  width: 100%;
}
</style>
