import { AnyAction } from 'redux'
import { CURRENT_PRODUCT, PRODUCTS_NUMBER, CART_PRODUCTS, APPLY_COUPON, CART_ORDER } from './action-types'
import { LOGOUT_USER } from '@store/auth/action-types'

const initialState = {
  currentProduct: null,
  number: null,
  cartProducts: [],
  coupon: false,
  order: {
    orderNumber: '000'
  },
}

const cardReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case CURRENT_PRODUCT:
      return { ...state, ...payload }
    case PRODUCTS_NUMBER:
      return { ...state, ...payload }
    case CART_PRODUCTS:
      return { ...state, ...payload }
    case LOGOUT_USER:
      return initialState
    case APPLY_COUPON:
      return { ...state, ...payload }
    case CART_ORDER:
      return { ...state, ...payload }
    default:
      return state
  }
}

export default cardReducer
