<template>
  <div class="container">
    <h3>Events Dashboard</h3>
    <button class="btn btn-danger float-right" @click="signOut">Sign Out</button>
    <p>
      {{ $store.state }}
    </p>
  </div>
</template>

<script>
import { firebaseApp } from '../firebaseApp'

export default {
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
      firebaseApp.auth().signOut()
    }
  }
}
</script>
