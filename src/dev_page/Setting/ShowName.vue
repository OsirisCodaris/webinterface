<template>
  <card raised>
    <h4 class="card-title">
      <div class="row">
        <vue-confirm-dialog></vue-confirm-dialog>
        <div class="text-left text-muted col-6">
          {{ title }}
        </div>
        <div class="text-right text-muted col-6">
          {{ data.length }}
        </div>
      </div>
    </h4>
    <div class="card-text blockquote">
      <fg-input
        type="String"
        class="no-border input-lg"
        addon-left-icon="now-ui-icons users_circle-08"
        :placeholder="name || 'Entrez le nom...'"
        v-model="form.name"
        @click="resetData"
      >
      </fg-input>
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
import config from '@/services/Config'
export default {
  name: 'showclass',
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
      form: {
        name: this.name,
      },
    }
  },
  computed: {
    name() {
      var text = ''
      text = this.data.length === 1 ? this.data[0].name : ''
      if (this.data.length > 1) {
        this.data.forEach(element => {
          text = element.name + ';' + text
        })
      }
      return text
    },
  },
  methods: {
    deleted() {
      if (this.data.length >= 1) {
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
          callback: (confirm, password) => {
            if (confirm && password == config.password) {
              this.$emit('delete', this.data)
            } else if (confirm && password != config.password) {
              alert('Mauvais mot de passe')
            }
          },
        })
      }
    },
    register() {
      if (this.data.length === 1) {
        this.$emit('update', { row: this.data[0], name: this.form.name })
      } else if (this.data.length === 0) {
        this.$emit('insert', this.form)
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
