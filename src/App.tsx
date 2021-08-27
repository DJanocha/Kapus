import { ReactElement, FC } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import { Paper, ThemeProvider } from "@material-ui/core"
import { createTheme } from "@material-ui/core/styles"

import { routes } from "../src/config/routes"
import IRoute from "./model/IRoute"
import BottomNav from "./components/bottomNav"
import Header from "./components/header"
import { RootState } from "./redux/reducers/rootReducer"
const EmptyComponent: FC<any> = (): ReactElement => {
  return <div>empty component</div>
}

function App(): ReactElement {
  const appState = useSelector((state: RootState) => state.report)
  // const theme = createMuiTheme({})
  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  })
  const lightTheme = createTheme({
    palette: {
      type: "light",
    },
  })
  return (
    <>
      {/* <Layout> */}
      <ThemeProvider theme={appState.dark ? darkTheme : lightTheme}>
        <Paper elevation={14} style={{ height: "95vh" }}>
          <Router>
            <Header />
            <Switch>
              {routes.map((route: IRoute) => (
                <Route key={`${route.key}`} path={`${route.path}`} component={route.component || EmptyComponent} exact />
              ))}
            </Switch>
            <BottomNav />
          </Router>
        </Paper>
      </ThemeProvider>
      {/* </Layout> */}
    </>
  )
}

export default App
