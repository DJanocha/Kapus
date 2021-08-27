import { ReactElement, FC } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { green } from "@material-ui/core/colors"
import IDepartmentInfo from "../model/IDepartment"
const useStyles = makeStyles({
  card: {
    width: "100%",
    maxHeight: "100%",
    textAlign: "center",
  },
  chosenCard: {
    width: "100%",
    maxHeight: "100%",
    backgroundColor: green[200],
    textAlign: "center",
  },
})
type withDepartment = {
  department: IDepartmentInfo
}
type choosable = {
  choose: (event: React.MouseEvent<any>) => void
  chosen?: boolean
}
type DepartmentProps = withDepartment & choosable

const Department: FC<DepartmentProps> = ({ department, choose, chosen }): ReactElement => {
  const classes = useStyles()
  console.log(department)
  return (
    <Card className={chosen ? classes.chosenCard : classes.card}>
      <CardActionArea onClick={choose}>
        <CardContent>
          <Typography gutterBottom variant="h1" component="h2">
            {department.name}
          </Typography>
          <Typography variant="h3" color="textSecondary" component="span">
            {department.city}
          </Typography>
          <Typography variant="h4" color="textSecondary" component="div">
            {department.country}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Department
