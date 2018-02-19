import { combineReducers } from "redux"

import auth from "./auth/reducer"
import giveaways from "./giveaways/reducer"
import user from "./user/reducer"

export default combineReducers({ auth, giveaways, user })
