import { RESET_ALL, RESET_FILTER, SET_FILTER } from "./actions"

export const INITIAL_STATE = {
  searchInput: "",
  categories: [],
  sort: {
    value: "endDate",
    // "acsending" or "descending"
    order: "acsending",
  },
  type: undefined,
  hideViewed: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_ALL:
      return {
        ...INITIAL_STATE,
      }

    case RESET_FILTER:
      return {
        ...state,
        [action.payload.filter]: INITIAL_STATE[action.payload.filter],
      }

    case SET_FILTER:
      if (action.payload.filter === "sort") {
        return {
          ...state,
          [action.payload.filter]: {
            value: action.payload.value,
            order: action.payload.order,
          },
        }
      }

      return {
        ...state,
        [action.payload.filter]: action.payload.value,
      }

    default:
      return state
  }
}
