<template>
  <h1>Add new Whiteboard</h1>

  <form @submit.prevent="AddNewwhite">
    <div class="my-2">
      <label for="">Title</label>
      <input type="text" class="form-control" v-model="post.title">

    </div>

    <div class="my-2">
      <label for="">Description</label>
      <textarea name="" id="" cols="30" rows="10" class="form-control" v-model="post.description"></textarea>

    </div>

    <div class="my-2">
      <button class="btn btn-primary">
        Add Post
      </button>

    </div>


  </form>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import { LOADING_SPINNER_SHOW_MUTATION } from '@/store/modules/auth/storeconstants' 
export default {

  data() {
    return {
      post: {
        title: '',
        description: ''
      }

    }
  },

  methods: {
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION
    }),
    AddNewwhite() {

      axios.post(`https://login-vue-6c892-default-rtdb.firebaseio.com/posts.json`, this.post).then(response => {
        console.log(response)
      })

    }
    
  }



}
</script>

<style></style>