import { AnyAction } from 'redux'
import { REGISTER_USER } from './action-types'

const initialState = {
  register: null
}

const authReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case REGISTER_USER:
      return { ...state, ...payload }
    default:
      return state
  }
}

export default authReducer
