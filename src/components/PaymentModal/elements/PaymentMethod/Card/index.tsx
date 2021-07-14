import { useState } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import FormikConfig from './formik'
import { Button } from '@components'
import { CardElement, useElements } from '@stripe/react-stripe-js';
import { setLoader, setStep } from '@store/actions'
import getStripe from '@utils/getStripe'
import { cardOptions } from './options'

const PaymentMethod = ({ data }) => {

  const dispatch = useDispatch()
  const { paymentStep: { payment_data } } = useSelector((state: any) => state)
  const elements = useElements()
  const [disabled, setDisabled] = useState(false)
  const formik = FormikConfig()
  const { errors, touched } = formik

  const setData = async () => {

    try {
      if (!disabled) {
        dispatch(setLoader(true))

        const cardElement = elements.getElement(CardElement)
        const stripe = await getStripe()

        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: formik.values.name,
          },
        })

        if (error) throw new Error(error.message);

        dispatch(setStep({ payment_data: { ...payment_data, form: { ...formik.values, card: paymentMethod.id } } }))
        dispatch(setLoader(false))
        setDisabled(!disabled)
        return
      }
      setDisabled(!disabled)
    } catch (error) {
      dispatch(setLoader(false))
      setDisabled(!disabled)
    }

  }



  return (
    <>
      <div className={styles._titleParent}>
        <p className={styles._title}>Datos de tarjeta</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {data?.title?.toLowerCase() === 'tarjeta de credito' ?
          <div className={styles._list}>
            <div className={styles._formCardContainer}>
              <div className={`${styles._inputParent} ${styles._separation}`}>
                <label>Nombre en la tarjeta</label>
                <input disabled={disabled} id="name" name="name" type="text" className={errors.name && touched.name ? [styles._inputError, styles._input].join(' ') : styles._input}
                  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
              </div>
              <div className={styles._cardContainer}>
                <CardElement options={cardOptions} />
              </div>
            </div>
          </div> : null}
        <div className={styles._buttonContainer}>
          <div className={styles._btnParent}>
            <Button
              color='#000'
              text='Confirmar'
              textColor='#FFF'
              type='submit' flag
              method={setData} />
          </div>
        </div>
      </form>
    </>
  )
}

export default PaymentMethod
