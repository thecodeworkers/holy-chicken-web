import { CONTACT_FORM } from './action-types'
import { actionObject } from '@utils'
import { contactMutation } from '@graphql'
import { REQUEST_LOADER } from '@store/loader/actions-types'

export const sendContactForm = (body: any) => async (dispatch) => {
  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const result = await contactMutation(body)
    dispatch(actionObject(CONTACT_FORM, { contact: result }))
    dispatch(actionObject(REQUEST_LOADER, false))
  } catch(err) {
    dispatch(actionObject(REQUEST_LOADER, false))
  }
}


