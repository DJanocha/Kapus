import { FC, ReactElement, useState, useEffect } from "react"
import WatchLaterIcon from "@material-ui/icons/WatchLater"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    marginTop: "-3rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "grey",
  },
  clock: {
    marginTop: "-2rem",
  },
})
const Clock: FC<{}> = (): ReactElement => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  const styles = useStyles()
  const tick = () => {
    setTime(new Date().toLocaleTimeString())
  }
  useEffect(() => {
    const timeIntervalClear = setInterval(() => {
      tick()
    }, 200)
    return () => {
      clearInterval(timeIntervalClear)
    }
  }, [])
  return (
    <span className={styles.root}>
      <WatchLaterIcon fontSize="medium" />
      <span style={{ display: "flex", flexDirection: "row", marginRight: "10px" }}>
        {new Date().toLocaleDateString()}
        <br />
        {time}
      </span>
    </span>
  )
}

export default Clock
