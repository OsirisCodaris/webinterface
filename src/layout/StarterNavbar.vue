<template>
  <navbar position="fixed" type="default" menu-classes="ml-auto">
    <template slot-scope="">
      <router-link class="navbar-brand" to="/">
        <img src="logo.png" width="40" />
        Academia
      </router-link>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item" v-if="$store.state.isUserLoggedIn && $store.state.user.role == 'PROMOTER'">
        <a class="nav-link" href="#">
          <i class="now-ui-icons design_palette"></i>
          <p>Tableau de bord</p>
        </a>
      </li>
      <li class="nav-item" v-if="$store.state.isUserLoggedIn && ($store.state.user.role == 'STUDENT'|| $store.state.user.role == 'TEACHER')">
        <a class="nav-link" href="#">
          <i class="now-ui-icons shopping_cart-simple"></i>
          <p>Abonnement</p>
        </a>
      </li>
      <li class="nav-item" v-if="$store.state.isUserLoggedIn">
       
          <a class="nav-link" @click="logout">
            <i class="now-ui-icons media-1_button-power"></i>
            <p>Déconnexion</p>
          </a>
       
      </li>

      <li class="nav-item" v-else>
        <a class="nav-link" href="/login">
          <i class="now-ui-icons users_circle-08"></i>
          <p>Se connecter</p>
        </a>
      </li>
    </template>
  </navbar>
</template>

<script>
import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components'
import LocalStorageService from '@/store/localstorageservice'

export default {
  name: 'main-navbar',
  components: {
    DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
  },
  methods: {
    logout() {
      const localStorageService = LocalStorageService.getService()
      localStorageService.clearToken()
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setRefresh', null)
      this.$router.push('/')
    },
  },
}
</script>

<style scoped></style>
