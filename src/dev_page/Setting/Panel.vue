<template>
  <div class="mr-3 ml-3">
    <h1 type="success">{{ title }}</h1>

    <div class="row ">
      <div class="col-md-8">
        <slot name="table">
          <card raised>
            <tables
              ref="table"
              :data="data"
              :head="columns"
              @check="checked"
            ></tables>
          </card>
        </slot>
      </div>
      <div class="col-md-4">
        <slot name="show"> </slot>
      </div>
    </div>
  </div>
</template>
<script>
import { Alert, Card, Button, FormGroupInput, Tables } from '@/components'
import BookServices from '@/services/BookServices'

export default {
  name: 'showclass',
  props: {
    title: String,
    data: String,
    columns: Array,
  },
  components: {
    Card,
    Alert,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    Tables,
  },
  methods: {
    checked(rows) {
      this.$emit('checked', rows)
    },
    refresh() {
      this.$refs.table.refresh()
    },
  },
}
</script>
<style>
.starter-page {
  min-height: calc(100vh - 95px);
}
</style>
