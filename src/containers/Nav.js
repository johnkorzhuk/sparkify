import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"

import { logout } from "../store/auth/actions"
import { selectAuthenticatedState } from "../store/auth/selectors"
import firebase from "../services/firebase"

import Nav from "../components/Nav"

class NavContainer extends Component {
  handleLogout = () => {
    const { logout } = this.props
  }

  handleLogin = route => {
    const { authenticated, history } = this.props

    if (authenticated && route !== "register") {
      console.log("push to /giveaways")
    } else {
      console.log("push to /login")
    }
  }

  render() {
    const { photoURL } = this.props

    return (
      <Nav
        onLogin={this.handleLogin}
        onLogout={this.handleLogout}
        photoURL={photoURL}
      />
    )
  }
}

const enhance = compose(
  connect(
    state => {
      return {
        photoURL: state.auth.photoURL,
        authenticated: selectAuthenticatedState(state),
      }
    },
    { logout },
  ),
  withRouter,
)

export default enhance(NavContainer)
