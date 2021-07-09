import { AnyAction } from 'redux'
import { SET_REFERENCE } from './action-types'

const initialState = {
  homeReference: {
    current: '',
    catering: false,
    location: false,
    outstanding: false
  },
  shopReference: {
    current: '',
    menu: false,
  }
}

const pageReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_REFERENCE:
      return { ...state, ...payload }

    default:
      return state
  }
}

export default pageReducer
