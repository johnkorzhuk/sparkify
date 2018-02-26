import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"

import firebase from "../services/firebase"
import { selectGiveaways } from "../store/profile/selectors"
import {
  resetGiveawayFilter,
  setGiveawayFilter,
  getGiveaways,
} from "../store/profile/actions"

import GiveawaysList from "../components/profile/GiveawayList"

const LIMIT = 15

class ProfileGiveaway extends Component {
  startingIndex = 0

  componentDidMount() {
    this.getGiveawayData()
  }

  componentWillUnmount() {
    const { resetGiveawayFilter } = this.props
    resetGiveawayFilter()
  }

  async getGiveawayData() {
    const { type, getGiveaways, profileGiveaways, giveaways } = this.props

    if (profileGiveaways) {
      getGiveaways(firebase, profileGiveaways, type)
    }
  }

  render() {
    return <GiveawaysList {...this.props} />
  }
}

const enhance = compose(
  withRouter,
  connect(
    (state, { location }) => {
      const type =
        location.pathname === "/profile/history" ? "entered" : "created"
      return {
        type,
        search: state.profile.giveaways.filter,
        giveaways: selectGiveaways(type)(state),
        loading: state.profile.giveaways.loading,
      }
    },
    { resetGiveawayFilter, setGiveawayFilter, getGiveaways },
  ),
)

export default enhance(ProfileGiveaway)
