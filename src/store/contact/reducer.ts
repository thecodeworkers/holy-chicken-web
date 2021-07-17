import { AnyAction } from 'redux'
import { CONTACT_FORM, RESET_REDUCER } from './action-types'

const initialState = {
  contact: null
}

const contactReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case CONTACT_FORM:
      return { ...state, ...payload }

    case RESET_REDUCER:
      return initialState

    default:
      return state
  }
}

export default contactReducer
