import { useFormik } from 'formik'
import { emailRegex, passwordRegex, onlyLettersRegex, phoneRegex } from '@utils/regex'
import * as Yup from 'yup'
import { sendContactForm } from '@store/actions'

const formikConfig = (dispatch, type) => (useFormik({
  initialValues: {
    name: '',
    lastname: '',
    phone: '',
    email: '',
    message: '',
    file: ''
  },

  validationSchema: Yup.object({
    name: Yup.string()
      .required()
      .matches(onlyLettersRegex),

    lastname: Yup.string()
      .required()
      .matches(onlyLettersRegex),

    phone: Yup.string()
      .required().matches(phoneRegex),

    email: Yup.string()
      .required()
      .matches(emailRegex),

    message: Yup.string()
      .max(500)
  }),

  onSubmit: values => {
    const completeForm = { type, ...values }
    dispatch(sendContactForm(completeForm))
  }
}))

export default formikConfig
