import { AnyAction } from 'redux'
import { SET_RESOURCES, SEARCH_PRODUCTS } from './action-types'

const initialState = {
  general: {},
  outstanding: {},
  products: {},
  productsCategories: {},
  productsCopy: {}
}

const resourceReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_RESOURCES:
      return { ...state, ...payload }

    case SEARCH_PRODUCTS:
      return { ...state, ...payload}
    default:
      return state
  }
}

export default resourceReducer
