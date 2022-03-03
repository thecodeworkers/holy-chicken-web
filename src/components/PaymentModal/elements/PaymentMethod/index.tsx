import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@components'
import { setStep } from '@store/actions'
import Card from './Card'
import { Phone, Mail } from '@images/icons'
import getStripe from '@utils/getStripe'
import { Elements } from '@stripe/react-stripe-js'

const PaymentMethod = () => {
  const stripe = getStripe()
  const { resource: { paymentMethods, general: { general } }, paymentStep: { payment_data } } = useSelector((state: any) => state)

  const [paymentSelected, setPaymentSelected] = useState('')
  const dispatch = useDispatch()
  const email = general?.email

  const buildTexts = (data) => {
    return data?.description?.split('/')
  }

  const selectedMethod = (item, id) => {
    setPaymentSelected(item)
    dispatch(setStep({ payment_data: { ...payment_data, ...{ type: item, paymentMethod: id, valid: true } } }))
  }

  const NextStep = () => {
    if (paymentSelected) dispatch(setStep({ step: 4 }))
  }

  const setDefaultForm = () => {
    if (payment_data?.type) setPaymentSelected(payment_data?.type)
  }

  useEffect(() => {
    setDefaultForm()
  }, [])

  return (
    <>
      <Elements stripe={stripe}>
        <div className={styles._titleParent}>
          <p className={styles._title}>Formas de pago</p>
        </div>
        <div className={styles._rightMain}>
          <div className={styles._firstRow}>
            <div className={paymentSelected.toLowerCase() != 'tarjeta de credito' ? styles._deliveryType : styles._tdcContainer}>
              <p className={styles._deliveryTitle}>Seleccione una opción</p>
              {
                paymentMethods?.map((res, mapIndex) => {
                  return (
                    <div className={styles._radioContainer} key={mapIndex} >
                      <div className={styles._checkParent} onClick={() => selectedMethod(res.title, res.id)} >
                        <input type='radio'
                          value={res.name}
                          name='paymentMethod'
                          className={styles._radioBtn}
                          checked={paymentSelected === res.title}
                        >
                        </input>
                        <div className={styles._addressDescription}>

                          <p className={styles._radioTitle}>{res.title}</p>
                          {paymentSelected === res.title ?
                            <>
                              <ul className={styles._list}>
                                {
                                  buildTexts(res)?.map((item: string, index: number) => {
                                    return <li className={styles._listItem} key={index}>{item}</li>
                                  })
                                }
                              </ul>
                              <Card data={res} />
                            </>
                            : null}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            {paymentSelected != 'Tarjeta de credito' ?
              <div className={styles._messageContainer}>
                <p className={styles._paymentTitle}>Envíe el comprobante de pago al:</p>
                <div className={`${styles._itemParent} ${styles._marginBottom}`}>
                  <div className={styles._iconParent}>
                    <Phone />
                  </div>
                  <div>
                    <p>Teléfono</p>
                    <a className={styles._link} href="tel:+584122485668">
                      <p>Las Mercedes: +58 412-2485668</p>
                    </a>
                    <a className={styles._link} href="tel:+584241271442">
                      <p>La Castellana: +58 424-1271442</p>
                    </a>
                    <a className={styles._link} href="tel:+584123696259">
                      <p>El Hatillo: +58 412-3696259</p>
                    </a>
                  </div>
                </div>

                <div className={`${styles._itemParent} ${styles._marginBottom}`}>
                  <div className={styles._iconParent}>
                    <Mail color='#000' />
                  </div>
                  <div>
                    <p>Email</p>

                    <a className={styles._link} href={`mailto:holychickenlasmercedes@gmail.com`}>
                      <p>Las Mercedes: holychickenlasmercedes@gmail.com</p>

                    </a>
                    <a className={styles._link} href={`mailto:holychickenlacastellana@gmail.com`}>
                      <p>La Castellana: holychickenlacastellana@gmail.com</p>

                    </a>
                    <a className={styles._link} href={`mailto:holychickenelhatillo@gmail.com`}>
                      <p>El Hatillo: holychickenelhatillo@gmail.com</p>

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
              : null
            }
          </div>
          <div className={styles._buttonContainer}>
            <div className={styles._btnParent}>
              <Button
                disabled={(payment_data?.type?.toLowerCase() === 'Tarjeta de credito'.toLowerCase()) ? !payment_data?.form?.cardValid : false}
                color='#000'
                text='Ingresar'
                textColor='#FFF'
                type='submit' flag
                method={NextStep} />
            </div>
          </div>
        </div>
      </Elements>
    </>
  )
}

export default PaymentMethod
