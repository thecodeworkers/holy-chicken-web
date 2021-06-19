import { AnyAction } from 'redux'
import { CURRENT_PRODUCT, PRODUCTS_NUMBER } from './action-types'

const initialState = {
  currentProduct: null,
  number: null
}

const cardReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case CURRENT_PRODUCT:
      return { ...state, ...payload }

    case PRODUCTS_NUMBER:
      return { ...state, ...payload }

    default:
      return state
  }
}

export default cardReducer
