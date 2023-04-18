<template>
  <main>

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

.card h2 {
  color: #000000;
 
}

.card{
  border: none;
}
.btnlogin{
  background-color: #4c49d1;
  color: #fff;
  width: 7rem;
  height: 2.4rem;
  border: none;
  border-radius: .5rem;
}
/* Mobile phones */
@media only screen and (max-width: 480px) {
  /* CSS styles for mobile phones */

.btnlogin{
  background-color: #4c49d1;
  color: #fff;
  width: 7rem;
  height: 2.4rem;
  border: none;
  border-radius: .5rem;
}

.btnlogin:hover{
    background-color: #7673ed;
}
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
 
}

label {
  font-style: 600;
  font-size: 1.2rem;
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
.loginform{
  margin-top: 20rem;
}

main {
  max-width: 33rem;
  margin: 0 auto;
}




form {

  display: flex;
  gap: 2rem;
  flex-direction: column;
}
}

/* Tablets */
@media only screen and (min-width: 481px) and (max-width: 768px) {
  /* CSS styles for tablets */

.btnlogin{
  background-color: #4c49d1;
  color: #fff;
  width: 7rem;
  height: 2.4rem;
  border: none;
  border-radius: .5rem;
}

.btnlogin:hover{
    background-color: #7673ed;
}
.card {
  background: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: blur(30px);
width: 30rem;
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


.back {
  padding: 3rem 3rem;
  color:#fcfcff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
width: 100vw;
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
.loginform{
  margin-top: 20rem;
}

main {
  max-width: 33rem;
  margin: 0 auto;
}




form {

  display: flex;
  gap: 2rem;
  flex-direction: column;
}
}

/* Laptops and desktops */
@media only screen and (min-width: 768px) and (max-width: 992px) {
  /* CSS styles for laptops and desktops */
form {

  display: flex;
  gap: 2rem;
  flex-direction: column;
}
.btnlogin{
  background-color: #4c49d1;
  color: #fff;
  width: 7rem;
  height: 2.4rem;
  border: none;
  border-radius: .5rem;
}

  main{
    max-width: none;
    margin: 0 auto;
  }
.loginform{


  margin-top: 14rem;

}

.back {
  color:#fcfcff;
  position: fixed;
  top: 0;
  left: 0;
  width: 25rem;
  height: 100%;
  z-index: 0;
 background-color: #f2f2f2;
  background-image: radial-gradient(#000 5%, transparent 5%),
                    radial-gradient(#000 5%, transparent 5%);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
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
  left: 4rem;
  color: #000000;
    background: rgb(255, 255, 255);
}

.card4{
    position: relative;
  top: 7rem;
    left: 1rem;
    background: rgb(44, 7, 164);
}

.card {
  background: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: blur(30px);
width: 30rem;
margin: 0 auto;
  height: 26rem;
  padding: 3rem;
  margin-top: 15rem;
}

.card h2 {
    color: #000000;

}
}

@media only screen and (min-width: 992px) {
form {

  display: flex;
  gap: 2rem;
  flex-direction: column;
}
  main{
    max-width: 33rem;
    margin: 0 auto;
  }



.back {
  color:#fcfcff;
  position: fixed;
  top: 0;
  left: 0;
  width: 30rem;
  height: 100%;
  z-index: 0;
 background-color: #f2f2f2;
  background-image: radial-gradient(#000 5%, transparent 5%),
                    radial-gradient(#000 5%, transparent 5%);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
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

.card {
  background: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: blur(30px);
width: 30rem;
margin: 0 auto;
  height: 26rem;
  padding: 3rem;
  margin-top: 15rem;
}

.card h2 {
    color: #000000;

}
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {

.loginform{
  margin-top: -4rem;
}
form {

  display: flex;
  gap: 2rem;
  flex-direction: column;
}
  main{
    max-width: 6rem;
    margin: 0 auto;
  }



.back {
  color:#fcfcff;
  position: fixed;
  top: 0;
  left: 0;
  width: 32rem;
  height: 100%;
  z-index: 0;
 background-color: #f2f2f2;
  background-image: radial-gradient(#000 5%, transparent 5%),
                    radial-gradient(#000 5%, transparent 5%);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
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
   position: relative;
  top: 3rem;
  left: 5rem;
  transform: rotate(-30deg);

    background: orange;
}

.card3{
  position: relative;
  top: 4rem;
  left: 20rem;
  color: #000000;
    background: rgb(255, 255, 255);
}

.card4{
    position: relative;
  top: 7rem;
    left: 3rem;
    background: rgb(44, 7, 164);
}

.card {
  background: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: blur(30px);
width: 30rem;
margin: 0 auto;
  height: 26rem;
  padding: 3rem;
  margin-top: 15rem;
}

.card h2 {
    color: #000000;
  margin-bottom: 3rem;
}
}

/* XX-Large devices (larger desktops, 1400px and up) */

@media (min-width: 1400px) { 

.loginform{
  margin-top: none;
}
form {

  display: flex;
  gap: 2rem;
  flex-direction: column;
}
  main{
    max-width: 16rem;
    margin: 0 auto;
  }



.back {
  color:#fcfcff;
  position: fixed;
  top: 0;
  left: 0;
  width: 45rem;
  height: 100%;
  z-index: 0;
 background-color: #f2f2f2;
  background-image: radial-gradient(#000 5%, transparent 5%),
                    radial-gradient(#000 5%, transparent 5%);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
}

.card2, .card3, .card4{
  padding: 1.5rem;
  width: 15rem;
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
    top: 4rem;
    left:5rem;
    position: relative;
  transform: rotate(-30deg);

    background: orange;
}

.card3{
  position: relative;
  top: 7rem;
  left: 23rem;
  color: #000000;
    background: rgb(255, 255, 255);
}

.card4{
    position: relative;
  top: 20rem;
    left: 5rem;
    background: rgb(44, 7, 164);
}

.card {
  background: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: blur(30px);
width: 43rem;
margin: 0 auto;
  height: 26rem;
  padding: 3rem;
  margin-top: 15rem;
}

.card h2 {
    color: #000000;
  text-align: center;
}
}


</style>