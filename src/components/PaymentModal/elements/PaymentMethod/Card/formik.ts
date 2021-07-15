import { useFormik } from 'formik'
import { onlyLettersRegex } from '@utils/regex'
import * as Yup from 'yup'

const formikConfig = () => (useFormik({
  initialValues: {
    name: '',
  },

  validationSchema: Yup.object({
    name: Yup.string().required().matches(onlyLettersRegex),
  }),

  onSubmit: values => {
  }
}))

export default formikConfig
