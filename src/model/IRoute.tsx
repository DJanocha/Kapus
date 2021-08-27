import { FC } from "react"

// RouteItem is an interface for defining the application routes and navigation menu items
//route inteface:
interface IRoute {
  key: string
  title: string
  path?: string
  component: FC<{}>
  protected?: boolean
}
export default IRoute
