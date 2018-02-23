import {
  SET_LOADING,
  ADD_ENTERED_GIVEAWAYS,
  REMOVE_ENTERED_GIVEAWAYS,
  ADD_CREATED_GIVEAWAYS,
  REMOVE_CREATED_GIVEAWAYS,
} from "./actions"

export const INITIA_STATE = {
  enteredGiveaways: {},
  createdGiveaways: {},
  loading: false,
}

export default (state = INITIA_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      }

    case ADD_ENTERED_GIVEAWAYS:
      return {
        ...state,
        enteredGiveaways: {
          ...state.enteredGiveaways,
          ...action.payload.giveaways,
        },
      }

    case REMOVE_ENTERED_GIVEAWAYS:
      const {
        [action.payload.giveawayId]: removedEntered,
        ...filteredEntered
      } = state.enteredGiveaways
      return {
        ...state,
        enteredGiveaways: {
          ...filteredEntered,
        },
      }

    case ADD_CREATED_GIVEAWAYS:
      return {
        ...state,
        createdGiveaways: {
          ...state.createdGiveaways,
          ...action.payload.giveaways,
        },
      }

    case REMOVE_CREATED_GIVEAWAYS:
      const {
        [action.payload.giveawayId]: removedCreated,
        ...filteredCreated
      } = state.enteredGiveaways
      return {
        ...state,
        createdGiveaways: {
          ...filteredCreated,
        },
      }

    default:
      return state
  }
}
