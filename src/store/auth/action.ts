import { registerMutation, loginMutation, restorePasswordEmail} from '@graphql'
import { actionObject } from '@utils'
import { REGISTER_USER, LOGIN_USER, RESTORE_PASSWORD_EMAIL } from './action-types'

export const registerUser = (body: any) => async (dispatch) => {
  const result = await registerMutation(body)
  dispatch(actionObject(REGISTER_USER, { register: result }))
}

export const loginUser = (body: any) => async (dispatch) => {
  const result = await loginMutation(body)
  dispatch(actionObject(LOGIN_USER, { login: result, isAuth: result?.login ? true : false }))
}

export const logoutUser = () => async (dispatch) => {
  await dispatch(actionObject(LOGIN_USER, { login: null, isAuth: null }))
}

export const sendRestorePasswordEmail = (body) => async (dispatch) => {
  const result = await restorePasswordEmail(body)

  console.log(result)
  await dispatch(actionObject(RESTORE_PASSWORD_EMAIL, { emailSended: result ? true : false }))
}
