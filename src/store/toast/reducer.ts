import { TOAST_STATUS } from './action-types'
import { AnyAction } from 'redux'

const initialState = {
  type: '',
  text: '',
  status: 0
}

const toastReducer = (state = initialState, { type, payload }: AnyAction) => {

  switch (type) {
    case TOAST_STATUS:
      return { ...state, ...payload }

    default:
      return state
  }
}

export default toastReducer
