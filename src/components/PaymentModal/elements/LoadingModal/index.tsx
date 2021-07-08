import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@components'
import { useRouter } from 'next/router'

const LaodingModal = () => {

  const { intermitence: { paymentModal }, paymentStep: { user_data, delivery_data, step, payment_data } } = useSelector((state: any) => state)
  const [showLoader , setShowLoader] = useState(false)
  const router = useRouter()

  const navigation = (route: string, reference = null, key = '') => {
    if (router.pathname != route) {
      router.push(route)
    }
  }

  return (
    <div className={styles._loadingModal}>
      <div className={styles._centerBody}>
    {showLoader ?
     <>
        <div className={styles._circlesParent}>
          {
            Array(8).fill(0).map((item: any, index: number) => {
              return <div key={index} className={styles._circles} />
            })
          }
        </div>
        <p className={styles._loadingText}>Su pago está siendo confirmado, en unos minutos lo contactará servicio al cliente </p>
      </>
      :
      <div className={styles._orderContainer}>
         <p className={styles._orderTitle}>Orden #000</p>
      <p className={styles._loadingText}>Guarde su número de orden para ver el tracking de sus pedidos.</p>

      <div className={styles._buttonContainer}>
            <div className={styles._btnParent}>
              <Button
                color='#000'
                text='Continuar'
                textColor='#FFF'
                type='submit' flag
                method={() => navigation('history')} />
            </div>
          </div>
      </div>

      }
      </div>
    </div>


  )
}

export default LaodingModal
