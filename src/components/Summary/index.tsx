import Head from 'next/head'
import { Navbar } from '@components'
import styles from './styles.module.scss'
import { CountProduct, Button } from '@components'

const Summary = ({ data }) => {
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
                Array.from(Array(4).keys()).map(() => {
                    return (
                      <div className={styles._row}>
                      <div className={styles._closeParent}>
                        <img src='images/icons/close.svg' width='12px'></img>
                      </div>
                      <div className={styles._columnOne}>
                        <div className={styles._imgParent}>
                          <div className={styles._img}>
                            <img src='images/resources/burguer.png' width='75px'></img>
                          </div>
                          <div>
                            <p className={styles._rowTitle}>Not So Holy</p>
                            <p className={styles._rowText}>Para los mal portados, 210 gramos de pollo crispy marinado con picante entre pan brioche</p>
                          </div>
                        </div>
                      </div>
                      <div className={styles._columnTwo}>
                        <div>
                          <CountProduct />
                        </div>
                      </div>
                      <div className={styles._columnThree}>
                        <p className={styles._price}>7$</p>
                      </div>
                    </div>
                    )
                })
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
                    />
                    <div className={styles._btnParent}>
                      <Button color='#000' textColor='white' text='Usar' height='2.1rem' />
                    </div>
                  </div>

                </div>

                <div className={styles._estimatedTotal}>
                  <p>Total estimado</p>
                  <p>$29.5</p>
                </div>

                <div className={styles._totalParent}>
                  <p>Total</p>
                  <p>$29.5</p>
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
