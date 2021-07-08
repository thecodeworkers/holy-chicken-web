import { actionObject } from '@utils'
import { RESET_STORE, SET_EXTRAS, SET_SELECTION } from './action-types'

export const setSelection = (payload) => actionObject(SET_SELECTION, payload)
export const setExtras = (addons) => actionObject(SET_EXTRAS, { addons })
export const resetStore = () => actionObject(RESET_STORE)
