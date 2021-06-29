import { useFormik } from 'formik'
import { emailRegex, passwordRegex, onlyLettersRegex } from '@utils/regex'
import * as Yup from 'yup'

const formikConfig = () => (useFormik({
  initialValues: {
    name: '',
    lastname: '',
    phone: '',
    identification: '',
    email: '',
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

    identification: Yup.string()
      .required(),

    email: Yup.string()
      .required()
      .matches(emailRegex),
  }),

  onSubmit: values => {
    console.log(JSON.stringify(values))
  }
}))

export default formikConfig
