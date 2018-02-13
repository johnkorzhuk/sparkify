import { combineReducers } from "redux"

import auth from "./auth/reducer"
import giveaways from "./auth/reducer"

export default combineReducers({ auth, giveaways })
