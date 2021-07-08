import { useFormik } from 'formik'
import { emailRegex, onlyLettersRegex, onlyNumbersRegex } from '@utils/regex'
import * as Yup from 'yup'
import { setStep } from '@store/actions'

const formikConfig = (dispatch) => (useFormik({
  initialValues: {
    name: '',
    lastname: '',
    address: '',
    phone: '',
    zipcode: '',
    country: '',
    city: '',
    state: ''
  },

  validationSchema: Yup.object({
    name: Yup.string()
      .required()
      .matches(onlyLettersRegex),

    lastname: Yup.string()
      .required()
      .matches(onlyLettersRegex),

    phone: Yup.string()
      .required()
      .matches(onlyNumbersRegex),
    zipcode: Yup.string()
      .required(),

    city: Yup.string()
    ,
    state: Yup.string()
    ,
    country: Yup.string()
    ,
  }),

  onSubmit: values => {
    dispatch(setStep({ user_data:values, step: 2 }))
  }
}))

export default formikConfig
