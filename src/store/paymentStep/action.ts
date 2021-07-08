import { SETSTEP } from './actions-types'


export const setStep = (step: any) => {
  console.log(step);

  return {
    type: SETSTEP,
    payload: step
  }
}
