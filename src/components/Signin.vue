<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
        <form class="mt-2"> 
          <button @click.prevent="signUp" class="btn btn-info float-right">Sign Up</button>
          
          <h3>Sign In</h3>

          Fill out this form to sign in:

          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input 
              @keyup.enter="signIn"
              type="password" class="form-control" v-model="password" placeholder="Password">
          </div>

          <div class="form-check">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input" checked>
              Remember me
            </label>
          </div>

          <button @click.prevent="signIn" class="btn btn-primary float-right">Sign In</button>

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
      error: {
        message: ''
      }
    }
  },
  methods: {
    signUp () {
      this.$router.push('/signup')
    },
    signIn () {
      if (!this.email) {
        this.error.message = 'Please enter a valid email address'
        return
      }
      if (!this.password) {
        this.error.message = 'Please enter your password'
        return
      }
      this.error.message = ''
      firebaseApp.auth().signInWithEmailAndPassword(this.email, this.password)
        .catch(err => {
          console.log(err)
          this.error.message = err.message
        })
    }
  }
}
</script>
