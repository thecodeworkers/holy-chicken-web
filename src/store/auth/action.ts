import { registerMutation } from '@graphql'
import { actionObject } from '@utils'
import { REGISTER_USER } from './action-types'

export const registerUser = (body: any) => async (dispatch) => {

  const result = await registerMutation(body)

  try {
    dispatch(actionObject(REGISTER_USER, { register: result }))
  } catch(error) {
    dispatch(actionObject(REGISTER_USER, { register: 'error' }))
  }

}
