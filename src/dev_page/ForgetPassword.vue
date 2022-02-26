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
            <h2>Réinitialisation</h2>
            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Entrez Votre mail..."
              v-model="email"
            >
            </fg-input>
            <alert type="success" v-if="message" class="col-12">{{
              message
            }}</alert>

            <alert type="danger" v-if="error" class="col-12">{{ error }}</alert>
            <template slot="raw-content">
              <div class="card-footer text-center">
                <n-button type="default" @click="login" round
                  >Envoyez
                  <div class="fas fa-spinner fa-pulse" v-if="isloading"></div>
                </n-button>
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
      email: '',
      error: false,
      message: false,
    }
  },
  methods: {
    async login() {
      try {
        this.isloading = true
        this.error = false
        this.message = false
        if (this.email) {
          const response = (
            await AuthentificationServices.reset({ email: this.email })
          ).data
          this.isloading = false
          this.message = response.message
        }
      } catch (error) {
        this.isloading = false
        this.error = error.response ? error.response.data.error : error
      }
    },
  },
}
</script>
<style></style>
