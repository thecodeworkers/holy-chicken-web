import { useFormik } from 'formik'
import { emailRegex, onlyLettersRegex, onlyNumbersRegex } from '@utils/regex'
import * as Yup from 'yup'
import { setStep } from '@store/actions'


const deliveryConfig = (dispatch, delivery_data) => (useFormik({
  initialValues: {
    name: '',
    lastname: '',
    phone: '',
    address: '',
    reference: '',
    zipcode: '',
    country: '',
    city: '',
    municipality: ''
  },

  validationSchema: Yup.object({
    name: Yup.string()

      .matches(onlyLettersRegex),

    lastname: Yup.string()

      .matches(onlyLettersRegex),

    phone: Yup.string()
    ,

    reference: Yup.string()
    ,
    city: Yup.string()
    ,
    municipality: Yup.string()
    ,
    country: Yup.string()
    ,

    zipcode: Yup.string()

      .matches(onlyNumbersRegex),

  }),

  onSubmit: values => {
    dispatch( setStep({delivery_data: {...delivery_data, form: values, step: 3}}))
  }
}))

export default deliveryConfig
