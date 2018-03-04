import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"

import firebase from "./services/firebase"
import { startListeningToAuthChanges } from "./store/auth/actions"
import { selectAuthenticatedState } from "./store/auth/selectors"

import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./components/pages/Home"
import FAQPage from "./components/pages/FAQ"
import LoginPage from "./containers/LoginPage"
import SubmitGiveawayPage from "./containers/SubmitGiveawayPage"
import GiveawayPage from "./containers/GiveawayPage"
import GiveawaysPage from "./containers/GiveawaysPage"
import ProfilePage from "./containers/ProfilePage"
import ScrollToTop from "./containers/ScrollToTop"

import { generateGiveaways } from "./store/giveaways/utils"

class App extends Component {
  async componentDidMount() {
    const { startListeningToAuthChanges } = this.props
    this.authListener = startListeningToAuthChanges(firebase)

    // const myUid = "ENSBOGKcsBUyuAd6eGHBHzqZxqA3"
    // const { generated, created } = generateGiveaways(50, myUid)

    // await Promise.all([
    //   ...generated.map(data =>
    //     firebase.store
    //       .collection("giveaways")
    //       .doc(data.id)
    //       .set(data),
    //   ),
    //   // created
    //   ...created.map(item => {
    //     return firebase.store
    //       .collection("users")
    //       .doc(myUid)
    //       .collection("createdGiveaways")
    //       .doc(item.id)
    //       .set(item)
    //   }),
    //   // entered
    //   ...generated
    //     .map(data => {
    //       if (Math.random() >= 0.7) {
    //         return firebase.store
    //           .collection("users")
    //           .doc(myUid)
    //           .collection("enteredGiveaways")
    //           .doc(data.id)
    //           .set({
    //             id: data.id,
    //             date: new Date(),
    //             createdBy: data.createdBy.uid,
    //           })
    //       } else {
    //         return null
    //       }
    //     })
    //     .filter(Boolean),
    // ])
  }

  render() {
    const { authenticated } = this.props
    return (
      <Router>
        <div className="App">
          <Header authenticated={authenticated} />
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/faq" component={FAQPage} />
              <Route path="/register" component={LoginPage} />
              <Route path="/submit" component={SubmitGiveawayPage} />
              <Route path="/giveaways" component={GiveawaysPage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/:giveawayId" component={GiveawayPage} />
            </Switch>
          </ScrollToTop>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect(
  state => {
    return {
      authenticated: selectAuthenticatedState(state),
    }
  },
  { startListeningToAuthChanges },
)(App)
