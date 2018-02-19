// ACTIONS
export const ADD = "giveaways/ADD_GIVEAWAY"
export const SET_ALL_LOADED = "giveaways/SET_ALL_LOADED"
export const SET_LOADING = "giveaways/SET_LOADING"
export const ERROR = "giveaways/ERROR"
export const PUSH_QUERY_ORDER = "giveaways/PUSH_QUERY_ORDER"
export const REMOVE_QUERY_ORDER = "giveaways/REMOVE_QUERY_ORDER"
export const RESET_QUERY_ORDER = "giveaways/RESET_QUERY_ORDER"

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

export const pushQueryOrderAction = filter => ({
  type: PUSH_QUERY_ORDER,
  payload: {
    filter,
  },
})

export const removeQueryOrderAction = filter => ({
  type: REMOVE_QUERY_ORDER,
  payload: {
    filter,
  },
})

export const resetQueryOrderAction = () => ({
  type: RESET_QUERY_ORDER,
  payload: null,
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
    const { hits } = await query
    console.log(hits.length)
    dispatch(setLoadingAction(false))

    hits.forEach(gift => {
      dispatch(addGiveawayAction(gift))
    })
  } catch (error) {
    console.log(error)
  }
}
