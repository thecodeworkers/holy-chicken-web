import { AnyAction } from 'redux'
import { REGISTER_USER, LOGIN_USER } from './action-types'

const initialState = {
  register: null,
  login: null,
  isAuth: null
}

const authReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case REGISTER_USER:
      return { ...state, ...payload }

    case LOGIN_USER:
     return { ...state, ...payload }

    default:
      return state
  }
}

export default authReducer
