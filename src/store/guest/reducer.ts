import { AnyAction } from 'redux'
import { GET_TMP_SESSION, RESET_GUEST_STORE } from './action-types'

const initialState = {
  tmpSessionToken: ''
}

const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case GET_TMP_SESSION:
      return { ...state, ...payload }

    case RESET_GUEST_STORE:
      return initialState

    default:
      return state
  }
}

export default reducer
