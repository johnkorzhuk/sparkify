// ACTIONs
export const SET_LOADING = "USER/SET_LOADING"
export const ADD_GIVEAWAYS = "user/ADD_GIVEAWAYS"
export const REMOVE_GIVEAWAY = "user/REMOVE_GIVEAWAY"

// ACTION CREATORS
export const setLoadingAction = loading => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
})

export const addGiveawayAction = (type, giveaways) => ({
  type: ADD_GIVEAWAYS,
  payload: {
    type,
    giveaways,
  },
})

export const removeGiveawayAction = (id, type) => ({
  type: REMOVE_GIVEAWAY,
  payload: {
    type,
    id,
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

    dispatch(addGiveawayAction("entered", giveaways))
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

    dispatch(addGiveawayAction("created", giveaways))
  } catch (error) {
    console.error(error)
  }
}
