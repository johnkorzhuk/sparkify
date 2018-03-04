// import React, { Component } from "react"
import { connect } from "react-redux"

import { selectProfileGiveaways } from "../store/profile/selectors"

import ProfilePage from "../components/pages/ProfilePage"

// class ProfilePageContainer extends Component {
//   render() {
//     return <ProfilePage {...this.props} />
//   }
// }

export default connect((state, { location }) => {
  const type = location.pathname === "/profile/history" ? "entered" : "created"

  return {
    profileGiveaways: selectProfileGiveaways(type)(state),
  }
})(ProfilePage)
