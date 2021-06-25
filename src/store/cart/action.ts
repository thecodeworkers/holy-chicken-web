import { actionObject } from '@utils'
import { CURRENT_PRODUCT, PRODUCTS_NUMBER, CART_PRODUCTS, GET_CART } from './action-types'
import { addItemToCartMutation, getCartQuery, removeFromCartMutation } from '@graphql'
import { REQUEST_LOADER } from '../loader/actions-types'
import { setToast, setShowModal } from '@store/actions'

export const setCurrentProduct = (data: any) => actionObject(CURRENT_PRODUCT, data)
export const setProductsNumber = (number: any) => actionObject(PRODUCTS_NUMBER, number)

export const getCart = () => async (dispatch, getState) => {
  const { auth } = await getState()
  const sessionToken = auth?.login?.sessionToken
  const result = await getCartQuery(auth.isAuth, sessionToken)

  return console.log('RESUUUULT CART', result)
}

export const setCartProducts = ({ databaseId, quantity }: any) => async (dispatch, getState) => {
  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const { auth } = await getState()
    const sessionToken = auth?.login?.login?.customer?.sessionToken

    if (auth?.isAuth) {
      const result = await addItemToCartMutation(databaseId, 1, null, sessionToken)
      if(result.message) throw new Error(result.message)

      const { addCartItems } = result
      const itemsNumber = addCartItems?.cart?.contents?.itemCount

      dispatch(actionObject(CART_PRODUCTS, { cartProducts: addCartItems?.cart }))
      dispatch(setProductsNumber({ number: itemsNumber }))
      dispatch(setToast('check', 'Producto agregado al carrito ', 1))
      dispatch(setShowModal({ individualProductModal: false }))
    }

    if(!auth.isAuth) {
      dispatch(setToast('warning', 'Por favor inicie sesion para continuar', 1))
    }

  } catch(error) {
    dispatch(setToast('check', 'Error al agregar producto al carrito', 1))
  }

  finally {
    dispatch(actionObject(REQUEST_LOADER, false))
  }
}

export const removeCartItem = (key) => async (dispatch, getState) => {

  try {
    const { auth } = await getState()
    const sessionToken = auth?.login?.login?.customer?.sessionToken
    const result = await removeFromCartMutation(key, sessionToken)

    const { removeItemsFromCart } = result
    const itemsNumber = removeItemsFromCart?.cart?.contents?.itemCount

    dispatch(actionObject(CART_PRODUCTS, { cartProducts: removeItemsFromCart?.cart }))
    dispatch(setProductsNumber({ number: itemsNumber }))
    dispatch(setToast('check', 'Producto eliminado carrito', 1))

  } catch(error) {
    dispatch(setToast('error', 'Error al eliminar producto del carrito', 1))
    return error
  }


}
