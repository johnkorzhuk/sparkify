import { combineReducers } from "redux"

import {
  ADD,
  SET_ALL_LOADED,
  SET_LOADING,
  ERROR,
  ADD_ITEMS_TO_PAGE,
  UPDATE_FILTER_SORT_ORDER,
} from "./actions"
import filters from "./filters/reducer"

export const GIVEAWAY_LIMIT = 12

export const INITIAL_STATE = {
  all: {},
  allLoaded: false,
  loading: false,
  itemsPerPage: GIVEAWAY_LIMIT,
  filterSortOrder: ["filter", "sort"],
  error: {
    hasError: false,
    message: "",
  },
}

export const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        all: {
          ...state.all,
          ...action.payload.giveaway,
        },
      }

    case SET_ALL_LOADED:
      return {
        ...state,
        allLoaded: action.payload.allLoaded,
      }

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      }

    case ERROR:
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          hasError: true,
          message: action.payload.message,
        },
      }

    case ADD_ITEMS_TO_PAGE:
      return {
        ...state,
        itemsPerPage: state.itemsPerPage + action.payload.amount,
      }

    case UPDATE_FILTER_SORT_ORDER:
      return {
        ...state,
        filterSortOrder: [...action.payload.order],
      }

    default:
      return state
  }
}

export default combineReducers({ root: rootReducer, filters })
