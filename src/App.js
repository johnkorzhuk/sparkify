import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"

import firebase from "./services/firebase"
import { startListeningToAuthChanges } from "./store/auth/actions"
import { selectAuthenticatedState } from "./store/auth/selectors"

import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./components/pages/Home"
import LoginPage from "./containers/LoginPage"
import SubmitGiveawayPage from "./containers/SubmitGiveawayPage"

class App extends Component {
  componentDidMount() {
    const { startListeningToAuthChanges } = this.props
    this.authListener = startListeningToAuthChanges(firebase.auth)
  }

  render() {
    const { authenticated } = this.props
    return (
      <Router>
        <div className="App">
          <Header authenticated={authenticated} />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={LoginPage} />
            <Route path="/submit" component={SubmitGiveawayPage} />
          </Switch>
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
