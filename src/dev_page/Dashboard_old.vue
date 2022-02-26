<template>
  <div class="starter-page">
    <div class="section text-center">
      <div class="row m-2">
        <div class="col-md-4 ">
          <card class="bg-secondary" raised
            >
            <line-chart :data="chartData"></line-chart>
          </card>
        </div>
        <div class="col-md-4">
          <card class="bg-success" raised>
            <template slot="image">
              <img
                src="img/dev/matiere.jpg"
                class="img rounded img-raised"
                alt="cover"
              />
            </template>
            <div slot="info" class="row m-1 text-white">
              <h4 class="col-md-8 col-8 text text-left">Matières</h4>
              <h4 class="col-md-4 col-4 text text-right">
                {{ countSubjects }}
              </h4>
            </div>
          </card>
        </div>
        <div class="col-md-4">
          <card class="bg-warning" raised
            ><template slot="image">
              <img
                src="img/dev/docs.jpg"
                class="img rounded img-raised"
                alt="cover"
              />
            </template>
            <div slot="info" class="row m-1 text-white">
              <h4 class="col-md-9 col-9 text text-left">
                Documents & Corrigés
              </h4>
              <h4 class="col-md-3 col-3 text text-right">
                {{ countDocuments + countDocAnswers }}
              </h4>
            </div>
          </card>
        </div>
        <div class="col-md-4">
          <card raised
            ><template slot="image">
              <img
                src="img/dev/apprenant.jpg"
                class="img rounded img-raised"
                alt="cover"
              />
            </template>
            <div slot="info" class="row m-1 text-dark">
              <h4 class="col-md-8 col-8 text text-left">Apprenants</h4>
              <h4 class="col-md-4 col-4 text text-right">
                {{ countStudents }}
              </h4>
            </div>
          </card>
        </div>
        <div class="col-md-4">
          <card class="bg-primary" raised
            ><template slot="image">
              <img
                src="img/dev/teachers.jpg"
                class="img rounded img-raised"
                alt="cover"
              />
            </template>
            <div slot="info" class="row m-1 text-white">
              <h4 class="col-md-8 col-8 text text-left">Enseignants</h4>
              <h4 class="col-md-4 col-4 text text-right">
                {{ countTeachers }}
              </h4>
            </div>
          </card>
        </div>
        <div class="col-md-4">
          <card class="bg-info" raised
            ><template slot="image">
              <img
                src="img/dev/admins.jpg"
                class="img rounded img-raised"
                alt="cover"
              />
            </template>
            <div slot="info" class="row m-1 text-white">
              <h4 class="col-md-8 col-8 text text-left">Admins</h4>
              <h4 class="col-md-4 col-4 text text-right">{{ countAdmins }}</h4>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Alert, Card, Button, FormGroupInput } from '@/components'
import StatServices from '@/services/StatServices'

export default {
  name: 'starter',
  components: {
    Card,
  },
  data() {
    return {
      countClasses: 0,
      countSubjects: 0,
      countDocuments: 0,
      countDocAnswers: 0,
      countStudents: 0,
      countTeachers: 0,
      countAdmins: 0,

      chartData: {
        'Jan':2,
        'Fev':12,
        'Mar':8
      },
    }
  },
  async mounted() {
    try {
      const response = (await StatServices.dashboard()).data
      this.countClasses = response.countClasses
      this.countSubjects = response.countSubjects
      this.countDocuments = response.countDocuments
      this.countDocAnswers = response.countDocAnswers
      this.countStudents = response.countStudents
      this.countTeachers = response.countTeachers
      this.countAdmins = response.countAdmins
    } catch (error) {}
  },
}
</script>
<style scoped>
.starter-page {
  min-height: calc(100vh - 95px);
}
.card {
  height: 360px;
}
img {
  height: 280px;
}
</style>
