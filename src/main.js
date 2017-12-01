import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { firebaseApp } from './firebaseApp'

import App from './components/App.vue'

import Signin from './components/Signin.vue'
import SignUp from './components/SignUp.vue'
import Dashboard from './components/Dashboard.vue'
import AddEvent from './components/AddEvent.vue'

import store from './store'

Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/dashboard', component: Dashboard },
    { path: '/addevent', component: AddEvent },
    { path: '/signin', component: Signin },
    { path: '/signup', component: SignUp }
  ]
})

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('signIn', user)
    router.push('/dashboard')
  } else {
    router.replace('./signin')
  }
})

var x = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
