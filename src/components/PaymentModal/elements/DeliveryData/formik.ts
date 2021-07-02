import { useFormik } from 'formik'
import { emailRegex, passwordRegex, onlyLettersRegex, onlyNumbersRegex } from '@utils/regex'
import * as Yup from 'yup'
import { setStep } from '@store/actions'
const formikConfig = (dispatch) => (useFormik({
  initialValues: {
    date: '',
    time: '',
    name: '',
    lastname: '',
    phone: '',
    identification: '',
    email: '',
    address:'',
    reference: '',
    zipcode: '',
    country: '',
    city: '',
    municipality: ''
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
    dispatch(setStep({ step: 3 }))
  }
}))

export default formikConfig
