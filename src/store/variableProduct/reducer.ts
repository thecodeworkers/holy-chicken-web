import { VARIABLE_PRODUCT } from './action-types'
import { AnyAction } from 'redux'

const initialState = {
  currentVariableProduct: null
}

const variableProductReducer = (state = initialState, { type, payload }: AnyAction) => {

  switch (type) {
    case VARIABLE_PRODUCT:
      return { ...state, ...payload }

    default:
      return state
  }
}

export default variableProductReducer
