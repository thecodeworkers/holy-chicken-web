import { SHOW_MODAL } from './action-types'
import { AnyAction } from 'redux'

const initialState = {
  contactModal: false,
  loginModal: false,
  registerModal: false
}

const intermitenceReducer = (state = initialState, { type, payload }: AnyAction) => {

  switch (type) {
    case SHOW_MODAL:
      return { ...state, ...payload }

    default:
      return state
  }
}

export default intermitenceReducer
