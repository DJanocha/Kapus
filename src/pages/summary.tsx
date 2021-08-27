import { ReactElement, FC } from "react"
import { makeStyles, TextField } from "@material-ui/core"
import { useSelector } from "react-redux"
import { RootState } from "../redux/reducers/rootReducer"

const useStyles = makeStyles({
  paper: {
    backgroundColor: "primary",
    color: "black",
  },
})

const Form: FC<any> = (): ReactElement => {
  const appState = useSelector((state: RootState) => state.report)
  const styles = useStyles()
  interface info {
    characteristic: string
    content: string
  }

  const informations: Array<info | null> = [
    { characteristic: "Miasto oddziału", content: appState?.department?.city! },
    { characteristic: "Państwo oddziału", content: appState?.department?.country! },
    { characteristic: "Nazwa oddziału", content: appState?.department?.name! },
    { characteristic: "Twój adres email", content: appState?.form?.email! },
    { characteristic: "Twoja godność", content: appState?.form?.fullName! },
    { characteristic: "Treść Twojego zgłoszenia", content: appState?.form?.message! },
  ]
  return (
    <form>
      {informations.map((information, index) => {
        return (
          <>
            <TextField
              className={styles.paper}
              disabled
              color="primary"
              size="medium"
              defaultValue={`${information?.characteristic} : ${information?.content}`}
              fullWidth
              key={index}
              multiline={index === informations.length - 1}
              rows={index === informations.length - 1 ? 25 : 1}
            />
          </>
        )
      })}
    </form>
  )
}
export default Form
