import { useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal } from '@store/actions'

const CartModal = () => {

  const dispatch = useDispatch()

  const { intermitence: { cartModal } } = useSelector((state: any) => state)

  const closeModal = (event, flag = false) => {


    dispatch(setShowModal({ cartModal: false }))

  }


  return (
    <div className={cartModal ? styles._background : styles._hidden} onClick={closeModal}>
      <div className={`_generalCard ${styles._modal}`}>
      <div className={styles._header}>
      <p className={styles._title}>Mi Pedido</p>
      <p className={styles._subtitle}>¡Consume $00.00 más y el delivery es gratis!</p>
      </div>
      <div className={styles._body}>
      <p>Tu carrito está vacío</p>
      </div>



        <div className={styles._totalParent}>
          <div className={styles._parentContainer}>
          <p className={styles._parentTitle}>Total estimado</p>
          <p className={styles._parentTotal}>1.000$</p>
          </div>
          <div className={styles._btnParent}>
            <Button text='Confirmar' color='#000' textColor='#FFF' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartModal
