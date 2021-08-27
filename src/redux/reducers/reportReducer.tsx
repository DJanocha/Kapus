import { IReportState, IReportFetchAction, IResetStateAction, IChooseDepartmentAction, ISubmitFormAction, IChangeThemeAction, IUnblockRouteIndexAction } from "../types/types"

const initState: IReportState = {
  loading: false,
  error: null,
  exampleMessages: [],
  department: null,
  form: null,
  dark: false,
  routesAvailable: [{ index: 0, path: "/" }],
}
type supportedActions = IReportFetchAction | IResetStateAction | IChooseDepartmentAction | ISubmitFormAction | IChangeThemeAction | IUnblockRouteIndexAction
const reportReducer = (state = initState, action: supportedActions): IReportState => {
  switch (action.type) {
    case "reportFetchRequest":
      return {
        ...state,
        loading: true,
      }
    case "reportFetchFailure":
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case "reportFetchSuccess":
      return {
        ...state,
        error: null,
        exampleMessages: action.exampleMessages,
        loading: false,
      }
    case "reset":
      return {
        ...initState,
      }
    case "chooseDepartment":
      return {
        ...state,
        department: action.department,
      }
    case "submitForm":
      return {
        ...state,
        form: action.form,
      }
    case "changeTheme":
      return {
        ...state,
        dark: action.dark,
      }
    case "unblockRouteIndex": {
      let newState = state
      const isAlready: boolean = newState.routesAvailable.findIndex((elem) => elem.index === action.routeIndex.index && elem.path === action.routeIndex.path) !== -1
      if (isAlready) {
        return { ...state }
      } else {
        return {
          ...state,
          routesAvailable: state.routesAvailable.concat(action.routeIndex),
        }
      }
    }

    default:
      return state
  }
}

export default reportReducer
