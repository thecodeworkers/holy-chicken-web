import { TOAST_STATUS } from './action-types'
import { actionObject } from '@utils'

export const setToast  = (type, text, status) => actionObject(TOAST_STATUS, { type, text, status })


