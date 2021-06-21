import { CONTACT_FORM } from './action-types'
import { actionObject } from '@utils'
import { contactMutation } from '@graphql'

export const sendContactForm = (body: any) => async (dispatch) => {
  const result = await contactMutation(body)
  console.log('RESUUUULT', result)
  dispatch(actionObject(CONTACT_FORM, { contact: result }))
}


