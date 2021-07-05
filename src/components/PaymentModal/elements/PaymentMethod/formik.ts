import { useFormik } from 'formik'
import { emailRegex, passwordRegex, onlyLettersRegex, onlyNumbersRegex } from '@utils/regex'
import * as Yup from 'yup'

const formikConfig = () => (useFormik({
  initialValues: {
    referenceNumber: '',
    bankname: '',
    paymentMethod: ''
  },

  validationSchema: Yup.object({
    referenceNumber: Yup.string()
      .required()
      .matches(onlyLettersRegex),

    bankname: Yup.string()
      .required()
      .matches(onlyLettersRegex),
    paymentMethod: Yup.string().required()
  }),

  onSubmit: values => {
    console.log(JSON.stringify(values))
  }
}))

export default formikConfig
