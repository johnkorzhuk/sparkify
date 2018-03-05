import {
  SET_LOADING,
  ADD_GIVEAWAYS,
  REMOVE_GIVEAWAY,
  SET_GIVEAWAY_EDITING,
} from "./actions"

export const INITIA_STATE = {
  giveaways: {
    entered: {},
    created: {},
    editing: null,
  },
  loading: false,
}

export default (state = INITIA_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      }

    case ADD_GIVEAWAYS:
      return {
        ...state,
        giveaways: {
          ...state.giveaways,
          [action.payload.type]: {
            ...state.giveaways[action.payload.type],
            ...action.payload.giveaways,
          },
        },
      }

    case REMOVE_GIVEAWAY:
      const { [action.payload.id]: removed, ...rest } = state.giveaways[
        action.payload.type
      ]

      return {
        ...state,
        givaways: {
          ...state.giveaways,
          [action.payload.type]: {
            ...rest,
          },
        },
      }

    case SET_GIVEAWAY_EDITING:
      return {
        ...state,
        giveaways: {
          ...state.giveaways,
          editing: action.payload.id,
        },
      }

    default:
      return state
  }
}
