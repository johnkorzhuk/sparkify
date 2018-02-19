import React from "react"
import { connect } from "react-redux"

import firebase from "../services/firebase"
import { setFilter, resetFilter } from "../store/giveaways/filters/actions"
import { updateFilterSortOrder } from "../store/giveaways/actions"

import Filters from "../components/forms/GiveawaysFilters"

export default connect(
  state => {
    return {
      search: state.giveaways.filters.searchInput,
      category: state.giveaways.filters.category,
      sort: state.giveaways.filters.sort,
      type: state.giveaways.filters.type,
      hideViewed: state.giveaways.filters.hideViewed,
    }
  },
  { setFilter, resetFilter, updateFilterSortOrder },
)(Filters)
