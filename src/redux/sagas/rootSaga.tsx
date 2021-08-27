import { all, fork } from "@redux-saga/core/effects"
import reportsSaga from "./reportSaga/reportSaga"
export function* rootSaga() {
  yield all([fork(reportsSaga)])
}
