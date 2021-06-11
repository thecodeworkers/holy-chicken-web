import { useFormik } from 'formik'
import { emailRegex, passwordRegex } from '@utils/regex'
import * as Yup from 'yup'
import { loginUser } from '@store/actions'

const formikConfig = (dispatch, method) => (useFormik({
  initialValues: {
    email: '',
  },

  validationSchema: Yup.object({
    email: Yup.string()
      .required()
      .matches(emailRegex),
  }),

  onSubmit: values => {
    dispatch(loginUser(values))
    // method()
  }
}))

export default formikConfig
