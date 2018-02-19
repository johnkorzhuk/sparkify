import { SET_LOADING, ADD_ENTERED, REMOVE_ENTERED } from "./actions"

export const INITIA_STATE = {
  enteredGiveaways: [],
  createdGiveaways: [],
  loading: false,
}

export default (state = INITIA_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      }

    case ADD_ENTERED:
      return {
        ...state,
        enteredGiveaways: [...state.enteredGiveaways, action.payload.giveaway],
      }

    case REMOVE_ENTERED:
      return {
        ...state,
        enteredGiveaways: state.enteredGiveaways.filter(
          ({ id }) => id !== action.payload.giveawayId,
        ),
      }

    default:
      return state
  }
}
