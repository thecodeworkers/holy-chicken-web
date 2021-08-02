import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Navbar } from '@components'
import styles from './styles.module.scss'
import { CountProduct, Button, PaymentModal} from '@components'
import { createMarkup, formatFee } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem, applyCoupon, setToast ,setShowModal } from '@store/actions'
import { WebRow, ResponsiveRow } from './elements'

const Summary = ({ data, cartParam }) => {

  const { cart } = useSelector((state: any) => state)

  const dispatch = useDispatch()

  const [input, setInput] = useState('')
  const total = cartParam?.total ?? '0.00$'
  const subtotal = cartParam?.subtotal ?? '$0.00'
  const items = cartParam?.contents?.nodes ?? []
  const bs = cart?.cartProducts?.totalBs ?? "Bs.0,00"
  const fees = (cart.cartProducts?.fees) ? formatFee(cart.cartProducts?.fees[0].name) : []
  useEffect(() => {
    if(cart?.coupon) setInput('')
  }, [cart?.coupon])

  const couponInput = (event) => {
    const value = event.target.value
    setInput(value)
  }

  const sendCoupon = () => {
    if(input.length) return dispatch(applyCoupon(input))
    dispatch(setToast('warning', 'Por favor escriba un código de cupón', 1))
  }

  const openPayment = () => {
    dispatch(setShowModal({ paymentModal: true }))
  }

  return (
    <>
      <Head>
        <title>Summary</title>
      </Head>
      <Navbar data={data?.header} />
      <PaymentModal />
      <div className={styles._superParent}>
        <div className={styles._parent}>
          <div>
            <h1 className={styles._title}>Mi pedido</h1>
            <p className={styles._subtitle}>¡Consume $00.00 más y el delivery es gratis!</p>
          </div>

          <div className={styles._layout}>
            <div className={items.length ? styles._childOne : styles._childOneCenter}>

              <div className={styles._webRowParent}>
                <WebRow items={items} fees={fees} />
              </div>

              <div className={styles._responsiveRowParent}>
                <ResponsiveRow items={items} fees={fees} />
              </div>

            </div>
            <div className={styles._childTwo}>
              <div className={`${styles._card} _generalCard`}>
                <div className={styles._inputParent}>
                  <label>Código promocional</label>
                  <div className={styles._inputRow}>
                    <input
                      placeholder='Código promocional'
                      type='text'
                      name='lastname'
                      className={styles._input}
                      onChange={couponInput}
                      value={input}
                    />
                    <div className={styles._btnParent}>
                      <Button color='#000' textColor='white' text='Usar' height='2.1rem' method={sendCoupon} flag />
                    </div>
                  </div>
                </div>

                <div className={styles._estimatedTotal}>
                  <p>Total estimado</p>
                  <p>{subtotal}</p>
                </div>

                <div className={styles._totalParent}>
                  <p>Total</p>
                  <p>{total} <span className={styles._bs}>~ {bs}</span></p>
                </div>

                <div>
                  <Button color='#000' textColor='white' text='Check out' height='2.1rem' method={openPayment} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Summary
