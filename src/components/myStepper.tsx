import React, { ReactElement, FC } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Button, Step, Stepper, StepButton, Typography } from "@material-ui/core"
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
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({})
  const steps = getSteps()

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleStep = (step: number) => {
    setActiveStep(step)
    history.push(getRoutes()[step])
  }
  const [available, setAvailable] = React.useState(false)

  const handleReset = () => {
    setActiveStep(0)
    setAvailable(false)
    setCompleted({})
  }

  return (
    <div className={classes.root}>
      {/* <Paper elevation={10}> */}
      <Stepper nonLinear activeStep={getCurrentIndex(history.location.pathname)}>
        {steps.map((label, index) => (
          <Step expanded key={label}>
            <StepButton
              disabled
              color="secondary"
              onClick={() => {
                handleStep(index)
              }}
              completed={completed[index]}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {allStepsCompleted() ? (
        <div>
          <Typography className={classes.instructions}>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      ) : (
        <div>
          <Typography className={classes.instructions}>{getStepContent(getCurrentIndex(history.location.pathname))}</Typography>
        </div>
      )}
    </div>
  )
}
export default withRouter(MyStepper)
