import { SET_REFERENCE, RESET_STATE  } from './action-types'
import { actionObject } from '../../utils/common'

export const seletedReference = (reference: any) => actionObject(SET_REFERENCE, reference)
export const resetState = () => actionObject(RESET_STATE)
