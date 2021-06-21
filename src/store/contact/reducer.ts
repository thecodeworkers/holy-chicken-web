import { AnyAction } from 'redux'
import { CONTACT_FORM } from './action-types'

const initialState = {
  contact: null
}

const contactReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case CONTACT_FORM:
      return { ...state, ...payload }
    default:
      return state
  }
}

export default contactReducer
