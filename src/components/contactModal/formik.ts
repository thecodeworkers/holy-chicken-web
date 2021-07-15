import { useFormik } from 'formik'
import { emailRegex, passwordRegex, onlyLettersRegex, phoneRegex } from '@utils/regex'
import * as Yup from 'yup'

const formikConfig = () => (useFormik({
  initialValues: {
    name: '',
    lastname: '',
    phone: '',
    email: '',
    message: ''
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
  }),

  onSubmit: values => {
    console.log(JSON.stringify(values))
  }
}))

export default formikConfig
