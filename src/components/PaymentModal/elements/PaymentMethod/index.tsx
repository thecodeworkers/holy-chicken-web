import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import FormikConfig from './formik'
import { Button } from '@components'
import { setStep } from '@store/actions'
import { Phone, Mail } from '@images/icons'

const PaymentMethod = () => {

  const { resource: { paymentMethods }, paymentStep: { payment_data } } = useSelector((state: any) => state)

  const formik = FormikConfig()
  const [paymentSelected, setPaymentSelected] = useState('')
  const dispatch = useDispatch()

  const buildTexts = (data) => {
    return data?.description?.split('/')
  }

  const selectedMethod = (e, item, id) => {
    setPaymentSelected(item)
    dispatch(setStep({ payment_data: { ...payment_data, ...{ type: item, paymentMethod: id } } }))
    return formik.handleChange(e)
  }

  const NextStep = () => {
    if (paymentSelected) dispatch(setStep({ step: 4 }))
  }

  const setDefaultForm = () => {
    if (payment_data?.type) setPaymentSelected(payment_data.type)
  }

  useEffect(() => {
    setDefaultForm()
  }, [])

  return (
    <>
      <div className={styles._titleParent}>
        <p className={styles._title}>Forma de entrega</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles._rightMain}>

          <div className={styles._firstRow}>
            <div className={styles._deliveryType}>
              <p className={styles._deliveryTitle}>Seleccione una opción</p>
              {
                paymentMethods.map((res, mapIndex) => {
                  return (
                    <div className={styles._radioContainer} key={mapIndex} >
                      <div className={styles._checkParent} >
                        <input type='radio'
                          value={res.name}
                          name='paymentMethod'
                          className={styles._radioBtn}
                          checked={paymentSelected === res.title}
                          onChange={(e) => selectedMethod(e, res.title, res.id)}>
                        </input>
                        <div className={styles._addressDescription}>

                          <p className={styles._radioTitle}>{res.title}</p>
                          {paymentSelected === res.title ?
                            <ul className={styles._list}>
                              {
                                buildTexts(res).map((item: string, index: number) => {
                                  return <li className={styles._listItem} key={index}>{item}</li>
                                })
                              }
                            </ul>
                            : null}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className={styles._messageContainer}>
              <p className={styles._paymentTitle}>Envíe el comprobante de pago al:</p>
              <div className={`${styles._itemParent} ${styles._marginBottom}`}>
                <div className={styles._iconParent}>
                  <Phone />
                </div>
                <div>
                  <p>Teléfono</p>
                  <a className={styles._link} href="tel:+58 412-2485668">
                    +58 412-2485668
                  </a>
                </div>
              </div>

              <div className={`${styles._itemParent} ${styles._marginBottom}`}>
                <div className={styles._iconParent}>
                  <Mail color='#000' />
                </div>
                <div>
                  <p>Email</p>
                  <a className={styles._link} href="mailto:infoholychicken@gmail.com">
                    infoholychicken@gmail.com
                  </a>
                </div>
              </div>
              <div className={styles._advices}>
                <p className={styles._advicesItem} >No olvide colocar, según la forma de pago lo siguiente:</p>
                <p className={styles._advicesItemBold}>- Pago móvil, transferencia o Zelle:</p>
                <p className={styles._advicesItem} >Debe verse legible el número de confirmación y banco.</p>
                <p className={styles._advicesItemBold}>- Efectivo:</p>
                <p className={styles._advicesItem} >Debe verse legible el número de serie del billete.</p>
              </div>
            </div>

          </div>



          <div className={styles._buttonContainer}>
            <div className={styles._btnParent}>
              <Button
                color='#000'
                text='Ingresar'
                textColor='#FFF'
                type='submit' flag
                method={NextStep} />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default PaymentMethod
