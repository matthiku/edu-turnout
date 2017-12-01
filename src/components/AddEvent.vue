<template>
  <div class="">
    <label class="form-check-label">
      <input v-model="showForm" class="form-check-input" type="checkbox"> Add an event
    </label>
    <form v-if="showForm">

      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" v-model="event.title" placeholder="title">
      </div>

      <div class="form-group">
          <label>Description</label>
          <input type="text" class="form-control" v-model="event.description" placeholder="description">
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Date</label>
          <input type="date" class="form-control" v-model="event.date">
        </div>

        <div class="form-group col-md-6">
          <label>Location</label>
          <input 
            @keyup.enter="addEvent"
            type="text" class="form-control" v-model="event.location" placeholder="location">
        </div>
      </div>

      <button @click.prevent="addEvent" type="button" class="btn btn-primary">Submit</button>

      <div v-show="message" class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error!</strong> {{ message }}
        <button @click="message = ''" type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { eventsRef } from '../firebaseApp'

export default {
  data () {
    return {
      event: {
        title: '',
        description: '',
        date: '',
        location: '',
        email: ''
      },
      message: '',
      showForm: false
    }
  },
  methods: {
    addEvent () {
      this.message = ''
      if (!this.event.title || !this.event.description || !this.event.date || !this.event.location) {
        this.message = 'First fill out all fields in the form!'
        return
      }
      this.event.email = this.$store.state.user.email
      eventsRef.push(this.event)
      this.event.title = ''
      this.event.description = ''
      this.event.date = ''
      this.event.location = ''
      this.showForm = false
    }
  }
}
</script>
