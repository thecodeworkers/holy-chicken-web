import { AnyAction } from 'redux'
import { SET_RESOURCES, SEARCH_PRODUCTS, SET_FILTER } from './action-types'

const initialState = {
  general: {},
  outstanding: {},
  products: {},
  productsCategories: {},
  productsCopy: {},
  attributes: {},
  filter: {
    categories: []
  },
  shop: [],
}

const resourceReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_RESOURCES:
      return { ...state, ...payload }

    case SEARCH_PRODUCTS:
      return { ...state, ...payload }

    case SET_FILTER:
      return { ...state, ...payload }
    default:
      return state
  }
}

export default resourceReducer
