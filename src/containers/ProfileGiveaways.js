import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"

import firebase from "../services/firebase"
import { selectGiveaways } from "../store/profile/selectors"
import { deleteGiveaway } from "../store/giveaways/actions"
import { setGiveawayEditing } from "../store/user/actions"
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

  getGiveawayData() {
    const { type, getGiveaways, profileGiveaways, giveaways } = this.props

    if (!giveaways.length > 0) {
      getGiveaways(firebase, profileGiveaways, type)
    }
  }

  handleDeleteGiveaway = id => {
    const { deleteGiveaway, giveaways, uid } = this.props
    const giveaway = giveaways.find(_giveaway => _giveaway.id === id)

    deleteGiveaway(firebase, uid, giveaway)
  }

  handleEditGiveaway = id => {
    const { setGiveawayEditing, history } = this.props

    setGiveawayEditing(id)
    history.push(`/${id}`)
  }

  render() {
    return (
      <GiveawaysList
        {...this.props}
        onEditGiveaway={this.handleEditGiveaway}
        onDeleteGiveaway={this.handleDeleteGiveaway}
      />
    )
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
        uid: state.auth.user.uid,
      }
    },
    {
      resetGiveawayFilter,
      setGiveawayFilter,
      getGiveaways,
      deleteGiveaway,
      setGiveawayEditing,
    },
  ),
)

export default enhance(ProfileGiveaway)
