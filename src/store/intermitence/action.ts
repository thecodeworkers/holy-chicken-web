import { SHOW_MODAL, RESET_MODALS, SET_STRING_KEY } from './action-types'
import { actionObject } from '@utils'

export const setShowModal = (show: any) => actionObject(SHOW_MODAL, show)
export const resetModals = () =>  actionObject(RESET_MODALS)
export const setStringKey = (key) => actionObject(SET_STRING_KEY, { key })
