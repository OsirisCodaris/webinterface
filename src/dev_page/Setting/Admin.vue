<template>
  <card raised>
    <h4 class="card-title">
      <div class="row">
        <div class="text-left text-muted col-6">
          {{ title }}
        </div>
        <div class="text-right text-muted col-6">
          {{ data.length }}
        </div>
      </div>
    </h4>
    <div class="card-text blockquote">
      <div class="row">
        <div class="input-lg m-3">
          <select
            class="custom-select "
            id="inputGroupSelect01"
            v-model="form.admin.role"
          >
            <option selected value="-1">Administrateur...</option>
            <option value="CODARIS">Codaris</option>
            <option value="ACADEMIA">Académia</option>
          </select>
        </div>
        <fg-input
          class="no-border input-lg col-12"
          addon-left-icon="now-ui-icons users_circle-08"
          placeholder="Nom complet..."
          v-model="form.user.fullname"
        >
        </fg-input>
        <fg-input
          class="no-border input-lg col-12"
          addon-left-icon="now-ui-icons ui-1_email-85"
          placeholder="Email..."
          type="email"
          v-model="form.user.email"
        >
        </fg-input>

        <fg-input
          class="no-border input-lg col-md-12"
          addon-left-icon="now-ui-icons tech_mobile"
          placeholder="Téléphone ..."
          type="number"
          v-model="form.user.phone"
        >
        </fg-input>

        <fg-input
          class="no-border input-lg col-md-12"
          addon-left-icon="now-ui-icons objects_key-25"
          placeholder="Mot de passe..."
          type="password"
          v-model="form.user.password"
        >
        </fg-input>
        <fg-input
          class="no-border input-lg col-md-12"
          addon-left-icon="now-ui-icons objects_key-25"
          placeholder="Confirmer le mot de passe..."
          type="password"
          v-model="confirm"
        >
        </fg-input>
      </div>
    </div>
    <div class="row">
      <div class="text-left col-6">
        <n-button type="danger" @click="deleted">Supprimer</n-button>
      </div>
      <div class="text-right col-6" v-if="data.length <= 1">
        <n-button type="success" @click="register">Enregistrer</n-button>
      </div>
    </div>
  </card>
</template>
<script>
import { Alert, Card, Button, FormGroupInput } from '@/components'

export default {
  name: 'admin',
  bodyClass: 'login-page',
  props: {
    title: String,
    data: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
  },
  components: {
    Card,
    Alert,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      idadmins: 0,
      form: {
        user: {
          fullname: this.name,
          email: '',
          phone: '',
          password: '',
        },
        admin: {
          role: -1,
        },
      },
      confirm: undefined,
    }
  },
  methods: {
    setData(data) {
      this.idadmins = 0
      this.form = {
        user: {
          fullname: this.name,
          email: '',
          phone: '',
          password: undefined,
        },
        admin: {
          role: -1,
        },
      }
      this.confirm = undefined
      if (data) {
        this.idadmins = data.idadmins
        this.form.user.fullname = data.User.fullname
        this.form.user.email = data.User.email
        this.form.user.phone = data.User.phone
        this.form.admin.role = data.role
        this.form.user.password = undefined
      }
    },
    deleted() {
      this.$emit('delete', this.data)
    },
    register() {
      if (this.idadmins != 0) {
        this.$emit(
          'update',
          { row: this.form, id: this.idadmins },
          this.confirm
        )
      } else if (this.data.length === 0) {
        this.$emit('insert', this.form, this.confirm)
      }
    },
    resetData() {
      if (this.data.length > 1) [(this.data = [])]
    },
  },
}
</script>
<style>
.starter-page {
  min-height: calc(100vh - 95px);
}
</style>
