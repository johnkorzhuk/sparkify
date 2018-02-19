import { createSelector } from "reselect"
import shortId from "short-id"
import FuseFuzzy from "fuse.js"

import { selectFilterState } from "./filters/selectors"

export const selectAllGiveaways = state => state.giveaways.root.all
export const selectFilterSortOrder = state =>
  state.giveaways.root.filterSortOrder

export const selectFilteredSortedGifts = createSelector(
  [selectAllGiveaways, selectFilterState, selectFilterSortOrder],
  (allGiveaways, sortFilters, filterSortOrder) => {
    // TODO handle hideViewed
    const { sort, hideViewed, ...filters } = sortFilters

    return filterSortOrder.reduce(
      (aggr, curr) => {
        if (curr === "filter") {
          return Object.keys(filters).reduce(
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
            if (sort.order === "asc") {
              return a[sort.value] - b[sort.value]
            }

            return b[sort.value] - a[sort.value]
          })
        }

        return aggr
      },
      [...allGiveaways],
    )
  },
)
