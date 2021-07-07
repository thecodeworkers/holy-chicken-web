import { AnyAction } from 'redux'
import { SET_SELECTION } from './action-types'

const initialState = {
  freeFresh: 'Veggies',
  freeSauce: 'Salsa de la casa',
  blessing: 'N/A',
  sauce: 'N/A'
}

const productReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_SELECTION:
      return { ...state, ...payload }
    default:
      return state
  }
}

export default productReducer
