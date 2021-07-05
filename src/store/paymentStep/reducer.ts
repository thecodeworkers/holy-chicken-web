import { SETSTEP } from './actions-types'
import { AnyAction } from 'redux'

const initialState = {
  user_data:{},
  delivery_data:{},
  payment_data:{},
  billing_data:{},
  step: 1
}

const setPaymentStepReducer = (state = initialState, { type, payload }: AnyAction) => {

  switch (type) {
    case SETSTEP:
      return { ...state, ...payload }

    default:
      return state
  }
}

export default setPaymentStepReducer
