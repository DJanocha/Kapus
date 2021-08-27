import { FC, ReactElement, ReactNode } from "react"
import BottomNav from "./bottomNav"
import MyStepper from "./myStepper"

interface LayoutProps {
  children: ReactNode
}
const Layout: FC<LayoutProps> = ({ children }: LayoutProps): ReactElement => {
  return (
    <div>
      <MyStepper />
      {children}
      <BottomNav />
    </div>
  )
}
export default Layout
