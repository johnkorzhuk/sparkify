import { combineReducers } from "redux"

import auth from "./auth/reducer"
import giveaways from "./giveaways/reducer"

export default combineReducers({ auth, giveaways })
