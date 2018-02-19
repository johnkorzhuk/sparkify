// ACTIONs
export const SET_LOADING = "USER/SET_LOADING"
export const ADD_ENTERED = "user/ADD_ENTERED"
export const REMOVE_ENTERED = "user/REMOVE_ENTERED"

// ACTION CREATORS
export const setLoadingAction = loading => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
})

export const addEnteredAction = giveaway => ({
  type: ADD_ENTERED,
  payload: {
    giveaway,
  },
})

export const removeEnteredAction = giveawayId => ({
  type: REMOVE_ENTERED,
  payload: {
    giveawayId,
  },
})

// BOUND ACTION CREATORS
export const getEnteredGiveaways = query => async dispatch => {
  dispatch(setLoadingAction(true))

  try {
    const snapshot = await query.get()
    dispatch(setLoadingAction(false))

    snapshot.forEach((doc, index) => {
      dispatch(addEnteredAction(doc.data()))
    })
  } catch (error) {
    console.error(error)
  }
}
