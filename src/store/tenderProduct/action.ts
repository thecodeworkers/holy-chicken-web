import { actionObject } from '@utils'
import { SET_TENDER_SELECTION, SET_TENDER_EXTRAS, RESET_TENDER_STORE } from './action-types'

export const setTenderSelection = (payload) => actionObject(SET_TENDER_SELECTION, payload)
export const setTenderExtras = (tenderExtras) => actionObject(SET_TENDER_EXTRAS, tenderExtras)
export const resetTenderStore = () => actionObject(RESET_TENDER_STORE)
