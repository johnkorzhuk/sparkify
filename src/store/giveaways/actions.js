// ACTIONS
export const ADD = "giveaways/ADD_GIVEAWAY"
export const SET_ALL_LOADED = "giveaways/SET_ALL_LOADED"
export const SET_LOADING = "giveaways/SET_LOADING"
export const SET_ERROR = "giveaways/ERROR"
export const UPDATE_FILTER_SORT_ORDER = "giveaways/UPDATE_FILTER_SORT_ORDER,"
export const ADD_ITEMS_TO_PAGE = "giveaways/ADD_ITEMS_TO_PAGE"
export const ADD_CAROUSEL_ITEMS = "giveaways/ADD_CAROUSEL_ITEMS"

// ACTION CREATORS
export const addGiveawaysAction = giveaways => ({
  type: ADD,
  payload: {
    giveaways,
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

export const setErrorAction = message => ({
  type: SET_ERROR,
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

export const addCarouselItemsAction = ids => ({
  type: ADD_CAROUSEL_ITEMS,
  payload: {
    ids,
  },
})

// BOUND ACTION CREATORS
export const getGiveawaysFromStore = storeQuery => async dispatch => {
  dispatch(setLoadingAction(true))
  try {
    const snapshot = await storeQuery.get()
    dispatch(setLoadingAction(false))

    const giveaways = {}

    snapshot.forEach(doc => {
      const giveaway = doc.data()

      giveaways[giveaway.id] = giveaway
    })

    dispatch(addGiveawaysAction(giveaways))

    dispatch(setAllLoadedAction(snapshot.empty))

    return snapshot.docs[snapshot.docs.length - 1]
  } catch (error) {
    console.log(error.message)
    // dispatch(setErrorAction(error.message))
  }
}

export const getGiveawaysFromAlgolia = (
  query,
  { carousel } = {},
) => async dispatch => {
  dispatch(setLoadingAction(true))

  try {
    const { hits, page, nbPages, ...rest } = await query

    dispatch(setLoadingAction(false))

    const giveaways = {}

    hits.forEach(giveaway => {
      giveaways[giveaway.id] = giveaway
    })

    dispatch(addGiveawaysAction(giveaways))

    if (carousel) {
      dispatch(addCarouselItemsAction(Object.keys(giveaways)))
    }

    if (nbPages > 0 && page < nbPages) {
      return page + 1
    } else {
      dispatch(setAllLoadedAction(true))
    }
  } catch (error) {
    console.log(error)
  }
}

export const getGiveawayById = (firebase, history, id) => async dispatch => {
  try {
    dispatch(setLoadingAction(true))

    const snap = await firebase.giveaways.doc(id).get()
    dispatch(setLoadingAction(false))

    if (snap.exists) {
      const giveaway = snap.data()
      dispatch(
        addGiveawaysAction({
          [giveaway.id]: giveaway,
        }),
      )
    } else {
      history.push("/404")
    }
  } catch (error) {
    console.log(error)
    dispatch(setErrorAction(error.message))
  }
}

export const addItemsToPage = amount => dispatch => {
  dispatch(addItemsToPageAction(amount))
}

export const updateFilterSortOrder = order => dispatch => {
  dispatch(updateFilterSortOrderAction(order))
}

export const setAllLoaded = allLoaded => dispatch => {
  dispatch(setAllLoadedAction(allLoaded))
}
