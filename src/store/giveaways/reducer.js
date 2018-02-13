import { ADD, SET_ALL_LOADED, SET_LOADING, ERROR } from "./actions"

export const INITIAL_STATE = {
  all: [],
  allLoaded: false,
  loading: false,
  error: {
    hasError: false,
    message: "",
  },
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        all: [...state.all, ...action.payload.giveaways],
      }

    case SET_ALL_LOADED:
      return {
        ...state,
        allLoaded: action.payload.allLoaded,
      }

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      }

    case ERROR:
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          hasError: true,
          message: action.payload.message,
        },
      }

    default:
      return state
  }
}
