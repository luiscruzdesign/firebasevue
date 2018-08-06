// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDH7GguskNFmAhhlcZfHiCFU2Pl88b00sU",
  authDomain: "firevue-5508a.firebaseapp.com",
  databaseURL: "https://firevue-5508a.firebaseio.com",
  projectId: "firevue-5508a",
  storageBucket: "firevue-5508a.appspot.com",
  messagingSenderId: "176873846996"
};
firebase.initializeApp(config);

window.firebase = firebase;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
