import { useFormik } from 'formik'
import { emailRegex, passwordRegex, onlyLettersRegex, onlyNumbersRegex, phoneRegex } from '@utils/regex'
import { registerUser } from '@store/actions'
import * as Yup from 'yup'

const formikConfig = (dispatch) => (useFormik({
  initialValues: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  },

  validationSchema: Yup.object({
    firstName: Yup.string()
      .required()
      .matches(onlyLettersRegex),

      lastName: Yup.string()
      .required()
      .matches(onlyLettersRegex),

    phone: Yup.string()
      .required()
      .min(7)
      .max(15)
      .matches(phoneRegex),

    email: Yup.string()
      .required()
      .matches(emailRegex),

    password: Yup.string()
      .required()
      .matches(passwordRegex),

    confirmPassword: Yup.string()
      .required()
      .matches(passwordRegex)
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
  }),

  onSubmit: values => {
    dispatch(registerUser(values))
  }
}))

export default formikConfig
