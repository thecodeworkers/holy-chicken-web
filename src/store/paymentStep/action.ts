import { actionObject } from '@utils'
import { SAVE_DELIVERY, SETSTEP } from './actions-types'


export const setStep = (step: any) => {
  return {
    type: SETSTEP,
    payload: step
  }
}

export const saveDelivery = (payload) => actionObject(SAVE_DELIVERY, payload)
