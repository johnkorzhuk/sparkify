// ACTIONS
export const ADD = "giveaways/ADD_GIVEAWAY"
export const SET_ALL_LOADED = "giveaways/SET_ALL_LOADED"
export const SET_LOADING = "giveaways/SET_LOADING"
export const ERROR = "giveaways/ERROR"
export const UPDATE_FILTER_SORT_ORDER = "giveaways/UPDATE_FILTER_SORT_ORDER,"
export const ADD_ITEMS_TO_PAGE = "giveaways/ADD_ITEMS_TO_PAGE"

// ACTION CREATORS
export const addGiveawayAction = giveaway => ({
  type: ADD,
  payload: {
    giveaway,
  },
})

export const setAllLoadedAction = allLoaded => ({
  type: SET_ALL_LOADED,
  payload: {
    allLoaded,
  },
})

export const setLoadingAction = loading => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
})

export const errorAction = message => ({
  action: ERROR,
  payload: {
    message,
  },
})

export const updateFilterSortOrderAction = order => ({
  type: UPDATE_FILTER_SORT_ORDER,
  payload: {
    order,
  },
})

export const addItemsToPageAction = amount => ({
  type: ADD_ITEMS_TO_PAGE,
  payload: {
    amount,
  },
})

// BOUND ACTION CREATORS
export const getGiveawaysFromStore = storeQuery => async dispatch => {
  dispatch(setLoadingAction(true))

  try {
    const snapshot = await storeQuery.get()
    dispatch(setLoadingAction(false))

    snapshot.forEach((doc, index) => {
      dispatch(addGiveawayAction(doc.data()))
    })

    dispatch(setAllLoadedAction(snapshot.empty))

    return snapshot.docs[snapshot.docs.length - 1]
  } catch (error) {
    console.log(error.message)
    // dispatch(errorAction(error.message))
  }
}

export const getGiveawaysFromAlgolia = query => async dispatch => {
  dispatch(setLoadingAction(true))

  try {
    const { hits, page, nbPages, ...rest } = await query

    dispatch(setLoadingAction(false))

    hits.forEach(gift => {
      dispatch(addGiveawayAction(gift))
    })

    if (nbPages > 0 && page < nbPages) {
      return page + 1
    } else {
      dispatch(setAllLoadedAction(true))
    }
  } catch (error) {
    console.log(error)
  }
}

export const addItemsToPage = amount => dispatch => {
  dispatch(addItemsToPageAction(amount))
}

export const updateFilterSortOrder = order => dispatch => {
  dispatch(updateFilterSortOrderAction(order))
}
