// ACTIONS
export const ADD = "giveaways/ADD"
export const SET_ALL_LOADED = "giveaways/SET_ALL_LOADED"
export const SET_LOADING = "giveaways/SET_LOADING"
export const ERROR = "giveaways/ERROR"

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
export const addGiveaways = giveaways => dispatch => {
  return addGiveawaysAction(giveaways)
}

export const getGiveaways = storeQuery => async dispatch => {
  dispatch(setLoadingAction(true))
  try {
    const data = await storeQuery
  } catch (error) {
    dispatch(errorAction(error.message))
  }
}
