import React, { ReactElement, FC } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Step, Stepper, StepButton, Typography } from "@material-ui/core"
import { routes, getCurrentIndex } from "../config/routes"
import { withRouter } from "react-router-dom"
import { useEffect } from "react"
import { RouteComponentProps } from "react-router"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      position: "sticky",
      top: 0,
      zIndex: 5,
    },
    button: {
      marginRight: theme.spacing(1),
    },
    completed: {
      display: "inline-block",
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
)

function getSteps() {
  return ["Oddział", "Formularz", "Podsumowanie formularza", "Polityka prywatności"]
}
function getRoutes() {
  return routes.map((route) => route.path)
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return "1: Gdzie chcesz złożyć zgłoszenie?"
    case 1:
      return "2: Prosimy o wypełnienie formularza"
    case 2:
      return "3: Zgłoszenie złożone pomyślnie. Oto szczegóły:"
    case 3:
      return "4: Prosimy o zapoznanie się z polityką prywatności."
    default:
      return "Unknown step"
  }
}

const MyStepper: FC<RouteComponentProps> = ({ history }): ReactElement => {
  useEffect(() => {
    console.log(history)
  }, [history])
  const classes = useStyles()
  const steps = getSteps()

  const handleStep = (step: number) => {
    history.push(getRoutes()[step])
  }

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={getCurrentIndex(history.location.pathname)}>
        {steps.map((label, index) => (
          <Step expanded key={label}>
            <StepButton
              disabled
              color="secondary"
              onClick={() => {
                handleStep(index)
              }}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        <Typography className={classes.instructions}>{getStepContent(getCurrentIndex(history.location.pathname))}</Typography>
      </div>
    </div>
  )
}
export default withRouter(MyStepper)
