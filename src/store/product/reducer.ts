import { AnyAction } from 'redux'
import { RESET_STORE, SET_SELECTION } from './action-types'

const initialState = {
  freeFresh: 'Veggies',
  freeSauce: 'Salsa de la casa',
  blessing: 'N/A',
  sauce: 'N/A',
  addons: []
}

const productReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_SELECTION:
      return { ...state, ...payload }
    case SET_SELECTION:
      return { ...state, ...payload }
    case RESET_STORE:
      return {
        ...state,
        freeFresh: 'Veggies',
        freeSauce: 'Salsa de la casa',
        blessing: 'N/A',
        sauce: 'N/A',
        addons: []
      }
    default:
      return state
  }
}

export default productReducer
