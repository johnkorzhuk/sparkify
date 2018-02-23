import { setAllLoadedAction, updateFilterSortOrderAction } from "../actions"

// ACTIONS
export const RESET_ALL = "giveaways/filters/RESET_ALL"
export const RESET_FILTER = "giveaways/filters/RESET_FILTER"
export const SET_FILTER = "giveaways/filters/SET_FILTER"

// ACTION CREATORS
export const resetAllAction = () => ({
  type: RESET_ALL,
  payload: null,
})

export const resetFilterAction = filter => ({
  type: RESET_FILTER,
  payload: {
    filter,
  },
})

export const setFilterAction = (filter, value, order) => ({
  type: SET_FILTER,
  payload: {
    filter,
    value,
    order,
  },
})

// BOUND ACTION CREATORS
export const resetAllFilters = () => dispatch => {
  dispatch(resetAllAction())
  dispatch(setAllLoadedAction(false))
  dispatch(updateFilterSortOrderAction(["filter", "sort"]))
}

export const resetFilter = filter => dispatch => {
  dispatch(resetFilterAction(filter))
  dispatch(setAllLoadedAction(false))

  if (filter === "searchInput") {
    dispatch(updateFilterSortOrderAction(["filter", "sort"]))
  }
}

export const setFilter = (filter, value, order) => (dispatch, getState) => {
  dispatch(setFilterAction(filter, value, order))

  if (filter !== "searchInput") {
    // dispatch(updateFilterSortOrderAction(["filter", "sort"]))
  }
}
