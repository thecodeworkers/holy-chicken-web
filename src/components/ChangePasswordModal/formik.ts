import { useFormik } from 'formik'
import { passwordRegex } from '@utils/regex'
import { restorePassword } from '@store/actions'
import * as Yup from 'yup'

const formikConfig = (dispatch) => (useFormik({
  initialValues: {
    password: '',
    confirmPassword: ''
  },

  validationSchema: Yup.object({
    password: Yup.string()
      .required()
      .matches(passwordRegex),
    confirmPassword: Yup.string()
      .required()
      .matches(passwordRegex)
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
  }),

  onSubmit: values => {
    dispatch(restorePassword(values.password))
  }
}))

export default formikConfig
