import { useState } from "react"
import IForm from "../model/IForm"
import { useDispatch } from "react-redux"
import { submitFormAC, unblockRouteIndexByIdAC } from "../redux/actions/reportActions"

type FormExtension = {
  formSubmitted: boolean
  success: boolean
}
export const useFormControls = () => {
  const initialFormValues: IForm & FormExtension = {
    fullName: "",
    email: "",
    message: "",
    formSubmitted: false,
    success: false,
  }

  const appDispatcher = useDispatch()
  const [values, setValues] = useState(initialFormValues)
  // let [populatedWithRandomApiText, setPopulatedWithRandomApiText] = useState(false)

  const [errors, setErrors] = useState({} as any)
  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors }

    if ("fullName" in fieldValues)
      temp.fullName =
        // fieldValues.fullName && fieldValues.fullName.split(" ").length > 1 && !RegExp(/g[A-Za-z]/).test(fieldValues.fullName) ? "" : "This field is required and has to be made of at least two words"
        fieldValues.fullName && fieldValues.fullName.split(" ").length > 1 ? "" : "This field is required and has to be made of at least two words"

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is  required."
      if (fieldValues.email) temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email) ? "" : "Email is not valid."
    }

    if ("message" in fieldValues)
      temp.message =
        fieldValues.message.trim().length > 1 && fieldValues.message.length < 5000 ? `` : `This field is required and cannot be longer than 5000 characters(${fieldValues.message.length}/5000)`

    setErrors({
      ...temp,
    })
  }
  const handleInputValue = (e: any) => {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value,
    })
    validate({ [name]: value })
  }
  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    if (!isTimeGood()) {
      //to trzeba dac w inne miejsce
      alert("Jesli sekundnik pokazuje liczbe w przedzial [10...19] lub [30...39] lub [50...59], niestety nie mozna kontynuowac. Proszę patrzeć uważnie na zegar na górze ekranu!")
      return
    }
    if (formIsValid()) {
      const readyFormElem: IForm = { email: values.email, fullName: values.fullName, message: values.message }
      appDispatcher(submitFormAC(readyFormElem))
      appDispatcher(unblockRouteIndexByIdAC(2))
    }
  }
  const formIsValid = (fieldValues = values) => {
    const isValid = fieldValues.fullName && fieldValues.email && fieldValues.fullName.trim().split(" ").length === 2 && fieldValues.message && Object.values(errors).every((x) => x === "")

    return isValid
  }
  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors,
  }
}

const isTimeGood = (): boolean => {
  const seconds = new Date().getSeconds()
  return (seconds + 10) % 20 >= 10
}
