import { createSelector } from "reselect"
import deepEqual from "deep-equal"

import { INITIAL_STATE } from "./reducer.js"

export const selectFilterState = state => state.giveaways.filters

export const selectFilterFieldChangedState = createSelector(
  [selectFilterState],
  filterState => {
    return !deepEqual(filterState, INITIAL_STATE)
  },
)
