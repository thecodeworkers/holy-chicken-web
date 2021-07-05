import { useFormik } from 'formik'
import { emailRegex, onlyLettersRegex, onlyNumbersRegex } from '@utils/regex'
import * as Yup from 'yup'
import { setStep } from '@store/actions'

const pickupConfig = (dispatch) => (useFormik({
  initialValues: {
    date: '',
    time: '',
    location: ''
  },

  validationSchema: Yup.object({
    date: Yup.string(),

    time: Yup.string(),

    location: Yup.string()
    ,
  }),

  onSubmit: values => {
    console.log(values, 'pickup');

    // dispatch(setStep({ step: 3 }))
  }
}))

export default pickupConfig
