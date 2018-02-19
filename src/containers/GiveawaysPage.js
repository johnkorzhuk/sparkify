import React, { Component } from "react"
import { connect } from "react-redux"
import algoliaSearch from "algoliasearch"
import debounce from "lodash.debounce"

import firebase from "../services/firebase"
import {
  getGiveawaysFromStore,
  getGiveawaysFromAlgolia,
  addItemsToPage,
} from "../store/giveaways/actions"
import { resetAllFilters } from "../store/giveaways/filters/actions"
import {
  selectFilterFieldChangedState,
  selectFilterState,
} from "../store/giveaways/filters/selectors"
import { selectFilteredSortedGifts } from "../store/giveaways/selectors"
import { ALGOLIA } from "../config"
import { GIVEAWAY_LIMIT } from "../store/giveaways/reducer"

import GiveawaysPage from "../components/pages/Giveaways"

const { appId, searchKey } = ALGOLIA

class GiveawaysPageContainer extends Component {
  lastDocument = null
  collection = firebase.store.collection("giveaways")
  index = algoliaSearch(appId, searchKey).initIndex("giveaways")
  // for algolia pagination
  page = 0

  componentWillMount() {
    this.index.searchCacheEnabled = true
  }

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
    const limitDiff = GIVEAWAY_LIMIT - nextGiveaways.length

    if (search !== nextSearch && nextSearch) {
      // reset algolia pagination
      this.page = 0
    }

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

  queryBySearchInput = debounce(async input => {
    const { getGiveawaysFromAlgolia } = this.props

    const query = this.index.search({
      query: input,
      hitsPerPage: GIVEAWAY_LIMIT,
      page: this.page,
    })

    this.page = await getGiveawaysFromAlgolia(query)
  }, 750)

  handleLoadMore = async () => {
    const {
      getGiveawaysFromStore,
      giveaways,
      addItemsToPage,
      sort,
      category,
      type,
      itemsPerPage,
      filterSortOrder,
      search,
    } = this.props

    if (filterSortOrder[filterSortOrder.length - 1] === "sort") {
      if (giveaways.length <= itemsPerPage) {
        let query = this.generateQuery({
          sort,
          category,
          type,
        })

        if (this.lastDocument) {
          query = query.startAfter(this.lastDocument)
        }

        this.lastDocument = await getGiveawaysFromStore(
          query.limit(GIVEAWAY_LIMIT),
        )
      }
    } else if (
      filterSortOrder[filterSortOrder.length - 1] === "filter" &&
      search
    ) {
      await this.queryBySearchInput(search)
    }
    addItemsToPage(GIVEAWAY_LIMIT)
  }

  render() {
    const {
      giveaways,
      resetAllFilters,
      filterFieldHasChanged,
      giveawaysLoading,
      allLoaded,
      itemsPerPage,
    } = this.props

    return (
      <GiveawaysPage
        loading={giveawaysLoading}
        giveaways={giveaways}
        resetAllFilters={resetAllFilters}
        hasChanged={filterFieldHasChanged}
        allLoaded={allLoaded}
        loadMore={this.handleLoadMore}
        itemsPerPage={itemsPerPage}
      />
    )
  }
}

export default connect(
  state => {
    return {
      giveaways: selectFilteredSortedGifts(state),
      filterFieldHasChanged: selectFilterFieldChangedState(state),
      search: state.giveaways.filters.searchInput,
      category: state.giveaways.filters.category,
      sort: state.giveaways.filters.sort,
      type: state.giveaways.filters.type,
      hideViewed: state.giveaways.filters.hideViewed,
      giveawaysLoading: state.giveaways.root.loading,
      allLoaded: state.giveaways.root.allLoaded,
      itemsPerPage: state.giveaways.root.itemsPerPage,
      filterSortOrder: state.giveaways.root.filterSortOrder,
    }
  },
  {
    getGiveawaysFromStore,
    getGiveawaysFromAlgolia,
    resetAllFilters,
    addItemsToPage,
  },
)(GiveawaysPageContainer)
