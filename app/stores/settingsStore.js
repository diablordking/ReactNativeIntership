import firebase from 'firebase'
import MobxFirebaseStore from 'mobx-firebase-store'

// Replace with your Configuration Information
const config = {
    apiKey: "AIzaSyDchSrPK_t57edUzZbxz5CCIrbBYMWbCsM",
    authDomain: "lynda-6bc27.firebaseapp.com",
    databaseURL: "https://lynda-6bc27.firebaseio.com",
    projectId: "lynda-6bc27",
    storageBucket: "lynda-6bc27.appspot.com",
    messagingSenderId: "81492398384"
  }
export default class SettingsStore extends MobxFirebaseStore {
  constructor() {
    firebase.initializeApp(config)
    super(firebase.database().ref())

    this.splashTime = 5000
    this.splashImg = require('../../images/splash.jpg')
    this.loginBG = require('../../images/login.jpg')
  }
  get LoginBG() {
    return this.loginBG
  }
  get SplashTime() {
    return this.splashTime
  }
  get SplashImg() {
    return this.splashImg
  }
}