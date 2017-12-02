<template>
  <div class="card mb-3">

    <div class="card-header text-center"" :class="[ eventOwner ? 'bg-success' : '']">
      <strong 
        v-show="editing!=='title'"
        @click="editField('title')"
      >{{ event.title }}</strong>
      <input 
        v-show="eventOwner && editing==='title'" 
        @blur="abortEdit('title')" 
        @keyup.enter="editEvent('title')" 
        v-model="event.title"
        ref="inputtitle"
      >
    </div>

    <div class="card-body text-center">

      <h5 class="card-title"">
        <span 
          v-show="editing!=='location'" 
          @click="editField('location')"
        >&#127757; {{ event.location }}</span>
        <input 
          v-show="eventOwner && editing==='location'" 
          @blur="abortEdit('location')" 
          @keyup.enter="editEvent('location')" 
          v-model="event.location"
          ref="inputlocation"
        >
      </h5>

      <h6 class="card-subtitle text-muted">
        <span
          v-show="editing!=='date'" 
          @click="editField('date')"
        >&#128198; {{ event.date }}</span>
        <div class="input-group input-group-sm"
          @blur="abortEdit('date')" 
          v-show="eventOwner && editing==='date'"
        >
          <input type="date" 
            class="form-control"
            v-show="eventOwner && editing==='date'" 
            v-model="event.date"
            ref="inputdate"
          ><span class="input-group-btn">
            <button 
              @click="editEvent('date')"
              class="btn btn-sm btn-light" type="button">Go!</button>
            <button 
              @click="abortEdit('date')"
              class="btn btn-sm btn-secondary" type="button">&times;</button>
          </span>
        </div>
      </h6>

      <p class="card-text">
        <span
          v-show="editing!=='description'" 
          @click="editField('description')"
        >{{event.description}}</span>
        <input style="width:100%"
          v-show="eventOwner && editing==='description'" 
          @blur="abortEdit('description')" 
          @keyup.enter="editEvent('description')" 
          v-model="event.description"
          ref="inputdescription"
        >
      </p>
    </div>


    <ul class="list-group list-group-flush text-center" title="Host">
      <li class="list-group-item">&#128100; {{ eventOwner ? 'you' : event.email }}</li>
    </ul>

    <div class="card-footer text-muted text-right">
      <span class="float-left">
        <span title="Likes">&#10084; {{ event.likes || 0 }}</span> | 
        <span title="Joins">&#128101; {{ event.joins || 0 }}</span>
      </span>

      <!-- is user owner of this event? -->
      <span v-if="eventOwner">
        <a @click="deleteEvent" href="#" class="text-danger">&#10008;<small>delete</small></a>  
      </span>
      <span v-else>
        <a href="#" title="Like!">&#128150;<small>like</small></a> |
        <a href="#" title="Join!">&#127915;<small>join</small></a>
      </span>      
    </div>

  </div>
</template>

<script>
import { eventsRef } from '../firebaseApp'

export default {
  props: ['event', 'user'],
  data () {
    return {
      editing: '',
      oldEvent: {}
    }
  },
  computed: {
    eventOwner () {
      return this.event.email === this.user.email
    }
  },
  methods: {
    deleteEvent () {
      let message = 'You are about to delete the event<br>"' + this.event.title + '" on ' + this.event.date
      this.$dialog.confirm(message, {
          html: true, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
          cancelText: 'Cancel',
          loader: true // default: false - when set to true, the proceed button shows a loader when clicked.
                // And a dialog object will be passed to the then() callback
      })
        .then((dialog) => {
          // dialog.loading(false) // stops the proceed button's loader
          // dialog.loading(true) // starts the proceed button's loader again
          // dialog.close() // stops the loader and close the dialog
          console.log('Delete action completed ')
          eventsRef.child(this.event.id).remove()
            .then(val => dialog.close())
        })
        .catch(() => {
            // Triggered when cancel button is clicked
            console.log('Delete aborted');
        });
    },
    editEvent (field) {
      this.editing = '' // disable edit mode for this field
      // do nothing if the value wasn't updated
      if (this.event[field] === this.oldEvent[field]) return
      // get a ref of the field in the event in the db and set the new value
      eventsRef.child(this.event.id).child(field).set(this.event[field])
    },
    editField (field) {
      // only the owner of an event can edit a field
      if (!this.eventOwner) return
      this.editing = field
      setTimeout(() => {
        this.$refs['input'+field].focus()
      }, 500)
    },
    abortEdit (field) {
      console.log('aborting edit', field)
      // ignore if the editing already is done
      if (this.editing !== field) return
      // when a user aborts the edit operation, we do not want to show the updated value 
      this.editing = ''
      this.event[field] = this.oldEvent[field]
    }
  },
  created () {
    // get a copy of the original data
    this.oldEvent.title = this.event.title
    this.oldEvent.location = this.event.location
    this.oldEvent.description = this.event.description
    this.oldEvent.date = this.event.date
  }
}
</script>
