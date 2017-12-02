<template>
  <div class="container">

    <button class="btn btn-danger float-right" @click="signOut">Sign Out</button>

    <h3>Events Dashboard</h3>    

    <hr>
    <add-event></add-event>

    <hr>
    <div class="card-columns">
      <event-item
        v-for="(event, index) in $store.state.events"
        :key="index"
        :event="event"
        :user="$store.state.user"
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
    // receive the current events from the DB and save the to the store
    eventsRef.on('value', snap => {
      let events = []
      snap.forEach(event => {
        let evt = event.val()
        evt.id = event.key
        events.push(evt)
      })
      this.$store.dispatch('setEvents', events)
    })
  }
}
</script>
