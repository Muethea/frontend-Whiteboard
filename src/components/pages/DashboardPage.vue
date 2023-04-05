<template>
  <div class="new">
    <h3>Create a board</h3>
    <div class="row card-group " style="text-align: center;">
      <div class="col-sm-3">
        <div class="card">
          <div class="card-body1 cardnew">
            <router-link to="/whiteboard">
              <font-awesome-icon icon="fa-solid fa-circle-plus" />
            </router-link>
            <h5 class="card-title">New board</h5>
          </div>
        </div>
      </div>

    </div>
  </div>


  <div class="recent">
    <h3>Recent boards</h3>
    <div class="row card-group row-cols-1 row-cols-md-2 g-5">
      <div class="col" v-for="titles in dashboard" :key="titles.id">
        <div class="card">
          <!-- Split dropend button -->
          <div class="btn-group dropend">
            <button type="button" class="btn btn-secondary">
              Split dropend
            </button>
            <button class="btn btn-secondary " type="button" id="dropdownMenuButton" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
            </button>
            <ul class="dropdown-menu">
              <a class="dropdown-item" href="#">Share</a>
              <a class="dropdown-item" href="#">Rename</a>
              <a class="dropdown-item" href="#">Duplicate</a>

              <a class="dropdown-item bg-danger" href="#">Delete</a>

            </ul>
          </div>

          <div class="card-body">
            <h5 class="card-title">{{ titles.title }} </h5>
            <p class="card-text">{{ titles.description }}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import { GET_USER_TOKEN_GETTER, LOADING_SPINNER_SHOW_MUTATION } from '@/store/modules/auth/storeconstants'

import axiosInstance from '@/services/AxiosTokenInstance'
import { mapGetters, mapMutations } from 'vuex'
export default {



  data() {
    return {
      dashboard: [],

    }
  },


  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN_GETTER
    })
  },

  mounted() {

    this.showLoading(true)

    axiosInstance.get(`https://login-vue-6c892-default-rtdb.firebaseio.com/posts.json`).then(response => {
      this.formatDashboard(response.data)
      this.showLoading(false)
    }).catch(() => {
      this.showLoading(false)
    })
  },

  methods: {

    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION
    }),

    formatDashboard(dashboard) {
      for (let key in dashboard) {
        this.dashboard.push({ ...dashboard[key], id: key })
      }

      console.log(this.dashboard)
    }

  }
}
</script>

<style scoped>
.new {
  margin: 3rem 2rem;
}

.card-group {
  margin: 0 1rem;
}

.recent {
  margin: 10rem 2rem;
}

.card-body1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.cardnew {

  height: 15rem;
}

@media (min-width: 40em){
  
}
</style>