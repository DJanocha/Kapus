import IDepartmentInfo from "../../model/IDepartment"
import { IRouteIndex } from "../../model/IRouteIndex"
import { reportFetchRequest, reportFetchSuccess, reportFetchFailure } from "../actionTypes/reportTypes"
import {
  IChangeThemeAction,
  IReportFetchFailurePayload,
  IReportFetchSuccessPayload,
  IUnblockRouteIndexAction,
  unblockRouteIndexType,
  IReportFetchRequestAction,
  IReportFetchSuccessAction,
  IReportFetchFailureAction,
  IChooseDepartmentAction,
  ISubmitFormAction,
} from "../types/types"

import IForm from "../../model/IForm"
import { routeIndexes } from "../../config/routes"

export const reportFetchRequestAC = (): IReportFetchRequestAction => ({
  type: reportFetchRequest,
})

export const reportFetchSuccessAC = (payload: IReportFetchSuccessPayload): IReportFetchSuccessAction => ({
  type: reportFetchSuccess,
  exampleMessages: payload.messages,
})

export const reportFetchFailureAC = (payload: IReportFetchFailurePayload): IReportFetchFailureAction => ({
  type: reportFetchFailure,
  error: payload.error,
})

/////KONIEC SAGI NARESZCIE

export const chooseDepartmentAC = (department: IDepartmentInfo): IChooseDepartmentAction => ({
  type: "chooseDepartment",
  department,
})

export const submitFormAC = (form: IForm): ISubmitFormAction => ({
  type: "submitForm",
  form,
})

export const changeThemeAC = (dark: boolean): IChangeThemeAction => ({
  type: "changeTheme",
  dark,
})

export const unblockRouteIndexAC = (routeIndex: IRouteIndex): IUnblockRouteIndexAction => ({
  type: "unblockRouteIndex",
  routeIndex,
})
export const unblockRouteIndexByIdAC = (id: 0 | 1 | 2 | 3): IUnblockRouteIndexAction => {
  const type: unblockRouteIndexType = "unblockRouteIndex"
  if (id === 0 || id === 1 || id === 2 || id === 3) {
    return { type, routeIndex: routeIndexes[id] }
  } else {
    return {
      type,
      routeIndex: routeIndexes[0],
    }
  }
}
