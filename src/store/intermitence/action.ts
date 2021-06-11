import { SHOW_MODAL, RESET_MODALS } from './action-types'
import { actionObject } from '@utils'

export const setShowModal = (show: any) => actionObject(SHOW_MODAL, show)
export const resetModals = () =>  actionObject(RESET_MODALS)


