import axios from "axios"
import { all, call, put, takeLatest } from "redux-saga/effects"

import { reportFetchFailureAC, reportFetchSuccessAC } from "../../actions/reportActions"
import { reportFetchRequest } from "../../actionTypes/reportTypes"

import { apiUrl } from "../../../config/constants"

const getMessages = () => axios.get<string[]>(apiUrl)

function* fetchMessages(): any {
  try {
    const response = yield call(getMessages)
    yield put(reportFetchSuccessAC({ messages: response.data }))
  } catch (e) {
    yield put(reportFetchFailureAC({ error: e.message }))
  }
}

function* reportsSaga() {
  yield all([takeLatest(reportFetchRequest, fetchMessages)])
}
export default reportsSaga

// function* reportFetchSaga() {
//   try {
//     const response = yield call(getMessages)
//     yield put(reportFetchSuccessAC({messages:response.data }));
//   } catch (e) {
//     yield put({
//       error: e.message;
//     })
//   }
// }
