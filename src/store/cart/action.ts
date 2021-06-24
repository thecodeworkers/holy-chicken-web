import { actionObject } from '@utils'
import { CURRENT_PRODUCT, PRODUCTS_NUMBER, CART_PRODUCTS } from './action-types'

export const setCurrentProduct = (data: any) => actionObject(CURRENT_PRODUCT, data)
export const setProductsNumber = (number: any) => actionObject(PRODUCTS_NUMBER, number)

export const setCartProducts = (product: any) => async (dispatch, getState) => {
  const { cart } = await getState()
  const prevState = cart.cartProducts
  dispatch(actionObject(CART_PRODUCTS, { cartProducts: [ ...prevState, product ] }))
};
