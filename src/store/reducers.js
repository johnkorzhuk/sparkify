import { combineReducers } from "redux"

import auth from "./auth/reducer"
import giveaways from "./giveaways/reducer"
import user from "./user/reducer"

const appReducer = combineReducers({ auth, giveaways, user })

export default (state, action) => {
  if (action.type === "auth/LOGOUT") {
    state = undefined
  }

  return appReducer(state, action)
}
