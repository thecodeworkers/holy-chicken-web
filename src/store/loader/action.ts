import { LOADER, REQUEST_LOADER } from './actions-types'
import { actionObject } from '@utils'

export const setLoader = (show: boolean) => actionObject(LOADER, show)
export const requestLoader = (show: boolean) => actionObject(REQUEST_LOADER, show)

