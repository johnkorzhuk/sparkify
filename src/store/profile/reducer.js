import {
  SET_LOADING,
  RESET_GIVEAWAY_FILTER,
  SET_GIVEAWAY_FILTER,
  ADD_GIVEAWAYS,
  REMOVE_GIVEAWAY,
} from "./actions"

export const INITIAL_STATE = {
  giveaways: {
    filter: "",
    loading: false,
    created: [],
    entered: [],
  },
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        giveaways: {
          ...state.giveaways,
          loading: action.payload.loading,
        },
      }

    case ADD_GIVEAWAYS:
      return {
        ...state,
        giveaways: {
          ...state.giveaways,
          [action.payload.type]: [...action.payload.giveaways],
        },
      }

    case REMOVE_GIVEAWAY:
      return {
        ...state,
        giveaways: {
          ...state.giveaways,
          [action.payload.type]: state.giveaways[action.payload.type].filter(
            giveaway => giveaway.id !== action.payload.id,
          ),
        },
      }

    case RESET_GIVEAWAY_FILTER:
      return {
        ...state,
        giveaways: {
          ...state.giveaways,
          filter: INITIAL_STATE.giveaways.filter,
        },
      }

    case SET_GIVEAWAY_FILTER:
      return {
        ...state,
        giveaways: {
          ...state.giveaways,
          filter: action.payload.input,
        },
      }

    default:
      return state
  }
}
