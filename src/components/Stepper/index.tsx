import { FC } from 'react'
import styles from './styles.module.scss'
import { StepperProps } from './type'

const Stepper: FC<StepperProps> = ({ length = 3, currentStep, onPress }) => (
  <div className={styles._stepper}>
    {
      Array.from(Array(length).keys()).map((index) => {
        const current = index + 1;
        return (
          <div
            key={index}
            className={current == currentStep ? styles._currentStep : styles._step}
            onClick={() => onPress ? onPress(index) : null}
          ></div>
        )
      })
    }
  </div>
)

export default Stepper
