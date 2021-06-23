import { AnyAction } from 'redux'
import { CURRENT_PRODUCT, PRODUCTS_NUMBER, CART_PRODUCTS } from './action-types'

const initialState = {
  currentProduct: null,
  number: null,
  cartProducts: []
}

const cardReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case CURRENT_PRODUCT:
      return { ...state, ...payload }

    case PRODUCTS_NUMBER:
      return { ...state, ...payload }

    case CART_PRODUCTS:
      return { ...state, ...payload }

    default:
      return state
  }
}

export default cardReducer
