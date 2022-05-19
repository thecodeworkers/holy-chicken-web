import { SAVE_DELIVERY } from './actions-types'
import { AnyAction } from 'redux'

const initialState = []

const deliveryReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SAVE_DELIVERY:
      return [ ...state,payload ]
    default:
      return state
  }
}

export default deliveryReducer
