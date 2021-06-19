import { actionObject } from '@utils'
import { CURRENT_PRODUCT, PRODUCTS_NUMBER } from './action-types'

export const setCurrentProduct = (data: any) => actionObject(CURRENT_PRODUCT, data)
export const setProductsNumber = (number: any) => actionObject(PRODUCTS_NUMBER, number)
