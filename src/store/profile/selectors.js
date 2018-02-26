import { createSelector } from "reselect"

import {
  selectEnteredGiveaways,
  selectCreatedGiveaways,
} from "../user/selectors"

export const selectProfileGiveawaysFiler = state =>
  state.profile.giveaways.filter
export const selectedCreatedGiveaways = state => state.profile.giveaways.created
export const selectedEnteredGiveaways = state => state.profile.giveaways.entered

export const selectProfileGiveaways = type =>
  createSelector(
    [selectEnteredGiveaways, selectCreatedGiveaways],
    (entered, created) => {
      if (type === "created") return created
      return entered
    },
  )

export const selectGiveaways = type =>
  createSelector(
    [
      selectedCreatedGiveaways,
      selectedEnteredGiveaways,
      selectProfileGiveawaysFiler,
    ],
    (created, entered, filter) => {
      const giveaways = type === "created" ? created : entered

      if (!filter) {
        // console.log(giveaways)
      }
      return giveaways
    },
  )
