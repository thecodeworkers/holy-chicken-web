import { SHOW_MODAL } from './action-types'
import { AnyAction } from 'redux'

const initialState = {
  show: false
}

const intermitenceReducer = (state = initialState, { type, payload }: AnyAction) => {

  switch (type) {
    case SHOW_MODAL:
      return { ...state, show: payload }

    default:
      return state
  }
}

export default intermitenceReducer
