import React from "react"
import { connect } from "react-redux"

import firebase from "../services/firebase"
import { setFilter, resetFilter } from "../store/giveaways/filters/actions"

import Filters from "../components/forms/GiveawaysFilters"

export default connect(
  state => {
    return {
      search: state.giveaways.filters.searchInput,
      categories: state.giveaways.filters.categories,
      sort: state.giveaways.filters.sort,
      type: state.giveaways.filters.type,
      hideViewed: state.giveaways.filters.hideViewed,
    }
  },
  { setFilter, resetFilter },
)(Filters)
