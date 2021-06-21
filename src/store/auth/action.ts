import { registerMutation, loginMutation, restorePasswordEmail } from '@graphql'
import { actionObject } from '@utils'
import { REGISTER_USER, LOGIN_USER, RESTORE_PASSWORD_EMAIL } from './action-types'
import { REQUEST_LOADER } from '@store/loader/actions-types'

export const registerUser = (body: any) => async (dispatch) => {
  const result = await registerMutation(body)
  dispatch(actionObject(REGISTER_USER, { register: result }))
}

export const loginUser = (body: any) => async (dispatch) => {
  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const result = await loginMutation(body)
    dispatch(actionObject(LOGIN_USER, { login: result, isAuth: result?.login ? true : false }))
  } catch (error) {
    return error
  }
  finally {
    dispatch(actionObject(REQUEST_LOADER, false))
  }
}

export const logoutUser = () => async (dispatch) => {
  await dispatch(actionObject(LOGIN_USER, { login: null, isAuth: null }))
}

export const sendRestorePasswordEmail = (body) => async (dispatch) => {

  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const result = await restorePasswordEmail(body)
    await dispatch(actionObject(RESTORE_PASSWORD_EMAIL, { emailSended: result ? true : false }))
  } catch(error) {
    return error
  }
  finally {
    dispatch(actionObject(REQUEST_LOADER, false))
  }

}
