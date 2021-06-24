import { SHOW_MODAL, RESET_MODALS } from './action-types'
import { AnyAction } from 'redux'

const initialState = {
  contactModal: false,
  loginModal: false,
  registerModal: false,
  changePasswordModal: false,
  forgotPasswordModal: false,
  locationModal: false,
  individualProductModal: false,
  cartModal:false
}

const intermitenceReducer = (state = initialState, { type, payload }: AnyAction) => {

  switch (type) {
    case SHOW_MODAL:
      return { ...state, ...payload }

    case RESET_MODALS:
      return initialState

    default:
      return state
  }
}

export default intermitenceReducer
