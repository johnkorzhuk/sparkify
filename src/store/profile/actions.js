import axios from "axios"

// ACTIONS
export const SET_LOADING = "profile/SET_LOADING"
export const RESET_GIVEAWAY_FILTER = "profile/RESET_GIVEAWAY_FILTER"
export const SET_GIVEAWAY_FILTER = "profile/SET_GIVEAWAY_FILTER"
export const ADD_GIVEAWAYS = "profile/ADD_GIVEAWAYS"

// ACTION CREATORS
export const setLoadingAction = loading => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
})

export const resetGiveawayFilterAction = () => ({
  type: RESET_GIVEAWAY_FILTER,
  payload: null,
})

export const setGiveawayFilterAction = input => ({
  type: SET_GIVEAWAY_FILTER,
  payload: {
    input,
  },
})

export const addGiveawaysAction = (giveaways, type) => ({
  type: ADD_GIVEAWAYS,
  payload: {
    giveaways,
    type,
  },
})

// BOUND ACTION CREATORS
export const resetGiveawayFilter = () => dispatch => {
  dispatch(resetGiveawayFilterAction())
}

export const setGiveawayFilter = input => dispatch => {
  dispatch(setGiveawayFilterAction(input))
}

export const getGiveaways = (
  firebase,
  profileGiveaways,
  type,
) => async dispatch => {
  try {
    dispatch(setLoadingAction(true))
    const profileGiveawayIds = Object.keys(profileGiveaways)

    const { data } = await axios.post(`${firebase.api.app}/giveaways`, {
      ids: profileGiveawayIds,
    })

    const giveaways = data.map(giveaway => {
      if (type === "entered") {
        return {
          ...giveaway,
          enteredOn: profileGiveaways[giveaway.id].date,
        }
      }

      return giveaway
    })

    dispatch(addGiveawaysAction(giveaways, type))

    dispatch(setLoadingAction(false))
  } catch (error) {
    console.log(error)
  }
}
