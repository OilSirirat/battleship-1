import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import router from '../router/index'

let config = {
  apiKey: 'AIzaSyBc4GvjjmZMezOuv2fc8FOUiPcyttLPmuw',
  authDomain: 'battleship-d7f88.firebaseapp.com',
  databaseURL: 'https://battleship-d7f88.firebaseio.com',
  projectId: 'battleship-d7f88',
  storageBucket: '',
  messagingSenderId: '211714676183'
}
var firebaseApp = firebase.initializeApp(config)
let provider = new firebase.auth.FacebookAuthProvider()
provider.addScope('public_profile')
provider.setCustomParameters({
  'display': 'popup'
})
var db = firebaseApp.database()
var shipsetRef = db.ref('boards')
var roomsRef = db.ref('rooms')
var playersRef = db.ref('players')
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    count: 0,
    boardOnplay: '0011',
    me: '',
    enemy: '',
    score: {
      A: 0,
      B: 0
    },
    roomId: '',
    displayName: '',
    photoURL: '',
    rooms: [],
    positionOwn: [],
    positionEnemy: [],
    user: {},
    userProfile: {}
  },
  getters: {
    user: state => state.user,
    route: state => state.route,
    userProfile: state => state.userProfile,
    Ownsea: state => state.positionOwn,
    Enemysea: state => state.positionEnemy,
    score: state => state.score,
    rooms: state => state.rooms,
    me: state => state.me,
    getEnemy (state) {
      shipsetRef.child(state.boardOnplay + '/positionA').on('value', function (snapshot) {
        state.position = snapshot.val()
      },
      function (error) {
        console.log('Error: ' + error.code)
      })
      return state.position
    },
    getOwn (state) {
      shipsetRef.child(state.boardOnplay + '/positionA').on('value', function (snapshot) {
        state.position = snapshot.val()
      },
      function (error) {
        console.log('Error: ' + error.code)
      })
      return state.position
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setpositionOwn (state, obj) {
      state.positionOwn = obj
    },
    setpositionEnemy (state, obj) {
      state.positionEnemy = obj
    },
    setScore (state, obj) {
      state.score = obj
    },
    setRoom (state, obj) {
      state.rooms = obj
    },
    setKeyplayer (state, id) {
      state.me = id
    },
    ...firebaseMutations
  },
  actions: {
    setOffline: function (context) {
      playersRef.child(this.state.me + '/status').set('offline')
    },
    getScore: function (context, obj) {
      var tmp = {
        A: 0,
        B: 0
      }
      shipsetRef.child(this.state.boardOnplay + '/scoreA').on('value', function (snapshot) {
        tmp.A = snapshot.val()
      })
      shipsetRef.child(this.state.boardOnplay + '/scoreB').on('value', function (snapshot) {
        tmp.B = snapshot.val()
      })
      context.commit('setScore', tmp)
    },
    addScore: function () {
      var tmp
      shipsetRef.child(this.state.boardOnplay + '/scoreA').on('value', function (snapshot) {
        tmp = snapshot.val()
      })
      shipsetRef.child(this.state.boardOnplay + '/scoreA').set(tmp + 1)
    },
    getEnemy: function (context) {
      shipsetRef.child(this.state.boardOnplay + '/positionB').on('value', function (snapshot) {
        context.commit('setpositionEnemy', snapshot.val())
      },
      function (error) {
        console.log('Error: ' + error.code)
      })
    },
    getOwn: function (context) {
      shipsetRef.child(this.state.boardOnplay + '/positionA').on('value', function (snapshot) {
        context.commit('setpositionOwn', snapshot.val())
      },
      function (error) {
        console.log('Error: ' + error.code)
      })
    },
    setShipFirebase: function (context, xy) {
      shipsetRef.child(this.state.boardOnplay + '/positionA/' + xy.y + '/' + xy.x + '/shipstatus').set(true)
    },
    setbombFirebase: function (context, xy) {
      shipsetRef.child(this.state.boardOnplay + '/positionB/' + xy.y + '/' + xy.x + '/bombstatus').set(true)
    },
    getroom: function (context) {
      roomsRef.on('value', function (snapshot) {
        context.commit('setRoom', snapshot.val())
      },
      function (error) {
        console.log('Error: ' + error.code)
      })
    },
    init ({ commit, dispatch, bindFirebaseRef }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user && user.uid) {
          // let { name, picture } = user
          var tmp = {
            name: user.displayName,
            picture: user.photoURL,
            fb: user.providerData[0],
            boardOnplay: ''
          }
          commit('setKeyplayer', user.uid)
          commit('setUser', tmp)
          // router.push('/')
        } else {
          commit('setUser', null)
          // router.push('/login')
        }
      })
    },
    login (context) {
      var vm = this
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user
        vm.displayName = user.displayName
        vm.photoURL = user.photoURL
        var tmp = {
          name: user.displayName,
          picture: user.photoURL,
          fb: user.providerData[0],
          boardOnplay: ''
        }
        playersRef.child(user.uid).set(tmp)
        context.commit('setKeyplayer', user.uid)
        context.commit('setUser', tmp)
        router.push('/lobby')
      }).catch(function (error) {
        console.log(error)
      })
    },
    logout (context) {
      firebase.auth().signOut()
      context.user = null
      context.me = ''
    },
    setUserProfileRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, id) => {
        // this will unbind any previously bound ref to 'todos'
      let userProfile = db.ref('twitter/users/' + id)
      bindFirebaseRef('userProfile', userProfile)
    }),
    unSetUserProfileRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
        // you can unbind it easily too
      unbindFirebaseRef('userProfile')
    })
  }
})
