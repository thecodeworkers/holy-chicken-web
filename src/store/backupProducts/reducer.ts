import { AnyAction } from 'redux'
import { BACKUP_PRODUCTS } from './action-types'

const initialState = {
  backup: []
}

const backupProductsReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case BACKUP_PRODUCTS:
      return { ...state, ...payload }

    // case RESET_REDUCER:
    //   return initialState

    default:
      return state
  }
}

export default backupProductsReducer
