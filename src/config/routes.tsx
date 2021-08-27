//import all of the pages components:
import Form from "../pages/form"
import MainPage from "../pages/mainPage"
import Policy from "../pages/policy"
import Summary from "../pages/summary"

import IRoute from "../model/IRoute"
import IRouteIndex from "../model/IRouteIndex"

const routes: Array<IRoute> = [
  {
    key: "route-main-page",
    title: "Main Page",
    path: "/",
    component: MainPage,
    protected: false,
  },
  {
    key: "route-form",
    title: "Form",
    path: "/form",
    component: Form,
    protected: true,
  },
  {
    key: "route-summary",
    title: "Summary",
    path: "/summary",
    component: Summary,
    protected: false,
  },
  {
    key: "route-policy",
    title: "Policy",
    path: "/policy",
    component: Policy,
    protected: false,
  },
]
const routeIndexes: typeof IRouteIndex = routes.map((route, index) => ({ path: route.path, index: index }))

const getCurrentIndex = (path: string) => {
  const indexPath: number = routes.findIndex((indexPathElem) => indexPathElem.path === path)
  return indexPath === -1 ? 0 : (indexPath as number)
}

export { routes, routeIndexes, getCurrentIndex }
