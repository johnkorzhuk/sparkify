import React, { Component } from "react"
import { connect } from "react-redux"
import algoliaSearch from "algoliasearch"
import debounce from "lodash.debounce"

import firebase from "../services/firebase"
import {
  getGiveawaysFromStore,
  getGiveawaysFromAlgolia,
} from "../store/giveaways/actions"
import { resetAllFilters } from "../store/giveaways/filters/actions"
import {
  selectFilterFieldChangedState,
  selectFilterState,
} from "../store/giveaways/filters/selectors"
import { selectSetAmountOfGifts } from "../store/giveaways/selectors"
import { ALGOLIA } from "../config"

import GiveawaysPage from "../components/pages/Giveaways"

const GIVEAWAY_LIMIT = 12
const { appId, searchKey } = ALGOLIA

class GiveawaysPageContainer extends Component {
  lastDocument = null
  collection = firebase.store.collection("giveaways")
  index = algoliaSearch(appId, searchKey).initIndex("giveaways")

  async componentDidMount() {
    const { getGiveawaysFromStore, sort, category, type } = this.props
    const query = this.generateQuery({
      sort,
      category,
      type,
    }).limit(GIVEAWAY_LIMIT)

    this.lastDocument = await getGiveawaysFromStore(query)
  }

  async componentWillReceiveProps(nextProps) {
    const {
      category,
      sort,
      type,
      giveawaysLoading,
      getGiveawaysFromStore,
      search,
    } = this.props
    const {
      category: nextCategory,
      sort: nextSort,
      type: nextType,
      search: nextSearch,
      giveaways: nextGiveaways,
      giveawaysLoading: nextGiveawaysLoading,
      allLoaded: nextAllLoaded,
    } = nextProps

    const limitDiff = nextGiveaways.reduce((aggr, curr) => {
      if (curr.placeholder) return aggr + 1
      return aggr
    }, 0)

    if (limitDiff > 0 && !giveawaysLoading && !nextGiveawaysLoading) {
      const searchFiltersAreEqual = search === nextSearch
      const queryFiltersAreEqual =
        category === nextCategory && sort === nextSort && type === nextType
      if (!nextAllLoaded && !queryFiltersAreEqual) {
        this.lastDocument = null
        let query = this.generateQuery({
          sort: nextSort,
          category: nextCategory,
          type: nextType,
        })

        if (this.lastDocument) {
          query = query.startAfter(this.lastDocument)
        }

        this.lastDocument = await getGiveawaysFromStore(
          query.limit(GIVEAWAY_LIMIT),
        )
      } else if (!searchFiltersAreEqual) {
        this.queryBySearchInput(nextSearch)
      }
    }
  }

  // order matters! sort should always be the first key
  generateQuery(queryFilters) {
    return Object.keys(queryFilters).reduce((aggr, curr) => {
      if (curr === "sort") {
        return aggr.orderBy(queryFilters.sort.value, queryFilters.sort.order)
      } else if (queryFilters[curr]) {
        return aggr.where(curr, "==", queryFilters[curr])
      }
      return aggr
    }, this.collection)
  }

  queryBySearchInput = debounce(input => {
    const { getGiveawaysFromAlgolia } = this.props
    const query = this.index.search({
      query: input,
    })
    getGiveawaysFromAlgolia(query)
  }, 750)

  handleLoadMore = async () => {
    const { getGiveawaysFromStore, sort, category, type } = this.props
    let query = this.generateQuery({
      sort,
      category,
      type,
    })

    if (this.lastDocument) {
      query = query.startAfter(this.lastDocument)
    }

    this.lastDocument = await getGiveawaysFromStore(query.limit(GIVEAWAY_LIMIT))
  }

  render() {
    const {
      giveaways,
      resetAllFilters,
      filterFieldHasChanged,
      giveawaysLoading,
      allLoaded,
    } = this.props

    return (
      <GiveawaysPage
        loading={giveawaysLoading}
        giveaways={giveaways}
        resetAllFilters={resetAllFilters}
        hasChanged={filterFieldHasChanged}
        allLoaded={allLoaded}
        loadMore={this.handleLoadMore}
      />
    )
  }
}

export default connect(
  state => {
    return {
      giveaways: selectSetAmountOfGifts(GIVEAWAY_LIMIT)(state),
      filterFieldHasChanged: selectFilterFieldChangedState(state),
      search: state.giveaways.filters.searchInput,
      category: state.giveaways.filters.category,
      sort: state.giveaways.filters.sort,
      type: state.giveaways.filters.type,
      hideViewed: state.giveaways.filters.hideViewed,
      giveawaysLoading: state.giveaways.root.loading,
      allLoaded: state.giveaways.root.allLoaded,
    }
  },
  { getGiveawaysFromStore, getGiveawaysFromAlgolia, resetAllFilters },
)(GiveawaysPageContainer)
