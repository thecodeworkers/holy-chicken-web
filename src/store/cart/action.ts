import { actionObject, filter } from '@utils'
import { CURRENT_PRODUCT, PRODUCTS_NUMBER, CART_PRODUCTS, GET_CART, APPLY_COUPON } from './action-types'
import { addItemToCartMutation, getCartQuery, removeFromCartMutation, updateItemQuantity, applyCouponMutation } from '@graphql'
import { REQUEST_LOADER } from '../loader/actions-types'
import { setToast, setShowModal } from '@store/actions'

export const setCurrentProduct = (data: any) => actionObject(CURRENT_PRODUCT, data)
export const setProductsNumber = (number: any) => actionObject(PRODUCTS_NUMBER, number)

export const getCart = () => async (dispatch, getState) => {
  const { auth } = await getState()
  const sessionToken = auth?.login?.sessionToken
  const result = await getCartQuery(auth.isAuth, sessionToken)

  return result
}

export const setCartProducts = ({ databaseId, quantity = 1 }: any) => async (dispatch, getState) => {
  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const { auth } = await getState()
    const sessionToken = auth?.login?.login?.customer?.sessionToken

    if (auth?.isAuth) {
      const result = await addItemToCartMutation(databaseId, quantity, null, sessionToken)
      if (result.message) throw new Error(result.message)

      const { addCartItems } = result
      const itemsNumber = addCartItems?.cart?.contents?.itemCount

      dispatch(actionObject(CART_PRODUCTS, { cartProducts: addCartItems?.cart }))
      dispatch(setProductsNumber({ number: itemsNumber }))
      dispatch(setToast('check', 'Producto agregado al carrito ', 1))
      dispatch(setShowModal({ individualProductModal: false }))
      dispatch(setShowModal({ cartModal: true }))
    }

    if (!auth.isAuth) {
      dispatch(setToast('warning', 'Por favor inicie sesión para continuar', 1))
    }

  } catch (error) {
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
    dispatch(setToast('check', 'Producto eliminado del carrito', 1))

  } catch (error) {
    dispatch(setToast('error', 'Error al eliminar producto del carrito', 1))
    return error
  }
}

export const updateQuantity: any = (product: any, type: any) => async (dispatch, getState) => {
  try {
    const { auth, cart: { cartProducts } } = await getState()

    if (auth?.isAuth) {

      const sessionToken = auth?.login?.login?.customer?.sessionToken

      const filtered = filter(cartProducts?.contents?.nodes, product, 'key')
      const quantity = (type === 'add') ? filtered[0]?.quantity + 1 : filtered[0]?.quantity - 1;
      const max = filtered[0]?.product?.node?.stockQuantity
      const min = 0
      if (quantity > min && quantity <= max) {
        const data: any = await updateItemQuantity(filtered[0]?.key, quantity, sessionToken)

        if (data.message) throw new Error(data.message);

        const { updateItemQuantities } = data
        const itemsNumber = updateItemQuantities?.cart?.contents?.itemCount

        dispatch(actionObject(CART_PRODUCTS, { cartProducts: data?.updateItemQuantities?.cart }))
        dispatch(setProductsNumber({ number: itemsNumber }))
        dispatch(setToast('check', 'Producto actualizado', 1))
        // dispatch(actionObject(REQUEST_LOADER, false))
        return
      }
      dispatch(setToast('error', 'Limite Maximo', 1))
    }
  } catch (error) {
    dispatch(actionObject(REQUEST_LOADER, false))
    dispatch(setToast('error', 'Error al actualizar producto', 1))
  }
}

export const applyCoupon = (code) => async (dispatch, getState) => {

  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const { auth } = await getState()
    const sessionToken = auth?.login?.login?.customer?.sessionToken
    const result = await applyCouponMutation(code, sessionToken)

    if (result.message){
      dispatch(actionObject(REQUEST_LOADER, false))
      dispatch(setToast('error', 'Código de cupón inválido', 1))
      return
    }

    const { applyCoupon } = result

    dispatch(actionObject(CART_PRODUCTS, { cartProducts: applyCoupon?.cart }))
    dispatch(actionObject(REQUEST_LOADER, false))
    dispatch(setToast('check', 'Cupón de descuento aplicado exitosamente', 1))
    dispatch(actionObject(APPLY_COUPON, { coupon: result ? true : false }))

  } catch(error) {
    dispatch(actionObject(REQUEST_LOADER, false))
    dispatch(setToast('error', 'Ha ocurrido un error', 1))
  }

}
