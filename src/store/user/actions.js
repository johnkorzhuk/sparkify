// ACTIONs
export const SET_LOADING = "USER/SET_LOADING"
export const ADD_ENTERED_GIVEAWAYS = "user/ADD_ENTERED_GIVEAWAYS"
export const REMOVE_ENTERED_GIVEAWAYS = "user/REMOVE_ENTERED_GIVEAWAYS"
export const ADD_CREATED_GIVEAWAYS = "user/ADD_CREATED_GIVEAWAYS"
export const REMOVE_CREATED_GIVEAWAYS = "user/REMOVE_CREATED_GIVEAWAYS"

// ACTION CREATORS
export const setLoadingAction = loading => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
})

export const addEnteredGiveawaysAction = giveaways => ({
  type: ADD_ENTERED_GIVEAWAYS,
  payload: {
    giveaways,
  },
})

export const addCreatedGiveawaysAction = giveaways => ({
  type: ADD_CREATED_GIVEAWAYS,
  payload: {
    giveaways,
  },
})

export const removeEnteredGiveawaysAction = giveawayId => ({
  type: REMOVE_ENTERED_GIVEAWAYS,
  payload: {
    giveawayId,
  },
})

export const removeCreatedGiveawaysAction = giveawayId => ({
  type: REMOVE_CREATED_GIVEAWAYS,
  payload: {
    giveawayId,
  },
})

// BOUND ACTION CREATORS
export const getEnteredGiveaways = (firebase, uid) => async dispatch => {
  try {
    dispatch(setLoadingAction(true))

    const snapshot = await firebase.users
      .doc(uid)
      .collection("enteredGiveaways")
      .get()

    dispatch(setLoadingAction(false))

    const giveaways = {}

    snapshot.forEach((doc, index) => {
      const giveaway = doc.data()
      giveaways[giveaway.id] = giveaway
    })

    dispatch(addEnteredGiveawaysAction(giveaways))
  } catch (error) {
    console.error(error)
  }
}

export const getCreatedGiveaways = (firebase, uid) => async dispatch => {
  try {
    dispatch(setLoadingAction(true))

    const snapshot = await firebase.users
      .doc(uid)
      .collection("createdGiveaways")
      .get()

    dispatch(setLoadingAction(false))

    const giveaways = {}

    snapshot.forEach((doc, index) => {
      const giveaway = doc.data()
      giveaways[giveaway.id] = giveaway
    })

    dispatch(addCreatedGiveawaysAction(giveaways))
  } catch (error) {
    console.error(error)
  }
}
