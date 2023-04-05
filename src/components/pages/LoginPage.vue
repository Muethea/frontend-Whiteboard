<template>
  <main>

    <div class="back">
    </div>
    <div class="loginform container ">


      <div class="card  ">


        <h2>Login</h2>
        <div class="alert alert-danger" v-if="error">{{ error }}</div>
        <form @submit.prevent="Login()">
          <!-- Email input -->
          <div class="form-outline ">
            <label class="form-label">Email </label>

            <input type="email" class="form-control" placeholder="your email" v-model.trim="email" />
            <div class="error" v-if="errors.email">
              {{ errors.email }}
            </div>
          </div>

          <!-- Password input -->
          <div class="form-outline ">
            <label class="form-label">Password</label>

            <input type="password" class="form-control" placeholder="password" v-model.trim="password" />
            <div class="error" v-if="errors.password">
              {{ errors.password }}
            </div>
          </div>

          <div class="btns">
            <!-- Submit button -->
            <button type="submit" class=" btnlogin">
              Login
            </button>

            <router-link to="/singup">Don't have an acoount</router-link>
          </div>



        </form>
      </div>

    </div>

    <!-- Section: Design Block -->
  </main>
</template>

<script>


import SignupValidations from '@/services/SignupValidations'
import { LOADING_SPINNER_SHOW_MUTATION, LOGIN_ACTION } from '@/store/modules/auth/storeconstants';
import { mapActions, mapMutations } from 'vuex';

export default {

  data() {
    return {
      email: '',
      password: '',
      errors: [],
      error: ''

    }
  },

  methods: {

    ...mapActions('auth', {
      login: LOGIN_ACTION
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async Login() {
      let validations = new SignupValidations(
        this.email,
        this.password,
      );

      this.errors = validations.checkValidations();
      if (this.errors.length) {
        return false;
      }
      this.error = '';

      this.showLoading(true);
      //Login check
      try {
        await this.login({
          email: this.email,
          password: this.password,
        });
      } catch (e) {
        this.error = e;
        this.showLoading(false);
      }

      this.showLoading(false);
      this.$router.push('/dashboard');
    },

  }


}
</script>
<style scoped>
.card {
  margin-top: -100px;
  background: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: blur(30px);

  height: 26rem;
  padding: 3rem;
  margin-top: 8rem;
}

.card h2 {
  color: #000000;
  text-align: center;
}

label {
  font-style: 600;
  font-size: 1.2rem;
}

.btnlogin {
  border: none;
  width: 8rem;
  height: 3rem;
  color: #fff;
  font-size: 1.3rem;
  border-radius: .3rem;
  background: rgb(131, 58, 180);
}

.btnlogin:hover {
  font-style: bold;
  background: rgb(95, 63, 116);
}

.back {
  position: fixed;
  top: 0;
  z-index: 0;
  width: 200rem;
  height: 22rem;
  background: rgb(131, 58, 180);
  background: linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);
}



form {

  display: flex;
  gap: 2rem;
  flex-direction: column;
}

@media (min-width: 40em) {
.card {
  margin-top: -100px;
  background: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: blur(30px);
width: 38rem;
margin: 0 auto;
  height: 26rem;
  padding: 3rem;
  margin-top: 8rem;
}

.card h2 {
    color: #000000;
  text-align: center;
}

}
</style>