import { createSelector } from "reselect"
import FuseFuzzy from "fuse.js"

import {
  selectEnteredGiveaways as selectUserEnteredGiveaways,
  selectCreatedGiveaways as selectUserCreatedGiveaways,
} from "../user/selectors"

export const selectProfileGiveawaysFiler = state =>
  state.profile.giveaways.filter
export const selectCreatedGiveaways = state => state.profile.giveaways.created
export const selectEnteredGiveaways = state => state.profile.giveaways.entered

export const selectProfileGiveaways = type =>
  createSelector(
    [selectUserEnteredGiveaways, selectUserCreatedGiveaways],
    (entered, created) => {
      if (type === "created") return created
      return entered
    },
  )

export const selectGiveaways = type =>
  createSelector(
    [
      selectCreatedGiveaways,
      selectEnteredGiveaways,
      selectProfileGiveawaysFiler,
    ],
    (created, entered, filter) => {
      let giveaways =
        type === "created"
          ? created.sort(
              (a, b) => Date.parse(a.createdOn) - Date.parse(b.createdOn),
            )
          : entered.sort(
              (a, b) => Date.parse(a.endDate) - Date.parse(b.endDate),
            )

      const BASE_SEARCHABLE_ATTRIBUTES = [
        "title",
        "description",
        "type",
        "category",
        "location",
        "link",
      ]

      if (filter) {
        const options = {
          shouldSort: true,
          threshold: 0.4,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
            ...BASE_SEARCHABLE_ATTRIBUTES,
            type === "entered" ? "createdBy.username" : null,
          ].filter(Boolean),
        }

        const fuse = new FuseFuzzy(giveaways, options)

        return fuse.search(filter)
      }

      let expired = []

      giveaways = giveaways.filter(giveaway => {
        if (Date.parse(giveaway.endDate) <= Date.now()) {
          expired.push(giveaway)
          return false
        }

        return true
      })

      return [...giveaways, ...expired]
    },
  )
