<template>
  <div class="page-header clear-filter" filter-color="dark">
    <div
      class="page-header-image"
      style="background-image: url('image/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <div class="text-center" slot="header">
              <img v-lazy="'logo.png'" alt="" style="width: 250px" />
          
            </div>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Nom complet ou Mail..."
              v-model="form.fullname"
            >
            </fg-input>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons objects_key-25"
              placeholder="Mot de passe..."
              type="password"
              v-model="form.password"
            >
            </fg-input>
            <alert type="danger" v-if="error" class="col-12">{{ error }}</alert>
            <template slot="raw-content">
              <div class="card-footer text-center">
                <n-button type="default" @click="login" round class="col-6"
                  >Connexion
                  <div class="fas fa-spinner fa-pulse" v-if="isloading"></div>
                </n-button>
              </div>
              <div class="pull-right">
                <h6>
                  <a href="#/forget-password" class="link footer-link"
                    >Mot de passe oublié?</a
                  >
                </h6>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Alert, Card, Button, FormGroupInput } from '@/components'
import AuthentificationServices from '@/services/AuthentificationServices'
import localStore from '@/store/localstorageservice.js'
export default {
  name: 'login-page',
  bodyClass: 'login-page',
  components: {
    Card,
    Alert,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      isloading: false,
      form: {
        fullname: '',
        password: '',
      },
      error: false,
    }
  },
  methods: {
    async login() {
      try {
        this.isloading = true
        this.error = false
        if (this.form) {
          const response = (await AuthentificationServices.login(this.form))
            .data
          this.$store.dispatch('setUser', {
            idusers: response.idusers,
            fullname: response.fullname,
            email: response.email,
            module: response.module,
            role: response.role,
          })
          if (
            this.$store.state.user.role == 'PROMOTER' || this.$store.state.user.role == 'STUDENT' || this.$store.state.user.role == 'TEACHER'
          ) {
            localStore.setToken({
              access_token: response.token,
              refresh_token: response.refreshToken,
            })
            this.$store.dispatch('setToken', response.refreshToken)
            this.$store.dispatch('setRefresh', response.refreshToken)
          } else {
            throw new Error('Utilisateur : Les informations éntrées sont incorrectees')
          }

          this.isloading = false
          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl)
          } else  {
            if (this.$store.state.user.role == 'PROMOTER') this.$router.push('/dashboard')
            else this.$router.push('/profile')
          }
        }
      } catch (error) {
        this.isloading = false

        //console.log(error)
        this.error = error.response ? error.response.data.error : error.message
      }
    },
  },
}
</script>
<style></style>
