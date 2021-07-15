import { registerMutation, loginMutation, restorePasswordEmail, resetUserPasswordMutation } from '@graphql'
import { actionObject } from '@utils'
import { REGISTER_USER, LOGIN_USER, RESTORE_PASSWORD_EMAIL, LOGOUT_USER, RESTORE_PASSWORD } from './action-types'
import { REQUEST_LOADER } from '@store/loader/actions-types'
import { setToast } from '@store/toast/action'
import { resetGuestStore } from '../guest/action'
import { resetCartStore } from '../cart/action'

export const registerUser = (body: any) => async (dispatch) => {

  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const result = await registerMutation(body)
    dispatch(actionObject(REGISTER_USER, { register: result }))
    dispatch(setToast('check', 'Usuario registrado exitosamente', 1))

  } catch(error) {
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

    if(result.message) throw new Error(result.message)

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
  } catch(error) {
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
  } catch(error) {
    dispatch(setToast('error', 'Error al cambiar la contraseña', 1))
    return error
  } finally {
    dispatch(actionObject(REQUEST_LOADER, false))
  }
}

export const resetForgotStatus = () => async (dispatch) => {
  await dispatch(actionObject(RESTORE_PASSWORD_EMAIL, { emailSended: false }))
}
