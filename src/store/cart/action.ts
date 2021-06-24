import { actionObject } from '@utils'
import { CURRENT_PRODUCT, PRODUCTS_NUMBER, CART_PRODUCTS, GET_CART } from './action-types'
import { addItemToCartMutation, getCartQuery } from '@graphql'

export const setCurrentProduct = (data: any) => actionObject(CURRENT_PRODUCT, data)
export const setProductsNumber = (number: any) => actionObject(PRODUCTS_NUMBER, number)

export const setCartProducts = ({ databaseId, quantity }) => async (dispatch, getState) => {
  try {
    const { auth } = await getState()
    const sessionToken = auth?.login?.sessionToken

    if (auth?.isAuth) {
      const result = await addItemToCartMutation(databaseId, 1, sessionToken)
      if(result.message) throw new Error(result.message)

      const { addCartItems } = result
      const itemsNumber = addCartItems?.cart?.contents?.itemCount

      dispatch(actionObject(CART_PRODUCTS, { cartProducts: addCartItems?.cart }))
      dispatch(setProductsNumber({ number: itemsNumber }))
    }

  } catch(error) {
    console.log(error)
  }
}

export const getCart = () => async (dispatch, getState) => {
  const { auth } = await getState()
  const sessionToken = auth?.login?.sessionToken
  const result = await getCartQuery(auth.isAuth, sessionToken)

  return console.log('REAUUULT CART', result)

  // dispatch(actionObject(GET_CART, shop))
}
