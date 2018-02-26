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
  profileGiveawayIds,
  type,
) => async dispatch => {
  try {
    dispatch(setLoadingAction(true))

    const { data } = await axios.post(`${firebase.api.app}/giveaways`, {
      ids: profileGiveawayIds,
    })

    dispatch(addGiveawaysAction(data, type))

    dispatch(setLoadingAction(false))
  } catch (error) {
    console.log(error)
  }
}
