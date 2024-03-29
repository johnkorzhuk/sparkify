import firebase from "firebase"
import "firebase/firestore"

export const authProviders = {
  google: {
    scopes: [],
  },
  facebook: {
    scopes: [],
  },
  twitter: {},
}

export const appEndpoint =
  "https://us-central1-sparkify-30f42.cloudfunctions.net/app"

class Firebase {
  constructor(config, custom) {
    firebase.initializeApp(config)
    this.store = firebase.firestore()
    this.auth = firebase.auth()
    this.storage = firebase.storage().ref()
    this._configure(custom)
  }

  async _configure({ offline, authProviders, api }) {
    if (offline) {
      try {
        await this._firebase.firestore().enablePersistence()
        this.store = this._firebase.firestore()
      } catch (error) {
        if (error.code === "failed-precondition") {
          console.warn(
            "Multiple tabs open, offline persistence will only work on one tab.",
          )
        } else if (error.code === "unimplemented") {
          console.warn("The current browser does not support offline usage")
        }
      }
    }

    if (api) {
      Object.entries(api).forEach(([key, value]) => {
        this.api = {
          [key]: value,
        }
      })
    }

    Object.keys(authProviders).forEach(provider => {
      switch (provider) {
        case "google":
          // console.log(this._firebase)
          this.googleAuthProvider = new firebase.auth.GoogleAuthProvider()

          authProviders[provider].scopes.forEach(scope => {
            this.googleAuthProvider.addScope(scope)
          })
          break

        case "facebook":
          this.facebookAuthProvider = new firebase.auth.FacebookAuthProvider()

          authProviders[provider].scopes.forEach(scope => {
            this.facebookAuthProvider.addScope(scope)
          })
          break

        case "twitter":
          this.twitterAuthProvider = new firebase.auth.TwitterAuthProvider()
          break

        default:
          console.warn(`${provider} is not supported as an Auth provider.`)
          break
      }
    })
  }

  getAuthProvider(provider) {
    switch (provider) {
      case "google":
        return this.googleAuthProvider

      case "facebook":
        return this.facebookAuthProvider

      case "twitter":
        return this.twitterAuthProvider

      default:
        console.error(
          `Invalide auth provider passed to function. One of: ${Object.keys(
            authProviders,
          ).join(", ")}`,
        )
        break
    }
  }

  get users() {
    return this.store.collection("users")
  }

  get giveaways() {
    return this.store.collection("giveaways")
  }

  get removedGiveaways() {
    return this.store.collection("removedGiveaways")
  }
}

export default new Firebase(
  {
    apiKey: "AIzaSyARYCRZRBo9Hr7UQWo46uwNnZVbidzpOI0",
    authDomain: "sparkify-30f42.firebaseapp.com",
    databaseURL: "https://sparkify-30f42.firebaseio.com",
    projectId: "sparkify-30f42",
    storageBucket: "sparkify-30f42.appspot.com",
    messagingSenderId: "69658995107",
  },
  {
    offline: true,
    authProviders,
    api: {
      app: appEndpoint,
    },
  },
)
