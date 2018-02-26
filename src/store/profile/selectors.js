import { createSelector } from "reselect"

import {
  selectEnteredGiveaways,
  selectCreatedGiveaways,
} from "../user/selectors"

export const selectProfileGiveaways = ownGiveaways =>
  createSelector(
    [selectEnteredGiveaways, selectCreatedGiveaways],
    (entered, created) => {
      if (ownGiveaways) return Object.values(created)
      return Object.values(entered)
    },
  )
