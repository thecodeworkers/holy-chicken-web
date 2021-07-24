import { registerMutation, loginMutation, restorePasswordEmail, resetUserPasswordMutation, getTmpSessionToken, getOrdersQuery } from '@graphql'
import { actionObject, filter, setCamelCaseKey, WooCommerceClient } from '@utils'
import { REGISTER_USER, LOGIN_USER, RESTORE_PASSWORD_EMAIL, LOGOUT_USER, RESTORE_PASSWORD, GET_TMP_SESSION } from './action-types'
import { REQUEST_LOADER } from '@store/loader/actions-types'
import { setToast } from '@store/toast/action'
import { resetGuestStore } from '../guest/action'
import { SET_TMP_BUY } from '../guest/action-types'
import { resetCartStore } from '../cart/action'

export const registerUser = (body: any) => async (dispatch) => {

  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const result = await registerMutation(body)
    dispatch(actionObject(REGISTER_USER, { register: result }))
    dispatch(setToast('check', 'Usuario registrado exitosamente', 1))

  } catch (error) {
    dispatch(setToast('check', 'Error al registrar usuario', 1))
  }

  finally {
    dispatch(actionObject(REQUEST_LOADER, false))
  }
}

export const loginUser = (body: any) => async (dispatch) => {
  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const result = await loginMutation(body)

    console.log('ENTER LOGIN', result)

    if (result.message) throw new Error(result.message)

    dispatch(actionObject(LOGIN_USER, { login: result, isAuth: result?.login ? true : false }))
    dispatch(dispatch(setToast('check', 'Usuario autenticado exitosamente', 1)))
    dispatch(resetGuestStore())
    dispatch(resetCartStore())

  } catch (error) {
    dispatch(setToast('error', 'Error al autenticar usuario', 1))
  }
  finally {
    dispatch(actionObject(REQUEST_LOADER, false))
  }
}

export const logoutUser = () => async (dispatch) => {
  await dispatch(actionObject(LOGOUT_USER, {}))
}

export const sendRestorePasswordEmail = (body) => async (dispatch) => {
  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const result = await restorePasswordEmail(body)
    dispatch(actionObject(RESTORE_PASSWORD_EMAIL, {
      emailSended: result ? true : false,
      tmpEmail: body.email
    }))
    dispatch(setToast('check', 'Correo enviado exitosamente ', 1))
  } catch (error) {
    dispatch(setToast('error', 'Error al enviar correo', 1))
    return error
  } finally {
    dispatch(actionObject(REQUEST_LOADER, false))
  }
}

export const restorePassword = (password) => async (dispatch, getState) => {
  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const { auth: { tmpEmail }, intermitence: { key } } = getState()

    const body = {
      email: tmpEmail,
      key,
      password
    }

    const result = await resetUserPasswordMutation(body)
    if (!result?.sessionToken) throw 'error';

    dispatch(actionObject(RESTORE_PASSWORD, {
      tmpEmail: ''
    }))

    dispatch(setToast('check', 'Contraseña cambiada con exito', 1))
  } catch (error) {
    dispatch(setToast('error', 'Error al cambiar la contraseña', 1))
    return error
  } finally {
    dispatch(actionObject(REQUEST_LOADER, false))
  }
}

export const resetForgotStatus = () => async (dispatch) => {
  await dispatch(actionObject(RESTORE_PASSWORD_EMAIL, { emailSended: false }))
}

export const updateUserData: any = () => async (dispatch, getState) => {
  try {
    const { auth, resource: { productsCopy }, guest: { tmpSessionToken } } = getState()
    const customer = auth?.login?.login?.customer

    dispatch(actionObject(REQUEST_LOADER, true))

    if (customer) {
      let orders = await WooCommerceClient('orders?per_page=100')
      orders = filter(orders, customer.databaseId, 'customer_id')

      orders = orders.map((order, index) => {
        order = setCamelCaseKey(order)
        order.orderNumber = order.number
        order.date = order.dateCreated

        if (customer?.orders?.nodes) {
          const oldOrders = customer.orders.nodes
          order.trackOrder = oldOrders[index].trackOrder
        }

        order.lineItems = {
          nodes: order.lineItems.map(item => {
            item = setCamelCaseKey(item)
            item = { ...item, ...filter(productsCopy, item.productId, 'databaseId')[0] }
            item.variation = (item?.variations?.nodes) ? filter(item.variations.nodes, item.variationId, 'databaseId')[0] : null
            return item
          })
        }
        return order
      })

      const newLogin = {
        ...auth?.login?.login,
        ...{
          customer: {
            ...customer,
            ...{ orders: { nodes: { product: orders } } }
          }
        }
      }

      dispatch(actionObject(LOGIN_USER, { login: {login: newLogin} }));
    }

    if (tmpSessionToken) {
      const tmpOrders = await getOrdersQuery(tmpSessionToken)
      dispatch(actionObject(SET_TMP_BUY, { tmpOrders }));
    }

    dispatch(actionObject(REQUEST_LOADER, false))
  } catch (error) {
    dispatch(actionObject(REQUEST_LOADER, false))
  }
}
