import { LOGIN, LOGOUT, LOADING, ERROR } from "./actions"

export const INITIAL_STATE = {
  user: {
    email: null,
    displayName: null,
    photoURL: null,
    uid: null,
    emailVerified: false,
  },
  loading: false,
  error: {
    hasError: false,
    message: "",
  },
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        loading: false,
        error: {
          ...state.error,
          hasError: false,
          message: "",
        },
      }

    case LOGOUT:
      return {
        ...INITIAL_STATE,
      }

    case LOADING:
      return {
        ...state,
        loading: true,
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
