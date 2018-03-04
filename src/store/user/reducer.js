import { SET_LOADING, ADD_GIVEAWAYS, REMOVE_GIVEAWAY } from "./actions"

export const INITIA_STATE = {
  giveaways: {
    entered: {},
    created: {},
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

    default:
      return state
  }
}
