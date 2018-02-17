import React, { Component } from "react"
import { connect } from "react-redux"

import firebase from "../services/firebase"
import { getGiveaways } from "../store/giveaways/actions"
import { resetAllFilters } from "../store/giveaways/filters/actions"
import { selectFilterFieldChangedState } from "../store/giveaways/filters/selectors"

import GiveawaysPage from "../components/pages/Giveaways"

class GiveawaysPageContainer extends Component {
  componentDidMount() {
    this.getGiveaways()
  }

  async getGiveaways() {
    const { getGiveaways } = this.props
    const query = firebase.store
      .collection("giveaways")
      .where("endDate", ">=", new Date(Date.now()))
      .orderBy("endDate")
      .limit(12)
    getGiveaways(query)
  }

  render() {
    const { giveaways, resetAllFilters, filterFieldHasChanged } = this.props

    return (
      <GiveawaysPage
        giveaways={giveaways}
        resetAllFilters={resetAllFilters}
        hasChanged={filterFieldHasChanged}
      />
    )
  }
}

export default connect(
  state => {
    return {
      giveaways: state.giveaways.root.all,
      filterFieldHasChanged: selectFilterFieldChangedState(state),
      search: state.giveaways.filters.searchInput,
      categories: state.giveaways.filters.categories,
      sort: state.giveaways.filters.sort,
      type: state.giveaways.filters.type,
      hideViewed: state.giveaways.filters.hideViewed,
    }
  },
  { getGiveaways, resetAllFilters },
)(GiveawaysPageContainer)
