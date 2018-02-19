import { createSelector } from "reselect"
import shortId from "short-id"
import FuseFuzzy from "fuse.js"

import { selectFilterState } from "./filters/selectors"

export const selectAllGiveaways = state => state.giveaways.root.all

export const selectFilteredSortedGifts = createSelector(
  [selectAllGiveaways, selectFilterState],
  (allGiveaways, sortFilters) => {
    // TODO handle hideViewed
    const { sort, hideViewed, ...filters } = sortFilters

    const sorted = allGiveaways.sort((a, b) => {
      if (sort.order === "asc") {
        return a[sort.value] - b[sort.value]
      }

      return b[sort.value] - a[sort.value]
    })

    const filtered = Object.keys(filters).reduce(
      (aggr, curr) => {
        if (filters[curr]) {
          if (curr === "searchInput") {
            const options = {
              shouldSort: true,
              threshold: 0.6,
              location: 0,
              distance: 100,
              maxPatternLength: 32,
              minMatchCharLength: 1,
              keys: ["title", "description", "location"],
            }
            const fuse = new FuseFuzzy(aggr, options)

            return fuse.search(filters[curr])
          } else {
            return aggr.filter(gift => {
              return gift[curr] === filters[curr]
            })
          }
        }

        return aggr
      },
      [...sorted],
    )

    return filtered
  },
)

export const selectSetAmountOfGifts = limit =>
  createSelector([selectFilteredSortedGifts], gifts => {
    if (gifts.length < limit) {
      const remainder = limit - gifts.length
      let items = []

      for (let i = 0; i < remainder; i++) {
        items.push({
          placeholder: true,
          id: shortId.generate(),
        })
      }

      return [...gifts, ...items]
    } else {
      return gifts
    }
  })
