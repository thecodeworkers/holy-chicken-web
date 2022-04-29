import { SETSTEP } from './actions-types'
import { AnyAction } from 'redux'
import { LOGIN_USER, LOGOUT_USER } from '@store/auth/action-types'

const initialState = [{
  user_data: {},
  delivery_data: {
    date: '',
    time: '',
    type: '',
    location: '',
    form: {}
  },
  payment_data: {},
  billing_data: {},
  step: 1,
  forms: [],
  loading: false,
  confirmProcess: false,
}]

const setPaymentStepReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SETSTEP:
      return { ...state, ...payload }
    case LOGIN_USER:
      return initialState
    case LOGOUT_USER:
      return initialState
    default:
      return state
  }
}

export default setPaymentStepReducer
