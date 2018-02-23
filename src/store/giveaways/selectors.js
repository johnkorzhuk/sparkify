import { createSelector } from "reselect"
import shortId from "short-id"
import FuseFuzzy from "fuse.js"

import { selectFilterState } from "./filters/selectors"
import {
  selectEnteredGiveaways,
  selectCreatedGiveaways,
} from "../user/selectors"

export const selectAllGiveaways = state => state.giveaways.root.all
export const selectFilterSortOrder = state =>
  state.giveaways.root.filterSortOrder

export const selectFilteredSortedGifts = createSelector(
  [
    selectAllGiveaways,
    selectFilterState,
    selectFilterSortOrder,
    selectEnteredGiveaways,
    selectCreatedGiveaways,
  ],
  (allGiveaways, sortFilters, filterSortOrder, entered, created) => {
    // TODO handle hideViewed
    const { sort, ...filters } = sortFilters
    const enteredAndCreated = {
      ...entered,
      ...created,
    }

    return filterSortOrder.reduce((aggr, curr) => {
      if (curr === "filter") {
        return Object.keys(filters).reduce(
          (aggr, curr) => {
            if (curr === "hideViewed") {
              if (filters[curr] && Object.keys(enteredAndCreated).length > 0) {
                return aggr.filter(({ id }) => {
                  return !!enteredAndCreated[id]
                })
              } else {
                return aggr
              }
            }
            if (filters[curr]) {
              if (curr === "searchInput") {
                const options = {
                  shouldSort: true,
                  threshold: 0.6,
                  location: 0,
                  distance: 100,
                  maxPatternLength: 32,
                  minMatchCharLength: 1,
                  keys: [
                    "title",
                    "description",
                    "location",
                    "link",
                    "type",
                    "category",
                  ],
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
          [...aggr],
        )
      } else if (curr === "sort") {
        return aggr.sort((a, b) => {
          let valueA = a[sort.value]
          let valueB = b[sort.value]
          // TODO: this code is fragile. this assumes all sortable values are either a number or
          // a Date string / Date object
          if (typeof valueA !== "number") {
            valueA = Date.parse(valueA)
            valueB = Date.parse(valueB)
          }

          if (sort.order === "asc") {
            return valueA - valueB
          }

          return valueB - valueA
        })
      }

      return aggr
    }, Object.values(allGiveaways))
  },
)
