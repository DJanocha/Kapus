import { makeStyles } from "@material-ui/core/styles"
import { Switch, FormControlLabel, BottomNavigation, BottomNavigationAction } from "@material-ui/core/"

import Brightness4Icon from "@material-ui/icons/Brightness4"
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp"
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp"
import HomeSharpIcon from "@material-ui/icons/HomeSharp"
import PolicySharpIcon from "@material-ui/icons/PolicySharp"
import GitHubIcon from "@material-ui/icons/GitHub"

import React, { ReactElement, FC, useState } from "react"
import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { RootState } from "../redux/reducers/rootReducer"
import { changeThemeAC } from "../redux/actions/reportActions"
import { IChangeThemeAction } from "../redux/types/types"
import { getCurrentIndex, routes } from "../config/routes"

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "sticky",
    bottom: 0,
    zIndex: 10,
  },
})
type BottomNavProps = RouteComponentProps

const BottomNav: FC<BottomNavProps> = ({ history }): ReactElement => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const appState = useSelector((state: RootState) => state.report)

  const handleForward = () => {
    const availableIndexes = appState.routesAvailable.map((routeAvailable) => routeAvailable.index)

    const currentIndex = getCurrentIndex(history.location.pathname)

    let nextIndex = currentIndex

    do {
      nextIndex = (nextIndex + 1) % 4
    } while (!availableIndexes.includes(nextIndex))
    history.push(routes[nextIndex].path)
  }
  const handleBack = () => {
    const availableIndexes = appState.routesAvailable.map((routeAvailable) => routeAvailable.index)

    const currentIndex = getCurrentIndex(history.location.pathname)

    let prevIndex = currentIndex

    do {
      if (prevIndex === 0) {
        prevIndex = 3
      } else {
        prevIndex--
      }
    } while (!availableIndexes.includes(prevIndex))
    console.log(prevIndex)
    history.push(routes[prevIndex].path)
  }
  return (
    <BottomNavigation
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Początek "
        onClick={() => {
          history.push("/")
        }}
        icon={<HomeSharpIcon fontSize="large" />}
      />
      <BottomNavigationAction label="Wstecz" icon={<ArrowBackIosSharpIcon onClick={handleBack} fontSize="large" />} />
      <BottomNavigationAction label="Dalej" onClick={handleForward} icon={<ArrowForwardIosSharpIcon fontSize="large" />} />
      <BottomNavigationAction
        label="Koniec"
        onClick={() => {
          history.push("/policy")
        }}
        icon={<PolicySharpIcon fontSize="large" />}
      />

      <NightSwitch />

      <GitHubIcon
        style={{ marginLeft: "15px", marginTop: "5px", cursor: "pointer" }}
        onClick={() => {
          window.open("https://github.com/djanocha")
        }}
        fontSize="large"
      />
    </BottomNavigation>
  )
}
export default withRouter(BottomNav)

const NightSwitch: FC<any> = (): ReactElement => {
  const appDispatcher = useDispatch()
  const [darkTheme, setDarkTheme] = useState(false)
  const darkTooggle = () => {
    appDispatcher(changeThemeAC(!darkTheme) as IChangeThemeAction) //
    setDarkTheme(!darkTheme)
  }

  return (
    <FormControlLabel
      value="top"
      onChange={darkTooggle}
      checked={darkTheme}
      style={{ color: "green" }}
      control={<Switch style={{ color: "blue" }} icon={<Brightness4Icon />} color="primary" />}
      label={`tryb nocny`}
      labelPlacement="bottom"
    />
  )
}
