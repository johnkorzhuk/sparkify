import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"

import { logout } from "../store/auth/actions"
import { selectAuthenticatedState } from "../store/auth/selectors"
import firebase from "../services/firebase"
import { AUTHED_ROUTES } from "../config"

import Nav from "../components/Nav"

class NavContainer extends Component {
  handleLogout = async () => {
    const { logout, history } = this.props
    await logout(firebase.auth)
    history.replace("/")
  }

  handleLogin = route => {
    const { authenticated, history } = this.props

    if (authenticated && route === "login") {
      history.replace("/giveaways")
      this.forceUpdate()
    } else {
      history.replace(`/${route}`)
    }
  }

  render() {
    const { photoURL, authenticated, location } = this.props
    const authedRoute = AUTHED_ROUTES.some(path =>
      location.pathname.includes(path),
    )
    return (
      <Nav
        onLogin={this.handleLogin}
        onLogout={this.handleLogout}
        photoURL={photoURL}
        authenticated={authenticated}
        authedRoute={authedRoute}
        pathname={location.pathname}
      />
    )
  }
}

const enhance = compose(
  withRouter,
  connect(
    state => {
      return {
        photoURL: state.auth.user.photoURL,
        authenticated: selectAuthenticatedState(state),
      }
    },
    { logout },
  ),
)

export default enhance(NavContainer)
