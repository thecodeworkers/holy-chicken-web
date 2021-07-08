import { useFormik } from 'formik'
import { emailRegex, onlyLettersRegex, onlyNumbersRegex } from '@utils/regex'
import * as Yup from 'yup'
import { setStep } from '@store/actions'

const deliveryConfig = (dispatch) => (useFormik({
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
    ,
    time: Yup.string()
     ,
    name: Yup.string()

      .matches(onlyLettersRegex),

    lastname: Yup.string()

      .matches(onlyLettersRegex),

    phone: Yup.string()
      ,

    identification: Yup.string()
     ,

    email: Yup.string()

      .matches(emailRegex),

    reference: Yup.string()
     ,

  zipcode: Yup.string()

      .matches(onlyNumbersRegex),

  }),

  onSubmit: values => {
    console.log(values, 'delivery');
    // dispatch(setStep({ step: 3 }))
  }
}))

export default deliveryConfig
