<template>
  <div>
        <div class="back">
          <h1>Create an account</h1>
      

        </div>
    <!-- Section: Design Block -->
    <section class="signform">


      <div class="card mx-4 mx-md-5 shadow-5-strong" style="
          
                                    background: hsla(0, 0%, 100%, 0.8);
                                    backdrop-filter: blur(30px);
                                    ">
        <div class="card-body py-5 px-md-5">

          <div >
            <div >
          
              <form @submit.prevent="Signup()">
                    <h2 class="fw-bold mb-5" style="text-align: center;">Sign up now</h2>
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <label class="form-label">Full name</label>
                      <input type="text" id="form3Example1" class="form-control" placeholder="John Smit"
                        v-model="fullname" />
                    </div>
                  </div>

                </div>

                <div class="alert alert-danger" v-if="error">{{ error }}</div>
                <!-- Email input -->
                <div class="form-outline mb-4">
                  <label class="form-label">Email </label>

                  <input type="email" class="form-control" placeholder="your email" v-model="email" />
                  <div class="error" v-if="errors.email">
                    {{ errors.email }}
                  </div>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <label class="form-label">Password</label>

                  <input type="password" class="form-control" placeholder="password" v-model="password" />
                  <div class="error" v-if="errors.password">
                    {{ errors.password }}
                  </div>
                </div>

                <!-- Submit button -->
                <div class="btns">
                  <!-- Submit button -->
                  <button type="submit" class="btn btn-primary btn-block mb-4">
                    Sign up
                  </button>

                  <router-link to="/login">Don't have an acoount</router-link>
                </div>



              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section: Design Block -->
  </div>
</template>

<script>
import SignupValidations from '@/services/SignupValidations';
import { mapActions, mapMutations } from 'vuex';
import { LOADING_SPINNER_SHOW_MUTATION, SIGNUP_ACTION } from '@/store/modules/auth/storeconstants';

export default {
  data() {
    return {
      fullname: '',
      email: '',
      password: '',
      errors: [],
      error: ''


    }
  },

  methods: {

    ...mapActions('auth', {
      signup: SIGNUP_ACTION
    }),

    beforeRouteLeave() {
      console.log('beforeRouteLeave')
      console.log(this.$store)
    },

    beforeRouteEnter(_, _1, next) {
      next(vm => {
        console.log('Enter')
        console.log(vm.$store.state.auth)
      })
    }
    ,
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION
    })
    ,
    async Signup() {
      let validations = new SignupValidations(
        this.email, this.password
      );
      this.errors = validations.checkValidations()
      if ('email' in this.errors || 'password' in this.errors) {
        return false;

      }

      this.showLoading(true)


      await this.signup({
        email: this.email,
        password: this.password
      }).catch(error => {
        this.error = error;
        this.showLoading(false)
      })

      this.showLoading(false)
      this.$router.push('/login');
    }
  }

}
</script>
<style scoped>


main {
  max-width: 33rem;
  margin: 0 auto;
}
.card {
  
  display: flex;
  justify-content: center;
  margin-top: 6rem;
  
}


.back {
  
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 200rem;
  height: 29rem;
 background-image: url('https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  
}

@media (min-width: 700px) {

main {
  max-width: 1020px;
  margin: 0 auto;
}

.back {
  padding: 3rem;
  color:#fcfcff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 50rem;
  height: 100rem;
  background:#bcd;
}



  *{
    box-sizing: border-box;
  }
  .signform{
      display: flex;
  justify-content: center;

width: 58rem;
margin: 0 auto;
  }
.card {

  height: 30rem;
  padding: 3rem;
  margin-top: 8rem;
}




input{
  width: 21rem;
}



}
</style>