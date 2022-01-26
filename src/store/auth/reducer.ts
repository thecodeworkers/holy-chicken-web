import { AnyAction } from 'redux'
import { REGISTER_USER, LOGIN_USER, RESTORE_PASSWORD_EMAIL, LOGOUT_USER, RESTORE_PASSWORD } from './action-types'

const initialState = {
  register: null,
  login: null,
  isAuth: null,
  emailSended: null,
  tmpEmail: '',
  authTime: null
}

const authReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case REGISTER_USER:
      return { ...state, ...payload }

    case LOGIN_USER:
     return { ...state, ...payload }

    case RESTORE_PASSWORD_EMAIL:
      return { ...state, ...payload }

    case RESTORE_PASSWORD:
      return { ...state, ...payload }

    case LOGOUT_USER:
      return initialState

    default:
      return state
  }
}

export default authReducer
