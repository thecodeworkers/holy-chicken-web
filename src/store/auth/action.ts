import { registerMutation, loginMutation } from '@graphql'
import { actionObject } from '@utils'
import { REGISTER_USER, LOGIN_USER } from './action-types'

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
