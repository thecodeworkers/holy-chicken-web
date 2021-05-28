import { SHOW_MODAL } from './action-types'
import { actionObject } from '@utils'

export const setShowModal = (show: boolean) => actionObject(SHOW_MODAL, show)

