import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import firebase from "../services/firebase"
import { getGiveawayById } from "../store/giveaways/actions"

import GiveawayPage from "../components/pages/Giveaway"

const Placeholder = styled.div`
  height: 100vh;
`

class GiveawayPageContainer extends Component {
  async componentDidMount() {
    const { giveaway, getGiveawayById, history, match } = this.props
    const { giveawayId } = match.params

    if (!giveaway) {
      if (giveawayId.length !== 6) {
        history.push("/404")
      }

      getGiveawayById(firebase, history, giveawayId)
    }
  }

  render() {
    const { giveaway, ...props } = this.props
    return giveaway ? (
      <GiveawayPage {...props} {...giveaway} />
    ) : (
      <Placeholder />
    )
  }
}

export default connect(
  (state, { match }) => {
    return {
      giveaway: state.giveaways.root.all[match.params.giveawayId],
    }
  },
  { getGiveawayById },
)(GiveawayPageContainer)
