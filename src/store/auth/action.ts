import { registerMutation, loginMutation, restorePasswordEmail, resetUserPasswordMutation, getTmpSessionToken } from '@graphql'
import { actionObject, filter, setCamelCaseKey, WooCommerceClient } from '@utils'
import { REGISTER_USER, LOGIN_USER, RESTORE_PASSWORD_EMAIL, LOGOUT_USER, RESTORE_PASSWORD, GET_TMP_SESSION } from './action-types'
import { REQUEST_LOADER } from '@store/loader/actions-types'
import { setToast } from '@store/toast/action'

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

    if (result.message) throw new Error(result.message)

    console.log(result)

    dispatch(actionObject(LOGIN_USER, { login: result, isAuth: result?.login ? true : false }))
    dispatch(dispatch(setToast('check', 'Usuario autenticado exitosamente', 1)))
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

export const getTmpSession = () => async (dispatch) => {
  const response = await getTmpSessionToken();
  const tmpSessionToken = response?.sessionToken || ''

  return dispatch(actionObject(GET_TMP_SESSION, { tmpSessionToken }))
}

export const updateUserData: any = () => async (dispatch, getState) => {

  const { auth, resource: { productsCopy } } = getState()
  try {
    const customer = auth?.login?.login?.customer
    dispatch(actionObject(REQUEST_LOADER, true))
    if (customer) {

      let orders = await WooCommerceClient('orders?per_page=100')
      orders = filter(orders, customer.databaseId, 'customer_id')

      orders = orders.map((order) => {
        order = setCamelCaseKey(order)
        order.orderNumber = order.number
        order.date = order.dateCreated
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

      const newLogin = { ...auth?.login?.login, ...{ customer: { ...customer, ...{ orders: { nodes: orders } } } } }
      dispatch(actionObject(LOGIN_USER, { login: {login: newLogin} }));
    }
    dispatch(actionObject(REQUEST_LOADER, false))
  } catch (error) {
    dispatch(actionObject(REQUEST_LOADER, false))
  }
}
