import { SETSTEP } from './actions-types'


export const setStep = (step: any) => {
  return {
    type: SETSTEP,
    payload: step
  }
}
