import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { firebaseMutations } from 'vuexfire'
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
    boardOnplay: '',
    me: '',
    Players: {},
    score: {
      A: 0,
      B: 0
    },
    roomId: '',
    displayName: '',
    photoURL: '',
    rooms: [],
    positionOwn: [
      [
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false}
      ],
      [
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false}
      ],
      [
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false}
      ],
      [
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false}
      ],
      [
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false}
      ],
      [
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false}
      ],
      [
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false}
      ],
      [
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false}
      ],
      [
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false}
      ],
      [
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false},
        {shipstatus: false, bombstatus: false}
      ]
    ],
    positionEnemy: [],
    user: {},
    userProfile: {},
    party: {},
    statusplayer: '',
    statuscoplayer: '',
    statusinRoom: '',
    scoreplayer: '',
    scorecoplayer: ''
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
    Players: state => state.Players,
    party: state => state.party,
    roomId: state => state.roomId
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
    setRooms (state, obj) {
      state.rooms = obj
    },
    setKeyplayer (state, id) {
      state.me = id
    },
    setroomId (state, id) {
      state.roomId = id
    },
    setParty (state, obj) {
      state.party = obj
    },
    setPlayer (state, obj) {
      state.Players = obj
    },
    setboard (state, id) {
      state.boardOnplay = id
    },
    setstatusplayer (state, obj) {
      state.statusplayer = obj.status
      state.scoreplayer = obj.score
      state.statuscoplayer = obj.statusco
      state.scorecoplayer = obj.scoreco
    },
    ...firebaseMutations
  },
  actions: {
    createBoard: function (context, obj) {
      var tmp = {
        own: obj.own,
        playerB: obj.playerB,
        positionA: this.state.positionOwn,
        positionB: this.state.positionOwn,
        scoreA: 0,
        scoreB: 0,
        turn: 0
      }
      var key = shipsetRef.push(tmp).getKey()
      playersRef.child(obj.own + '/boardOnplay').set(key)
      playersRef.child(obj.playerB + '/boardOnplay').set(key)
      var tmp1 = {
        status: 'positionA',
        score: 'scoreA',
        statusco: 'positionB',
        scoreco: 'scoreB'
      }
      if (this.state.me !== obj.own) {
        tmp1 = {
          status: 'positionB',
          score: 'scoreB',
          statusco: 'positionA',
          scoreco: 'scoreA'
        }
      }
      context.commit('setstatusplayer', tmp1)
    },
    deleteRoom: function (context, id) {
      roomsRef.child(id).set(null)
    },
    getstatusplayerfirebase: function (context, obj) {
      var tmp = 'statusA'
      var tmp1
      if (this.state.me !== this.state.party.own) tmp = 'statusB'
      if (obj.str === 'Wait') tmp1 = 'Ready'
      else tmp1 = 'Wait'
      roomsRef.child(obj.id + '/' + tmp).set(tmp1)
    },
    deleteBoard: function (context) {
      playersRef.child(this.state.me + '/boardOnplay').set('')
    },
    outRoom: function (context, id, sign) {
      if (sign === 'A') {
        roomsRef.child(id + '/playerA').set('')
        roomsRef.child(id + '/playerB').on('value', function (snapshot) {
          if (snapshot.val()) {
            roomsRef.child(id + '/playerA').set(snapshot.val())
          } else roomsRef.child(id).set('')
        },
        function (error) {
          console.log('Error: ' + error.code)
        })
      } else {
        roomsRef.child(id + '/playerB').set('')
      }
    },
    loadPlayer: function (context, id) {
      console.log(id)
      var tmp = {
        playerA: {},
        playerB: {}
      }
      roomsRef.child(id).on('value', function (snapshot) {
        var room = snapshot.val()
        playersRef.child(room.own).on('value', function (snapshot) {
          tmp.playerA = snapshot.val()
        })
        if (room.playerB) {
          playersRef.child(room.playerB).on('value', function (snapshot) {
            tmp.playerB = snapshot.val()
          })
        }
        context.commit('setPlayer', tmp)
      },
      function (error) {
        console.log('Error: ' + error.code)
      })
    },
    joinroomfirebase: function (context, id) {
      roomsRef.child(id + '/playerB').set(this.state.me)
      context.commit('setroomId', id)
    },
    updateparty: function (context, roomId) {
      roomsRef.child(roomId).on('value', function (snapshot) {
        var obj = snapshot.val()
        context.commit('setParty', obj)
      },
      function (error) {
        console.log('Error: ' + error.code)
      })
    },
    setRoom: function (context, name) {
      var tmp = {
        name: name,
        own: this.state.me,
        playerB: '',
        statusA: 'Wait',
        statusB: 'Wait'
      }
      var key = roomsRef.push(tmp).getKey()
      context.commit('setroomId', key)
    },
    getBoard: function (context) {
      var idMe = this.state.me
      console.log(idMe)
      playersRef.child(idMe + '/boardOnplay').on('value', function (snapshot) {
        context.commit('setboard', snapshot.val())
        shipsetRef.child(snapshot.val() + '/own').on('value', function (snapshot1) {
          var tmp1 = {
            status: 'positionA',
            score: 'scoreA',
            statusco: 'positionB',
            scoreco: 'scoreB'
          }
          if (idMe !== snapshot1.val()) {
            tmp1 = {
              status: 'positionB',
              score: 'scoreB',
              statusco: 'positionA',
              scoreco: 'scoreA'
            }
          }
          context.commit('setstatusplayer', tmp1)
        })
      })
    },
    getScore: function (context, obj) {
      var tmp = {
        A: 0,
        B: 0
      }
      console.log(this.state.scoreplayer)
      shipsetRef.child(this.state.boardOnplay + '/' + this.state.scoreplayer).on('value', function (snapshot) {
        tmp.A = snapshot.val()
      })
      shipsetRef.child(this.state.boardOnplay + '/' + this.state.scorecoplayer).on('value', function (snapshot) {
        tmp.B = snapshot.val()
      })
      context.commit('setScore', tmp)
    },
    addScore: function () {
      var tmp
      shipsetRef.child(this.state.boardOnplay + '/' + this.state.scoreplayer).on('value', function (snapshot) {
        tmp = snapshot.val()
      })
      shipsetRef.child(this.state.boardOnplay + '/' + this.state.scoreplayer).set(tmp + 1)
    },
    getEnemy: function (context) {
      shipsetRef.child(this.state.boardOnplay + '/' + this.state.statuscoplayer).on('value', function (snapshot) {
        context.commit('setpositionEnemy', snapshot.val())
      },
      function (error) {
        console.log('Error: ' + error.code)
      })
    },
    getOwn: function (context) {
      console.log(this.state.boardOnplay)
      shipsetRef.child(this.state.boardOnplay + '/' + this.state.statusplayer).on('value', function (snapshot) {
        context.commit('setpositionOwn', snapshot.val())
      },
      function (error) {
        console.log('Error: ' + error.code)
      })
    },
    setShipFirebase: function (context, xy) {
      console.log(this.state.boardOnplay)
      shipsetRef.child(this.state.boardOnplay + '/' + this.state.statusplayer + '/' + xy.y + '/' + xy.x).update({shipstatus: true})
    },
    setbombFirebase: function (context, xy) {
      shipsetRef.child(this.state.boardOnplay + '/' + this.state.statuscoplayer + '/' + xy.y + '/' + xy.x + '/bombstatus').set(true)
    },
    getroom: function (context) {
      roomsRef.on('value', function (snapshot) {
        context.commit('setRooms', snapshot.val())
      },
      function (error) {
        console.log('Error: ' + error.code)
      })
      console.log('me' + this.state.me)
      playersRef.child(this.state.me + '/boardOnplay').set('')
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
    }
  }
})
