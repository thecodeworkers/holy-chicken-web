import { actionObject } from '@utils'
import { RESET_STORE, SET_EXTRAS, SET_SELECTION } from './action-types'

export const setTenderSelection = (payload) => actionObject(SET_SELECTION, payload)
export const setTenderExtras = (extras) => actionObject(SET_EXTRAS, { extras })
export const resetTenderStore = () => actionObject(RESET_STORE)
