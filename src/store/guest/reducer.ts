import { LOGOUT_USER } from '@store/auth/action-types'
import { AnyAction } from 'redux'
import { GET_TMP_SESSION, RESET_GUEST_STORE, SET_TMP_BUY } from './action-types'

const initialState = {
  tmpSessionToken: '',
  timeGuest: null,
  tmpOrders: []
}

const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case GET_TMP_SESSION:
      return { ...state, ...payload }

    case SET_TMP_BUY:
      return { ...state, ...payload }

    case RESET_GUEST_STORE:
      return initialState
    case LOGOUT_USER:
      return initialState
    default:
      return state
  }
}

export default reducer
