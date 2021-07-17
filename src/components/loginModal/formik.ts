import { useFormik } from 'formik'
import { emailRegex, passwordRegex } from '@utils/regex'
import * as Yup from 'yup'
import { loginUser } from '@store/actions'

const formikConfig = (dispatch) => (useFormik({
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
    dispatch(loginUser(values))
  }
}))

export default formikConfig
