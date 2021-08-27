import IDepartmentInfo from "../../model/IDepartment"
import IForm from "../../model/IForm"
import { IRouteIndex } from "../../model/IRouteIndex"
//global state interface
export interface IReportState {
  loading: boolean
  error: string | null
  exampleMessages: Array<string> | []
  department: IDepartmentInfo | null
  form: IForm | null
  dark: boolean
  routesAvailable: Array<IRouteIndex>
}
/////////----------SAGA----------------///////////////
//action.types' types:
export type reportFetchRequestType = "reportFetchRequest"
export type reportFetchSuccessType = "reportFetchSuccess"
export type reportFetchFailureType = "reportFetchFailure"

//async operation actions' interfaces
export interface IReportFetchRequestAction {
  type: reportFetchRequestType
}
export interface IReportFetchSuccessAction {
  type: reportFetchSuccessType
  exampleMessages: Array<string>
}

export interface IReportFetchFailureAction {
  type: reportFetchFailureType
  error: string
}
//payloads' interfaces:
export interface IReportFetchFailurePayload {
  error: string
}
export interface IReportFetchSuccessPayload {
  messages: Array<string>
}

//combination (alternative) of them all
export type IReportFetchAction = IReportFetchSuccessAction | IReportFetchFailureAction | IReportFetchRequestAction

/////////----------ENDOFSAGA----------------///////////////

//reset
export type resetStateType = "reset"
export interface IResetStateAction {
  type: resetStateType
}

//choose department
export type chooseDepartmentType = "chooseDepartment"
export interface IChooseDepartmentAction {
  type: chooseDepartmentType
  department: IDepartmentInfo
}

//submit form
export type submitFormType = "submitForm"
export interface ISubmitFormAction {
  type: submitFormType
  form: IForm
}

//change theme
export type changeThemeType = "changeTheme"
export interface IChangeThemeAction {
  type: changeThemeType
  dark: boolean
}

//unblock routeIndex
export type unblockRouteIndexType = "unblockRouteIndex"
export interface IUnblockRouteIndexAction {
  type: unblockRouteIndexType
  routeIndex: IRouteIndex
}
