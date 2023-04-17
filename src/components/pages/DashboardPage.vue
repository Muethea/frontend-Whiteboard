<template>
    <NavBarP/>
  <div class="new">
    <h3>Create a board</h3>
    <div>
      <div class="col-sm-3">
         <router-link to="/whiteboard">
        <div class="card">
          <div class="card-body1 cardnew">
           
              <font-awesome-icon icon="fa-solid fa-circle-plus" />
           
            <h5 class="card-title">New board</h5>
          </div>
          
        </div>
         </router-link>
      </div>

    </div>
  </div>


  <div class="back">
  <div class="recent">
    <h5>Recent boards</h5>

    <div class="card-grup">
      <div  v-for="titles in dashboard" :key="titles.id">
        <div class="card">
          <div class="card-body">
          </div>
          <div class="card-footer">
           <h5 class="card-title">{{ titles.title }} </h5>
          </div>
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
import NavBarP from '../Navbar/NavBarP.vue'
export default {
    data() {
        return {
            dashboard: [],
        };
    },
    computed: {
        ...mapGetters("auth", {
            token: GET_USER_TOKEN_GETTER
        })
    },

    mounted() {
        this.showLoading(true);
        axiosInstance.get(`https://login-vue-6c892-default-rtdb.firebaseio.com/posts.json`).then(response => {
            this.formatDashboard(response.data);
            this.showLoading(false);
        }).catch(() => {
            this.showLoading(false);
        });
    },
    methods: {
        ...mapMutations({
            showLoading: LOADING_SPINNER_SHOW_MUTATION
        }),
        formatDashboard(dashboard) {
            for (let key in dashboard) {
                this.dashboard.push({ ...dashboard[key], id: key });
            }
            console.log(this.dashboard);
        }
    },
    components: { NavBarP }
}
</script>

<style scoped>

.new {
  margin: 3rem 2rem;

}

.card-group {
  margin: 0 1rem;
}

.back{
  margin-top: 8rem;
  border-top: 1px solid rgba(0, 0, 0, 0.206);
  height: 60vh;
  background: rgba(210, 210, 210, 0.244);
}
.recent {
  padding-top: 1rem;
  padding-bottom: 2rem;

  margin: 2rem 2rem;
}

.card-body1 {
   width: 22rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.card{
  cursor: pointer;
  width: 22rem;
  height: 15rem;
}

.cardnew {

  height: 15rem;
}

.card-grup{
  padding-top: 2rem;
  display: grid;
  display: flex;
  gap: 1rem;
}

.card:hover{
  border: 3px solid rgba(46, 46, 135, 0.317);
}

</style>