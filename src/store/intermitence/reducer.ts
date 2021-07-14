import { SHOW_MODAL, RESET_MODALS, SET_STRING_KEY } from './action-types'
import { AnyAction } from 'redux'

const initialState = {
  contactModal: false,
  loginModal: false,
  registerModal: false,
  changePasswordModal: false,
  forgotPasswordModal: false,
  locationModal: false,
  individualProductModal: false,
  cartModal:false,
  showLocationModal: true,
  paymentModal: false,
  key: ''
}

const intermitenceReducer = (state = initialState, { type, payload }: AnyAction) => {

  switch (type) {
    case SHOW_MODAL:
      return { ...state, ...payload }

    case SET_STRING_KEY:
      return { ...state, ...payload }

    case RESET_MODALS:
      return initialState

    default:
      return state
  }
}

export default intermitenceReducer
