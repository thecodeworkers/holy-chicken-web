import { actionObject, fetchPostJSON, filter, formatFee, formatWooCommerceAmount, WooCommerceClient } from '@utils'
import { CURRENT_PRODUCT, PRODUCTS_NUMBER, CART_PRODUCTS, GET_CART, APPLY_COUPON, CART_ORDER, RESET_CART_STORE } from './action-types'
import { addItemToCartMutation, getCartQuery, removeFromCartMutation, updateItemQuantity, applyCouponMutation, updateShippingMethodMutation, addFee } from '@graphql'
import { REQUEST_LOADER } from '../loader/actions-types'
import { setToast, setShowModal } from '@store/actions'
import { setStep } from '@store/paymentStep/action'
import { getDollarEquivalent } from '@utils/dolarClient'
import getStripe from '@utils/getStripe'
import checkoutMutation from '@graphql/mutation/checkout'
import { RESET_STORE } from '@store/product/action-types'
import { RESET_TENDER_STORE } from '@store/tenderProduct/action-types'


export const setCurrentProduct = (data: any) => actionObject(CURRENT_PRODUCT, data)
export const setProductsNumber = (number: any) => actionObject(PRODUCTS_NUMBER, number)

export const getCart = () => async (dispatch, getState) => {
  const { auth, guest } = await getState()
  const sessionToken = auth?.login?.login?.customer?.sessionToken || guest.tmpSessionToken
  const result = await getCartQuery(sessionToken)
  if (result?.cart) result.cart.totalBs = await getDollarEquivalent(formatWooCommerceAmount(result?.cart?.total))
  dispatch(actionObject(CART_PRODUCTS, { cartProducts: result?.cart }))
  return result
}

export const setCartProducts = ({ databaseId, quantity = 1, }: any, extras = null) => async (dispatch, getState) => {
  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const { auth, guest } = await getState()
    const sessionToken = auth?.login?.login?.customer?.sessionToken || guest.tmpSessionToken

    if (sessionToken) {
      const result = await addItemToCartMutation(databaseId, quantity, null, sessionToken)
      if (result.message) throw new Error(result.message)

      let { addCartItems } = result
      const itemsNumber = addCartItems?.cart?.contents?.itemCount

      if (extras) {

        let extraAmount = 0
        const reduceData = (prev, next) => {
          extraAmount += next.price
          return prev + `/${next.extra}:${next.price}`
        }

        let extraString = `${addCartItems?.added[0]?.key}` + extras?.reduce(reduceData, '')

        if (addCartItems?.cart?.fees) {
          extraString = `${addCartItems?.cart?.fees[0].name}-${extraString}`
          extraAmount = extraAmount + addCartItems?.cart?.fees[0].amount
        }

        const feeResult = await addFee(extraString, extraAmount, sessionToken)

        if (feeResult?.message || !feeResult) throw new Error("bad add extra")
        addCartItems = feeResult?.addFee
      }


      addCartItems.cart.totalBs = await getDollarEquivalent(formatWooCommerceAmount(addCartItems?.cart?.total))

      dispatch(actionObject(CART_PRODUCTS, { cartProducts: addCartItems?.cart }))
      dispatch(setProductsNumber({ number: itemsNumber }))
      dispatch(setToast('check', 'Producto agregado al carrito ', 1))
      dispatch(setShowModal({ individualProductModal: false }))
      dispatch(setShowModal({ cartModal: true }))
      dispatch(actionObject(RESET_STORE))
      dispatch(actionObject(RESET_TENDER_STORE))

    }

    if (!sessionToken) {
      dispatch(setToast('warning', 'Por favor inicie sesión para continuar', 1))
    }

  } catch (error) {
    dispatch(setToast('check', 'Error al agregar producto al carrito', 1))
  } finally {
    dispatch(actionObject(REQUEST_LOADER, false))
  }
}

export const removeCartItem = (key) => async (dispatch, getState) => {

  try {
    const { auth, guest, cart: { cartProducts } } = await getState()
    const sessionToken = auth?.login?.login?.customer?.sessionToken || guest.tmpSessionToken

    if (cartProducts.fees) {
      if (cartProducts.fees[0].name.includes(key)) {

        const fees = cartProducts.fees[0].name.split('-')
        const feeIndex = fees.findIndex((data) => data.includes(key))

        let feeArray = fees[feeIndex].split('/')
        feeArray.shift()

        const removeAmount = feeArray.reduce((back, next) => {
          let feeData = next.split(':')
          return back + Number(feeData[1])
        }, 0)

        fees.splice(feeIndex, 1)

        const extraString = fees.join('-')
        const extraAmount = cartProducts.fees[0].amount - removeAmount
        await addFee(extraString, extraAmount, sessionToken)
      }
    }

    const result = await removeFromCartMutation(key, sessionToken)

    const { removeItemsFromCart } = result
    const itemsNumber = removeItemsFromCart?.cart?.contents?.itemCount

    if (removeItemsFromCart?.cart) removeItemsFromCart.cart.totalBs = await getDollarEquivalent(formatWooCommerceAmount(removeItemsFromCart?.cart?.total))

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
    const { auth, cart: { cartProducts }, guest } = await getState()
    const sessionToken = auth?.login?.login?.customer?.sessionToken || guest.tmpSessionToken
    if (sessionToken) {
      const filtered = filter(cartProducts?.contents?.nodes, product, 'key')
      const quantity = (type === 'add') ? filtered[0]?.quantity + 1 : filtered[0]?.quantity - 1;
      const max = filtered[0]?.product?.node?.stockQuantity
      const min = 0
      if (quantity > min && quantity <= max) {
        const data: any = await updateItemQuantity(filtered[0]?.key, quantity, sessionToken)

        if (data.message) throw new Error(data.message);

        const { updateItemQuantities } = data
        const itemsNumber = updateItemQuantities?.cart?.contents?.itemCount

        if (updateItemQuantities?.cart) updateItemQuantities.cart.totalBs = await getDollarEquivalent(formatWooCommerceAmount(updateItemQuantities?.cart?.total))

        dispatch(actionObject(CART_PRODUCTS, { cartProducts: updateItemQuantities?.cart }))
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
    const { auth, guest } = await getState()
    const sessionToken = auth?.login?.login?.customer?.sessionToken || guest.tmpSessionToken
    const result = await applyCouponMutation(code, sessionToken)

    if (result.message) {
      dispatch(actionObject(REQUEST_LOADER, false))
      dispatch(setToast('error', 'Código de cupón inválido', 1))
      return
    }

    const { applyCoupon: data } = result

    if (data?.cart) data.cart.totalBs = await getDollarEquivalent(formatWooCommerceAmount(data?.cart?.total))

    dispatch(actionObject(CART_PRODUCTS, { cartProducts: data?.cart }))
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
    const { auth, guest } = await getState()
    const sessionToken = auth?.login?.login?.customer?.sessionToken || guest.tmpSessionToken

    if (sessionToken) {
      const data: any = await updateShippingMethodMutation(method, sessionToken)

      if (data.message) throw new Error(data.message);

      if (data?.cart) data.cart.totalBs = await getDollarEquivalent(formatWooCommerceAmount(data?.cart?.total))

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
    const { auth, paymentStep: { delivery_data, user_data, billing_data, payment_data }, cart: { cartProducts }, guest } = await getState()
    const sessionToken = auth?.login?.login?.customer?.sessionToken || guest.tmpSessionToken
    if (sessionToken) {

      const databaseId = auth?.login?.login?.customer?.databaseId

      if (cartProducts?.fees) {
        const fees = formatFee(cartProducts?.fees[0].name)
        let notes = ''
        for (let fee in fees) {
          const product = cartProducts?.contents?.nodes?.find((data) => data.key === fee)
          if (product) {
            const database = (product?.variation) ? product?.variation.node?.databaseId : product?.product?.node?.databaseId
            notes += `${product?.product?.node?.name + ' ' + database} -`
            for (let feeData of fees[fee]) {
              notes += ` Extra: ${feeData[0]} `
            }
            notes += '/'
          }
        }
        await addFee(notes, cartProducts?.fees[0].amount, sessionToken)
      }

      let status = 'pending'

      if (payment_data.type?.toLowerCase() === 'tarjeta de credito') {
        const response = await fetchPostJSON('/api/payment-intent', { amount: formatWooCommerceAmount(cartProducts?.total), currency: 'USD', description: 'TESTING' })

        if (response.statusCode === 500) throw new Error('error');

        const stripe = await getStripe()

        const { paymentIntent, error } = await stripe.confirmCardPayment(response.client_secret, {
          payment_method: payment_data?.form?.card,
        })

        if (error && paymentIntent?.status !== 'succeeded') throw new Error(error.code);
        status = 'completed'
      }

      delivery_data['shippingMethod'] = cartProducts?.chosenShippingMethods

      const data: any = await checkoutMutation(billing_data, delivery_data, payment_data, user_data, sessionToken)

      if (data.message) throw new Error(data.message);

      await WooCommerceClient(`orders/${data?.order?.orderNumber}`, 'PUT', { customer_id: databaseId, status: status })
      await addFee('.', 0, sessionToken)
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

export const resetCartStore = () => actionObject(RESET_CART_STORE)
