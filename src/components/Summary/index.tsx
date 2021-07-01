import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Navbar } from '@components'
import styles from './styles.module.scss'
import { CountProduct, Button } from '@components'
import { createMarkup } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem, applyCoupon } from '@store/actions'

const Summary = ({ data, cartParam }) => {

  const { cart } = useSelector((state: any) => state)

  const dispatch = useDispatch()

  const [input, setInput] = useState('')
  const total = cartParam?.total ?? '0.00$'
  const subtotal = cartParam?.subtotal ?? '0.00$'
  const items = cartParam?.contents?.nodes ?? []

  useEffect(() => {
    if(cart?.coupon) setInput('')
  }, [cart?.coupon])

  const deleteItem = (dataItem: any) => {
    const { key } = dataItem
    dispatch(removeCartItem(key))
  }

  const couponInput = (event) => {
    const value = event.target.value
    setInput(value)
  }

  const sendCoupon = () => {
    if(input.length) dispatch(applyCoupon(input))
  }

  return (
    <>
      <Head>
        <title>Holy Chicken</title>
      </Head>
      <Navbar data={data?.header} />

      <div className={styles._superParent}>
        <div className={styles._parent}>
          <div>
            <h1 className={styles._title}>Mi pedido</h1>
            <p className={styles._subtitle}>¡Consume $00.00 más y el delivery es gratis!</p>
          </div>

          <div className={styles._layout}>
            <div className={styles._childOne}>
              {
                items.length ?
                  items.map((item, index) => {
                    const element = item?.product?.node
                    return (
                      <div className={styles._row} key={index}>
                        <div className={styles._closeParent} onClick={() => deleteItem(item)}>
                          <img src='images/icons/close.svg' width='12px'></img>
                        </div>
                        <div className={styles._columnOne}>
                          <div className={styles._imgParent}>
                            <div className={styles._img}>
                              <img src={element?.image?.mediaItemUrl ?? 'images/resources/burguer.png'} width='75px'></img>
                            </div>
                            <div>
                              <p className={styles._rowTitle}>{element?.name}</p>
                              <div className={styles._rowText} dangerouslySetInnerHTML={createMarkup(element?.description)}></div>
                            </div>
                          </div>
                        </div>
                        <div className={styles._columnTwo}>
                          <div>
                            <CountProduct productKey={item?.key} stock={element?.stockQuantity} quantity={item?.quantity} />
                          </div>
                        </div>
                        <div className={styles._columnThree}>
                          <p className={styles._price}>{element?.price}</p>
                        </div>
                      </div>
                    )
                  }) : ( <div className={styles._emptyCart}>
                    <p>Tu carrito está vacío</p>
                  </div> )
              }

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
                  <p>{total}</p>
                </div>

                <div>
                  <Button color='#000' textColor='white' text='Check out' height='2.1rem' />
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
