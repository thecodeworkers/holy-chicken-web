import { VARIABLE_PRODUCT } from './action-types'
import { actionObject } from '@utils'

export const setVariableProduct = (product: any) => actionObject(VARIABLE_PRODUCT, product)


