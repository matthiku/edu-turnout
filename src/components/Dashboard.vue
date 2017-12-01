<template>
  <div class="container">

    <button class="btn btn-danger float-right" @click="signOut">Sign Out</button>

    <h3>Events Dashboard</h3>    

    <hr>
    <add-event></add-event>

    <hr>
    <p>{{ $store.state }}</p>
  </div>
</template>

<script>
import { firebaseApp, eventsRef } from '../firebaseApp'
import AddEvent from './AddEvent.vue'

export default {
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
      firebaseApp.auth().signOut()
    }
  },
  components: {
    AddEvent
  },
  mounted () {
    eventsRef.on('value', snap => {
      let events = []
      snap.forEach(event => {
        events.push(event.val())
      })
      this.$store.dispatch('setEvents', events)
    })
  }
}
</script>
