<template>
  <div>
        <div class="back">
     

        <div class="card2">
          <div class="pont"></div>
          <p>Connect with your creativity </p>

        </div>

          <div class="card3">
                  <div class="pont"></div>
            <p>Build, create, and innovate</p>

          </div>

              <div class="card4">
                      <div class="pont"></div>
              <p>Turn your ideas into reality </p>

            </div>
      </div>
    <!-- Section: Design Block -->
    <section class="signform">


      <div class="card mx-4 mx-md-5 shadow-5-strong">
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
                  <button type="submit" class="btnSingup">
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
.btnSingup{
  background-color: #4c49d1;
  color: #fff;
  width: 7rem;
  height: 2.4rem;
  border: none;
  border-radius: .5rem;
}

.btnSingup:hover{
    background-color: #7673ed;
}

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
  padding: 3rem 3rem;
  color:#fcfcff;
  position: fixed;
  top: 0;
  z-index: 0;
width: 100%;
height: 24rem;
background: #e7e7e7;
  background-image: radial-gradient(#000 1%, transparent 5%),
                    radial-gradient(#000 1%, transparent 5%);
  background-position: 0 0, 25px 25px;
  background-size: 60px 60px;
}


.card2, .card3, .card4{
  padding: .4rem;
}

.card2{

    background: orange;
}

.card3{
  position: relative;
  top: 2rem;
  left: 3rem;
  color: #000000;
    background: rgb(255, 255, 255);
}

.card4{
  padding-left: 3rem;
    position: relative;
    right: 5rem;
  top: 4rem;

    background: rgb(44, 7, 164);
}
.signform{
  margin-top: 18rem;
}
@media (min-width: 700px) {

main {
  max-width: 1020px;
  margin: 0 auto;
}

.loginform{
  margin-top: 14rem;
}


.back {
  padding: 3rem 3rem;

  color:#fcfcff;
  position: fixed;
  top: 0;
  left: 0;
  width: 34rem;
  height: 100%;
  z-index: 0;
 background-color: #f2f2f2;
  background-image: radial-gradient(#000 5%, transparent 5%),
                    radial-gradient(#000 5%, transparent 5%);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
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


.card2, .card3, .card4{
  padding: 1.4rem;
  width: 10rem;
    border: 1px solid #ddd;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(rgba(0, 0, 0, 0.1) 2px, transparent 2px),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 2px, transparent 2px),
                    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
 
  font-size: 18px;
  transform: rotate(-3deg);

}

.pont{
  position: relative;
  top: -3rem;
  left: -2rem;
  width: 2rem;
  height: 2rem;
  background-image: url('../../assets/piker.png');
  background-position: center;
  background-size: 3rem;
  
  clip-path: circle();
}

.card2{
  transform: rotate(-30deg);

    background: orange;
}

.card3{
  position: relative;
  top: 4rem;
  left: 14rem;
  color: #000000;
    background: rgb(255, 255, 255);
}

.card4{
    position: relative;
  top: 7rem;
    left: 1rem;
    background: rgb(44, 7, 164);
}

}
</style>