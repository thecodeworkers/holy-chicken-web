import { AnyAction } from 'redux'
import { GET_TMP_SESSION, RESET_GUEST_STORE, SET_TMP_BUY } from './action-types'

const initialState = {
  tmpSessionToken: '',
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

    default:
      return state
  }
}

export default reducer
