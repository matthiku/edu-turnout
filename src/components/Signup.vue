<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
        <form> 
          
          <h3>Sign up for Turnout!</h3> 

          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input 
              type="email" 
              class="form-control" 
              v-model="email" 
              @keyup.enter="signUp"
              aria-describedby="emailHelp" 
              placeholder="Enter email"
            >
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Password">
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Repeat Password</label>
            <input 
              type="password" 
              class="form-control" 
              v-model="repeatPassword" 
              @keyup.enter="signUp"
              placeholder="repeat password"
            >
          </div>

          <button @click.prevent="signUp" class="btn btn-primary float-right">Sign Up</button>

          <div class="form-check">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input">
              Don't Remember me
            </label>
          </div>

          <div v-show="error.message" class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
            <strong>Error!</strong> {{ error.message }}
            <button type="button" class="close" @click="error.message=''" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseApp } from '../firebaseApp'

export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      error: {
        message: ''
      }
    }
  },
  methods: {
    signUp () {
      this.error.message = ''
      if (!this.email) {
        this.error.message = 'Please enter a valid email address'
        return
      }
      if (!this.password) {
        this.error.message = 'Please enter your password'
        return
      }
      if (!this.password === this.repeatPassword) {
        this.error.message = 'Passwords are not identical'
        return
      }
      firebaseApp.auth().createUserWithEmailAndPassword(this.email, this.password)
        .catch(err => {
          console.log(err)
          this.error.message = err.message
        })
    }
  }
}
</script>
