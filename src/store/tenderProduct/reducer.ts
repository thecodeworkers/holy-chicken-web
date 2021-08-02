import { AnyAction } from 'redux'
import { RESET_TENDER_STORE, SET_TENDER_EXTRAS, SET_TENDER_SELECTION } from './action-types'

const initialState = {
  freeSauce: 'Salsa de la casa',
  currentExtra: 'N/A',
  tenderExtras: [],
}

const tenerProductReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_TENDER_SELECTION:
      return { ...state, ...payload }
    case SET_TENDER_EXTRAS:
      return { ...state, ...payload }
    case RESET_TENDER_STORE:
      return {
        ...state,
        freeSauce: 'Salsa de la casa',
        currentExtra: 'N/A',
        tenderExtras: [],
      }

    default:
      return state
  }
}

export default tenerProductReducer
