import { useFormik } from 'formik'
import { emailRegex, onlyLettersRegex, onlyNumbersRegex } from '@utils/regex'
import * as Yup from 'yup'

const formikConfig = () => (useFormik({
  initialValues: {
    name: '',
    lastname: '',
    address:'',
    phone: '',
    zipcode: '',
    country: '',
    city: '',
    state: ''
  },

  validationSchema: Yup.object({
    date: Yup.string()
      .required(),
    time: Yup.string()
      .required(),
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

    reference: Yup.string()
      .required(),

  zipcode: Yup.string()
      .required()
      .matches(onlyNumbersRegex),

  }),

  onSubmit: values => {
    console.log(JSON.stringify(values))
  }
}))

export default formikConfig
