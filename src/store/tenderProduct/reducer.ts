import { AnyAction } from 'redux'
import { RESET_STORE, SET_EXTRAS, SET_SELECTION } from './action-types'

const initialState = {
  freeSauce: 'Salsa de la casa',
  tenderExtras: [],
}

const tenerProductReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_SELECTION:
      return { ...state, ...payload }
    case SET_EXTRAS:
      return { ...state, ...payload }
    case RESET_STORE:
      return {
        ...state,
        freeSauce: 'Salsa de la casa',
        tenderExtras: [],
      }

    default:
      return state
  }
}

export default tenerProductReducer
