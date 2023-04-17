<template>
    <div>

  <LoaderViewVue v-if="showLoading"/>
  <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import LoaderViewVue from './components/loader/LoaderView.vue'
import {  AUTO_LOGIN_ACTION } from './store/modules/auth/storeconstants'


export default {
  name: 'App',
  components: {
  
    LoaderViewVue
  },

  created(){
      this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`)
  },

  computed:{
    ...mapState({
      showLoading: state => state.showLoading
    })
  }
}
</script>

<style>
body{
  font-family: 'Poppins', sans-serif;
  background: #fff;
}
.btns{
  display: flex;
  justify-content: space-between;
}
a{
  text-decoration: none;
}

</style>
