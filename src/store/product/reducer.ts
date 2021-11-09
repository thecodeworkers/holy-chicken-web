import { AnyAction } from 'redux'
import { RESET_STORE, SET_EXTRAS, SET_SELECTION, SET_SPECIALS } from './action-types'

const initialState = {
  freeFresh: 'N/A',
  freeSauce: 'N/A',
  blessing: 'N/A',
  sauce: 'N/A',
  addons: [],
  blessingAddons: [],
  sauceAddons: []
}


const productReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_SELECTION:
      return { ...state, ...payload }
    case SET_EXTRAS:
      return { ...state, ...payload }
    case SET_SPECIALS:
      return { ...state, ...payload }
    case RESET_STORE:
      return {
        ...state,
        freeFresh: 'N/A',
        freeSauce: 'N/A',
        blessing: 'N/A',
        sauce: 'N/A',
        addons: [],
        specialAddons: [],
        sauceAddons: []
      }
    default:
      return state
  }
}

export default productReducer
