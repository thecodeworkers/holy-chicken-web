import { actionObject } from '@utils'
import { CURRENT_PRODUCT, PRODUCTS_NUMBER, CART_PRODUCTS } from './action-types'
import { addItemToCartMutation} from  '@graphql'

export const setCurrentProduct = (data: any) => actionObject(CURRENT_PRODUCT, data)
export const setProductsNumber = (number: any) => actionObject(PRODUCTS_NUMBER, number)

export const setCartProducts = (product: any) => async (dispatch, getState) => {
  const { cart, auth } = await getState()

  const sessionToken = auth?.login?.sessionToken

  const prevState = cart.cartProducts

  console.log(...product)
  const result = await addItemToCartMutation({ ...product, sessionToken })

  console.log('CART RESUUULT', result)


  dispatch(actionObject(CART_PRODUCTS, { cartProducts: [ ...prevState, product ] }))
};
