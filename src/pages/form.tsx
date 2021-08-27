import { Button, TextField } from "@material-ui/core"
import { FC, ReactElement } from "react"
import { useSelector } from "react-redux"
import { useFormControls } from "../hooks/useFormControl"
import { RootState } from "../redux/reducers/rootReducer"

const inputFieldValues = [
  {
    name: "fullName",
    label: "Imię i nazwisko",
    id: "my-name",
  },
  {
    name: "email",
    label: "Email",
    id: "my-email",
  },
  {
    name: "message",
    label: "Wiadomość",
    id: "my-message",
    multiline: true,
    rows: 30,
  },
]
const Form: FC<any> = (): ReactElement => {
  const appState = useSelector((state: RootState) => state.report) //potrzegbne w ogole?

  const { handleInputValue, handleFormSubmit, formIsValid, errors } = useFormControls()
  type formVariable = "message" | "fullName" | "email"
  const getDefaultValue = (variableName: formVariable): string => {
    switch (variableName) {
      case "message":
        return appState?.form?.message || appState?.exampleMessages.join("\n")
      case "email":
        return appState?.form?.email || ""
      case "fullName":
        return appState?.form?.fullName || ""
      default:
        return ""
    }
  }
  return (
    <form onSubmit={handleFormSubmit}>
      {inputFieldValues.map((inputFieldValue, index) => {
        return (
          <div key={index}>
            <TextField
              defaultValue={getDefaultValue(inputFieldValue.name as formVariable)}
              fullWidth
              key={index}
              onBlur={handleInputValue}
              onChange={handleInputValue}
              name={inputFieldValue.name}
              label={inputFieldValue.label}
              multiline={inputFieldValue.multiline ?? false}
              rows={inputFieldValue.rows ?? 1}
              autoComplete="none"
              {...(errors[inputFieldValue.name] && { error: true, helperText: errors[inputFieldValue.name] })}
            />
          </div>
        )
      })}
      {appState?.form?.fullName ? (
        <Button type="submit" variant="contained" color="secondary" fullWidth disabled={!formIsValid()}>
          Aktualizuj
        </Button>
      ) : (
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={!formIsValid()}>
          Wyślij
        </Button>
      )}
    </form>
  )
}
export default Form
