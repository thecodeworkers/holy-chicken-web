import { SHOW_MODAL } from './action-types'
import { actionObject } from '@utils'

export const setShowModal = (show: any) => actionObject(SHOW_MODAL, show)

