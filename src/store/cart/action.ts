import { actionObject, filter, WooCommerceClient } from '@utils'
import { CURRENT_PRODUCT, PRODUCTS_NUMBER, CART_PRODUCTS, GET_CART, APPLY_COUPON, CART_ORDER } from './action-types'
import { addItemToCartMutation, getCartQuery, removeFromCartMutation, updateItemQuantity, applyCouponMutation, updateShippingMethodMutation } from '@graphql'
import { REQUEST_LOADER } from '../loader/actions-types'
import { setToast, setShowModal } from '@store/actions'
import checkoutMutation from '@graphql/mutation/checkout'
import { setStep } from '@store/paymentStep/action'


export const setCurrentProduct = (data: any) => actionObject(CURRENT_PRODUCT, data)
export const setProductsNumber = (number: any) => actionObject(PRODUCTS_NUMBER, number)

export const getCart = () => async (dispatch, getState) => {
  const { auth } = await getState()
  const sessionToken = auth?.login?.sessionToken
  const result = await getCartQuery(auth.isAuth, sessionToken)
  dispatch(actionObject(CART_PRODUCTS, { cartProducts: result?.cart }))
  return result
}

export const setCartProducts = ({ databaseId, quantity = 1 }: any, extras = null) => async (dispatch, getState) => {

  console.log('DATA BASE ID', databaseId)
  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const { auth } = await getState()
    const sessionToken = auth?.login?.login?.customer?.sessionToken || auth.tmpSessionToken

    if (sessionToken) {
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

    if (!sessionToken) {
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

    if (result.message) {
      dispatch(actionObject(REQUEST_LOADER, false))
      dispatch(setToast('error', 'Código de cupón inválido', 1))
      return
    }

    const { applyCoupon } = result

    dispatch(actionObject(CART_PRODUCTS, { cartProducts: applyCoupon?.cart }))
    dispatch(actionObject(REQUEST_LOADER, false))
    dispatch(setToast('check', 'Cupón de descuento aplicado exitosamente', 1))
    dispatch(actionObject(APPLY_COUPON, { coupon: result ? true : false }))

  } catch (error) {
    dispatch(actionObject(REQUEST_LOADER, false))
    dispatch(setToast('error', 'Ha ocurrido un error', 1))
  }
}


export const updateShippingMethod: any = (method) => async (dispatch, getState) => {
  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const { auth } = await getState()

    if (auth?.isAuth) {

      const sessionToken = auth?.login?.login?.customer?.sessionToken

      const data: any = await updateShippingMethodMutation(method, sessionToken)

      if (data.message) throw new Error(data.message);

      dispatch(actionObject(CART_PRODUCTS, { cartProducts: data?.cart }))
      dispatch(setToast('check', 'Zona de envio seleccionada', 1))
    }
    dispatch(actionObject(REQUEST_LOADER, false))
  } catch (error) {
    dispatch(actionObject(REQUEST_LOADER, false))
    dispatch(setToast('error', 'Error al actualizar zona de envio', 1))
  }
}

export const checkoutOrder: any = () => async (dispatch, getState) => {
  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const { auth, paymentStep: { delivery_data, user_data, billing_data, payment_data } } = await getState()

    if (auth?.isAuth) {

      const sessionToken = auth?.login?.login?.customer?.sessionToken
      const databaseId = auth?.login?.login?.customer?.databaseId

      const data: any = await checkoutMutation(billing_data, delivery_data, payment_data, user_data, sessionToken)

      if (data.message) throw new Error(data.message);

      await WooCommerceClient(`orders/${data?.order?.orderNumber}`, 'PUT', { customer_id: databaseId, status: 'pending' })

      dispatch(getCart())
      dispatch(actionObject(CART_ORDER, { order: data?.order }))
      dispatch(setToast('check', 'Orden Procesada con exito', 1))
    }
    dispatch(setStep({ loading: false }))
    dispatch(setProductsNumber({ number: null }))
    dispatch(actionObject(REQUEST_LOADER, false))
  } catch (error) {
    dispatch(actionObject(REQUEST_LOADER, false))
    dispatch(setToast('error', 'Error al procesar orden', 1))
  }
}
