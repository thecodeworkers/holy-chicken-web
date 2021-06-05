import { useFormik } from 'formik'
import { emailRegex, passwordRegex, onlyLettersRegex } from '@utils/regex'
import * as Yup from 'yup'

const formikConfig = () => (useFormik({
  initialValues: {
    name: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  },

  validationSchema: Yup.object({
    name: Yup.string()
      .required()
      .matches(onlyLettersRegex),

    lastname: Yup.string()
      .required()
      .matches(onlyLettersRegex),

    phone: Yup.string()
      .required(),

    email: Yup.string()
      .required()
      .matches(emailRegex),

    password: Yup.string()
      .required()
      .matches(passwordRegex),

    confirmPassword: Yup.string()
      .required()
      .matches(passwordRegex)
      .oneOf([Yup.ref('password'), null], 'Las contrasenas no coinciden')
  }),

  onSubmit: values => {
    console.log(JSON.stringify(values))
  }
}))

export default formikConfig
