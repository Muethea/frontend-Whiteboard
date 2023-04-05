<template>
  <nav class="navbar  navbar-expand-lg navbar-black bg-ligth">

    <router-link class="navbar-brand" to="/">White<span>board</span></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard" v-if="isAuthenticated">Dasboard</router-link>
        </li>

        <li class="nav-item" v-if="isAuthenticated">
          <a href="#" class="nav-link" @click.prevent="onLogout()">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { IS_USER_AUTHENTICATE_GETTER, LOGOUT_ACTION } from '@/store/modules/auth/storeconstants'
import { mapActions, mapGetters } from 'vuex'
export default {

  computed: {
    ...mapGetters('auth', {
      isAuthenticated: IS_USER_AUTHENTICATE_GETTER,
    })
  },

  methods: {

    ...mapActions('auth', {
      logout: LOGOUT_ACTION,
    }),
    onLogout() {
      this.logout();
      this.$router.replace('/login');
    },
  }

}
</script>

<style scoped>
    nav{
     margin: 0 1rem;
    }
</style>