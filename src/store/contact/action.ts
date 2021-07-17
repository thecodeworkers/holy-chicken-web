import { CONTACT_FORM, RESET_REDUCER } from './action-types'
import { actionObject } from '@utils'
import { contactMutation } from '@graphql'
import { REQUEST_LOADER } from '@store/loader/actions-types'
import { setToast } from '@store/toast/action'

export const sendContactForm = (body: any) => async (dispatch) => {
  try {
    dispatch(actionObject(REQUEST_LOADER, true))
    const result = await contactMutation(body)
    dispatch(actionObject(CONTACT_FORM, { contact: result }))
    dispatch(actionObject(REQUEST_LOADER, false))
    dispatch(setToast('check', 'Datos enviados exitosamente', 1))
  } catch(err) {
    dispatch(actionObject(REQUEST_LOADER, false))
    dispatch(setToast('error', 'Ocurrió un error al enviar datos', 1))
  }
}


export const resetReducer = () => async (dispatch) => {
  await dispatch(actionObject(RESET_REDUCER))
}
