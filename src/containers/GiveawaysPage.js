import React, { Component } from "react"
import { connect } from "react-redux"
import debounce from "lodash.debounce"

import firebase from "../services/firebase"
import algolia from "../services/algolia"
import {
  getGiveawaysFromStore,
  getGiveawaysFromAlgolia,
  addItemsToPage,
  setAllLoaded,
} from "../store/giveaways/actions"
import { resetAllFilters } from "../store/giveaways/filters/actions"
import {
  selectFilterFieldChangedState,
  selectFilterState,
} from "../store/giveaways/filters/selectors"
import { selectFilteredSortedGifts } from "../store/giveaways/selectors"
import { GIVEAWAY_LIMIT } from "../store/giveaways/reducer"

import GiveawaysPage from "../components/pages/Giveaways"

class GiveawaysPageContainer extends Component {
  // firebase pagination
  lastDocument = null
  // algolia pagination
  page = 0

  async componentDidMount() {
    const { getGiveawaysFromStore, sort, uid, category, type } = this.props

    const giveawaysQuery = this.generateGiveawaysQuery({
      sort,
      category,
      type,
    }).limit(GIVEAWAY_LIMIT)

    this.lastDocument = await getGiveawaysFromStore(giveawaysQuery)
  }

  async componentWillReceiveProps(nextProps) {
    const {
      category,
      sort,
      type,
      giveawaysLoading,
      getGiveawaysFromStore,
      search,
      setAllLoaded,
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

    if (search !== nextSearch) {
      if (nextSearch) {
        // reset algolia pagination
        this.page = 0
      } else {
        setAllLoaded(false)
      }
    }

    if (
      limitDiff > 0 &&
      !giveawaysLoading &&
      !nextGiveawaysLoading &&
      !nextAllLoaded
    ) {
      const searchFiltersAreEqual = search === nextSearch
      const queryFiltersAreEqual =
        category === nextCategory && sort === nextSort && type === nextType
      if (!queryFiltersAreEqual) {
        this.lastDocument = null
        let query = this.generateGiveawaysQuery({
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

  queryBySearchInput = debounce(async input => {
    const { getGiveawaysFromAlgolia } = this.props

    const query = algolia.giveaways.search({
      query: input,
      hitsPerPage: 30,
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
      if (giveaways.length <= itemsPerPage + 4) {
        let query = this.generateGiveawaysQuery({
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

  handleGiveawayClick = id => {
    const { history } = this.props

    history.push(`/${id}`)
  }

  // order matters! sort should always be the first key
  generateGiveawaysQuery(queryFilters) {
    return Object.keys(queryFilters).reduce((aggr, curr) => {
      if (curr === "sort") {
        return aggr.orderBy(queryFilters.sort.value, queryFilters.sort.order)
      } else if (queryFilters[curr]) {
        return aggr.where(curr, "==", queryFilters[curr])
      }
      return aggr
    }, firebase.giveaways)
  }

  render() {
    const {
      giveaways,
      resetAllFilters,
      filterFieldHasChanged,
      giveawaysLoading,
      allLoaded,
      itemsPerPage,
      ...props
    } = this.props

    return (
      <GiveawaysPage
        {...props}
        loading={giveawaysLoading}
        giveaways={giveaways}
        resetAllFilters={resetAllFilters}
        hasChanged={filterFieldHasChanged}
        allLoaded={allLoaded}
        loadMore={this.handleLoadMore}
        itemsPerPage={itemsPerPage}
        onGiveawayClick={this.handleGiveawayClick}
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
      uid: state.auth.user.uid,
    }
  },
  {
    getGiveawaysFromStore,
    getGiveawaysFromAlgolia,
    resetAllFilters,
    setAllLoaded,
    addItemsToPage,
  },
)(GiveawaysPageContainer)
