import { useFormik } from 'formik'
import { emailRegex, passwordRegex } from '@utils/regex'
import * as Yup from 'yup'

const formikConfig = () => (useFormik({
  initialValues: {
    email: '',
    password: ''
  },

  validationSchema: Yup.object({
    email: Yup.string()
      .required()
      .matches(emailRegex),

    password: Yup.string()
      .required()
      .matches(passwordRegex),
  }),

  onSubmit: values => {
    console.log(JSON.stringify(values))
  }
}))

export default formikConfig
