import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import { FC, ReactElement } from "react"
import Clock from "./clock"
import MyStepper from "./myStepper"

const useStyles = makeStyles({
  root: {
    position: "sticky",
    zIndex: 10,
    top: 0,
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    position: "sticky",
    alignItems: "stretch",
    top: 0,
    zIndex: 5,
  },
})
const Header: FC<any> = (): ReactElement => {
  const styles = useStyles()
  return (
    <div>
      <Paper className={styles.navbar}>
        <MyStepper />
        <Clock />
      </Paper>
    </div>
  )
}
export default Header
