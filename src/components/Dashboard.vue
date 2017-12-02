<template>
  <div class="container">

    <button class="btn btn-danger float-right" @click="signOut">Sign Out</button>

    <h3>Events Dashboard</h3>    

    <hr>
    <add-event></add-event>

    <hr>
    <div class="row mb-2">
      <event-item
        v-for="(event, index) in $store.state.events"
        :key="index"
        :event="event"
      ></event-item>
    </div>

  </div>
</template>

<script>
import { firebaseApp, eventsRef } from '../firebaseApp'
import AddEvent from './AddEvent.vue'
import EventItem from './EventItem.vue'

export default {
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
      firebaseApp.auth().signOut()
    }
  },
  components: {
    AddEvent,
    EventItem
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
