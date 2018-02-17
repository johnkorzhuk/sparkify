// ACTIONS
export const ADD = "giveaways/ADD_GIVEAWAY"
export const SET_ALL_LOADED = "giveaways/SET_ALL_LOADED"
export const SET_LOADING = "giveaways/SET_LOADING"
export const ERROR = "giveaways/ERROR"

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
  type: SET_ALL_LOADED,
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

// BOUND ACTION CREATORS
export const getGiveaways = storeQuery => async dispatch => {
  dispatch(setLoadingAction(true))

  try {
    const data = await storeQuery.get()
    dispatch(setLoadingAction(false))

    data.forEach(doc => {
      dispatch(addGiveawayAction(doc.data()))
    })
  } catch (error) {
    dispatch(errorAction(error.message))
  }
}
