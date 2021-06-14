import { LOADER, REQUEST_LOADER } from './actions-types'
import { AnyAction } from 'redux'

const initialState = {
  show: false,
  requestLoader: false
}

const setLoaderReducer = (state = initialState, { type, payload }: AnyAction) => {

  switch (type) {
    case LOADER:
      return { ...state, show: payload }

    case REQUEST_LOADER:
      return { ...state, requestLoader: payload }

    default:
      return state
  }
}

export default setLoaderReducer
