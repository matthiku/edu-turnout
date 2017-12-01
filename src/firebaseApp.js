import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCzSsa8YyTvfIfb2oL7Tpzkj7xQW9I7bhc",
  authDomain: "turnout-vuex.firebaseapp.com",
  databaseURL: "https://turnout-vuex.firebaseio.com",
  projectId: "turnout-vuex",
  storageBucket: "turnout-vuex.appspot.com",
  messagingSenderId: "448546050504"
};

export const firebaseApp = firebase.initializeApp(config)

export const eventsRef = firebaseApp.database().ref().child('events')
