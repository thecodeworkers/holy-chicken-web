import { AnyAction } from 'redux'
import { RESET_STORE, SET_EXTRAS, SET_SELECTION, SET_SPECIALS } from './action-types'

const initialState = {
  addons: {},
  attributes: {}
}


const productReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_SELECTION:
      return { ...state, attributes: payload }
    case SET_EXTRAS:
      return { ...state, ...payload }
    case SET_SPECIALS:
      return { ...state, ...payload }
    case RESET_STORE:
      return initialState
    default:
      return state
  }
}

export default productReducer
