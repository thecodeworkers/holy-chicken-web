import { useFormik } from 'formik'
import { onlyLettersRegex, onlyNumbersRegex } from '@utils/regex'
import * as Yup from 'yup'
import { setStep } from '@store/actions'


const deliveryConfig = (dispatch, delivery_data) => (useFormik({
  initialValues: {
    name: '',
    lastname: '',
    phone: '',
    address_1: '',
    address_2: '',
    zipcode: '',
    country: '',
    city: '',
    municipality: ''
  },

  validationSchema: Yup.object({
    name: Yup.string().matches(onlyLettersRegex),
    lastname: Yup.string().matches(onlyLettersRegex),
    phone: Yup.string(),
    address_2: Yup.string(),
    city: Yup.string(),
    municipality: Yup.string(),
    country: Yup.string(),
    zipcode: Yup.string().matches(onlyNumbersRegex),
    shippingMethod: Yup.string(),
    address_1: Yup.string()
  }),

  onSubmit: values => {
    dispatch(setStep({ delivery_data: { ...delivery_data, form: values, valid: true }, step: 3 }))
  }
}))

export default deliveryConfig
