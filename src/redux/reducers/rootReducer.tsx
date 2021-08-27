import { combineReducers } from "redux"
import reportReducer from "./reportReducer"

const rootReducer = combineReducers({
  report: reportReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
