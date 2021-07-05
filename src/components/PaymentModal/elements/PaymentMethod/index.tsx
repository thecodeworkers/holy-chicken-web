import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import FormikConfig from './formik'
import { Button } from '@components'
import loadConfig from 'next/dist/next-server/server/config'

const PaymentMethod = () => {

  const { intermitence: { paymentModal }, resource: { general: { general }, paymentMethods } } = useSelector((state: any) => state)

  const formik = FormikConfig()
  const [paymentSelected, setPaymentSelected] = useState('')
  const dispatch = useDispatch()

  const buildTexts = (data) => {
    return data?.description?.split('/')
  }

  const selectedMethod = (e, item) => {
    setPaymentSelected(item)
    return formik.handleChange(e)
  }

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
                          onChange={(e) => selectedMethod(e, res.title)}>
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

          </div>


          <div className={styles._buttonContainer}>
            <div className={styles._btnParent}>
              <Button
                color='#000'
                text='Ingresar'
                textColor='#FFF'
                type='submit' flag />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default PaymentMethod
