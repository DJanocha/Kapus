import { useEffect, FC, ReactElement } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Paper, makeStyles } from "@material-ui/core"

import Department from "../components/department"
import IDepartmentInfo from "../model/IDepartment"
import { chooseDepartmentAC, reportFetchRequestAC, unblockRouteIndexAC, unblockRouteIndexByIdAC } from "../redux/actions/reportActions"
import { RootState } from "../redux/reducers/rootReducer"
import { routeIndexes } from "../config/routes"
const useStyles = makeStyles({
  root: {
    display: "grid",
  },
  chosenElement: {
    backgroundColor: "secondary",
  },
})

const MainPage: FC<any> = (): ReactElement => {
  const styles = useStyles()
  const appState = useSelector((state: RootState) => state.report)
  const appDispatcher = useDispatch()
  useEffect(() => {
    appDispatcher(reportFetchRequestAC())
    appDispatcher(unblockRouteIndexByIdAC(0))
    appDispatcher(unblockRouteIndexByIdAC(3))

    // console.log(routeIndexes)
  }, [])

  useEffect(() => {}, [appState.department])
  const myDepartments: Array<IDepartmentInfo> = [
    { name: "XYZ", city: "Warszawa", country: "Poland" },
    { name: "ABC", city: "Kraków", country: "Poland" },
    { name: "RNQ", city: "Berlin", country: "Germany" },
  ]
  return (
    <Paper className={styles.chosenElement}>
      <div className={styles.root}>
        {myDepartments.map((departmentItem) => (
          <Department
            choose={() => {
              appDispatcher(chooseDepartmentAC(departmentItem))
              appDispatcher(unblockRouteIndexByIdAC(1))
            }}
            chosen={appState?.department?.name === departmentItem.name}
            department={{ name: departmentItem.name, city: departmentItem.city, country: departmentItem.country }}
          />
        ))}
      </div>
    </Paper>
  )
}

export default MainPage
