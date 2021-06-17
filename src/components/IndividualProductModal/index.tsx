import { useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal } from '@store/actions'
import { ClothSection, VerticalList, VerticalListWithImage } from './elements'

const IndividualProduct = ({ type = 'cloth' }) => {

  const dispatch = useDispatch()

  const [number, setNumber] = useState(0)

  const { intermitence: { individualProductModal } } = useSelector((state: any) => state)

  const closeModal = (event, flag = false) => {
    const { target } = event
    if (target.id == 'individual-product' || flag) {
      dispatch(setShowModal({ individualProductModal: false }))
    }
  }

  const aumented = () => setNumber(number => ++number)

  const decrement = () => {
    if (number >= 1) setNumber(number => --number)
  }

  return (
    <div className={individualProductModal ? styles._background : styles._hidden} onClick={closeModal} id='individual-product'>
      <div className={`_generalCard ${styles._modal}`}>
        <div className={styles._comebackParent} onClick={(event) => closeModal(event, true)}>
          <img src='images/icons/circle-arrow.svg' width='25px' height='25px'></img>
        </div>

        <div className={styles._centerBody}>
          <div className={styles._leftSide}>

            <div className={styles._titleParent} >
              <div>
                <p className={styles._title}>NOT SOY HOLY</p>
              </div>
              <div className={styles._numberParent}>
                <div className={styles._circle} onClick={decrement}>
                  <p >-</p>
                </div>
                <input type='text' value={number} readOnly className={styles._input}></input>
                <div className={styles._circle} onClick={aumented}>
                  <p >+</p>
                </div>
              </div>
            </div>

            <p className={styles._subtitle}>Para los mal portados, 210 gramos de pollo crispy marinado con picante entre pan brioche</p>

            {
              type == 'food' ?
                (<div className={styles._imgParent}>
                  <img src='images/resources/burguer.png' className={styles._img}></img>
                </div>) : (<div className={styles._bigImgParent}>
                  <img src='images/resources/shirt.png' className={styles._bigImg}></img>
                </div>)
            }

            {
              type == 'food' && (<div className={styles._inputParent}>
                <label>Nota</label>
                <input
                  type='text'
                  placeholder='Escriba su mensaje aquí…'
                  name='email'
                  className={styles._inputLarge} />
              </div>)
            }

          </div>
          <div className={styles._rightSide}>

            {/* <ClothSection /> */}
            <VerticalListWithImage />
            {/* <VerticalList /> */}

            {/* <div>
              <p className={styles._littleTitle}>FRESH N’ HOLY</p>
              <div className={styles._row}>
                <div className={styles._checkParent}>
                  <input type='radio' className={styles._radioBtn} defaultChecked={true}></input>
                  <p>Veggies</p>
                </div>

                <div className={styles._priceParent}>
                  <p>$0.00</p>
                </div>
              </div>

              <div className={styles._row}>
                <div className={styles._checkParent}>
                  <input type='radio' className={styles._radioBtn}  defaultChecked={false}></input>
                  <p>Holy Slaw</p>
                </div>

                <div className={styles._priceParent}>
                  <p>$0.00</p>
                </div>
              </div>
            </div> */}

            {/* <div>
              <p className={styles._littleTitle}>HOLY SAUCES</p>
              <div className={styles._row}>
                <div className={styles._checkParent}>
                  <input type='radio' className={styles._radioBtn} defaultChecked={true}></input>
                  <p>Salsa de la casa</p>
                </div>

                <div className={styles._priceParent}>
                  <p>$0.00</p>
                </div>
              </div>

              <div className={styles._row}>
                <div className={styles._checkParent}>
                  <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                  <p>BBQ. Morena</p>
                </div>
                <div className={styles._priceParent}>
                  <p>$0.00</p>
                </div>
              </div>

              <div className={styles._row}>
                <div className={styles._checkParent}>
                  <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                  <p>Alioli de Ajos Rostizados</p>
                </div>

                <div className={styles._priceParent}>
                  <p>$0.00</p>
                </div>
              </div>
            </div>

            <div className={styles._cardParent}>
              <div>
                <p className={styles._title}>Extras</p>
              </div>

              <div>
              <p className={styles._littleTitleCard}>HOLY BLESSINGS</p>
              <div className={styles._row}>
                <div className={styles._column}>
                <div className={styles._checkParent}>
                  <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                  <p>Tocineta</p>
                </div>
                </div>

                <div className={styles._column}>
                <div className={styles._numberParent}>
                <div className={styles._circle}>
                  <p>-</p>
                </div>
                <input type='text' value='1' readOnly className={styles._input} ></input>
                <div className={styles._circle}>
                  <p>+</p>
                </div>
              </div>
                </div>

                <div  className={styles._column}>
                <div className={styles._priceParent}>
                  <p>$0.00</p>
                </div>
                </div>
              </div>

              <div className={styles._row}>
                <div className={styles._column}>
                <div className={styles._checkParent}>
                  <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                  <p>Queso Cheddar</p>
                </div>
                </div>

                <div className={styles._column}>
                <div className={styles._numberParent}>
                <div className={styles._circle}>
                  <p>-</p>
                </div>
                <input type='text' value='1' readOnly className={styles._input} ></input>
                <div className={styles._circle}>
                  <p>+</p>
                </div>
              </div>
                </div>

                <div  className={styles._column}>
                <div className={styles._priceParent}>
                  <p>$0.00</p>
                </div>
                </div>
              </div>

              <div className={styles._row}>
                <div className={styles._column}>
                <div className={styles._checkParent}>
                  <input type='radio' className={styles._radioBtn}  defaultChecked={false}></input>
                  <p>Papas fritas</p>
                </div>
                </div>

                <div className={styles._column}>
                <div className={styles._numberParent}>
                <div className={styles._circle}>
                  <p>-</p>
                </div>
                <input type='text' value='1' readOnly className={styles._input} ></input>
                <div className={styles._circle}>
                  <p>+</p>
                </div>
              </div>
                </div>

                <div  className={styles._column}>
                <div className={styles._priceParent}>
                  <p>$0.00</p>
                </div>
                </div>
              </div>
              </div>

              <div>
              <p className={styles._littleTitleCard}>HOLY SAUCES</p>
              <div className={styles._row}>
                <div className={styles._column}>
                <div className={styles._checkParent}>
                  <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                  <p>Salsa de la casa</p>
                </div>
                </div>

                <div className={styles._column}>
                <div className={styles._numberParent}>
                <div className={styles._circle}>
                  <p>-</p>
                </div>
                <input type='text' value='1' readOnly className={styles._input} ></input>
                <div className={styles._circle}>
                  <p>+</p>
                </div>
              </div>
                </div>

                <div  className={styles._column}>
                <div className={styles._priceParent}>
                  <p>$0.00</p>
                </div>
                </div>
              </div>

              <div className={styles._row}>
                <div className={styles._column}>
                <div className={styles._checkParent}>
                  <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                  <p>BBQ.morena</p>
                </div>
                </div>

                <div className={styles._column}>
                <div className={styles._numberParent}>
                <div className={styles._circle}>
                  <p>-</p>
                </div>
                <input type='text' value='1' readOnly className={styles._input}></input>
                <div className={styles._circle}>
                  <p>+</p>
                </div>
              </div>
                </div>

                <div  className={styles._column}>
                <div className={styles._priceParent}>
                  <p>$0.00</p>
                </div>
                </div>
              </div>

              <div className={styles._row}>
                <div className={styles._column}>
                <div className={styles._checkParent}>
                  <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                  <p>Alioli de Ajos Rostizados</p>
                </div>
                </div>

                <div className={styles._column}>
                <div className={styles._numberParent}>
                <div className={styles._circle}>
                  <p>-</p>
                </div>
                <input type='text' value='1' readOnly className={styles._input}></input>
                <div className={styles._circle}>
                  <p>+</p>
                </div>
              </div>
                </div>

                <div  className={styles._column}>
                <div className={styles._priceParent}>
                  <p>$0.00</p>
                </div>
                </div>
              </div>
              </div>

            </div> */}

          </div>
        </div>

        <div className={styles._totalParent}>
          <div className={styles._btnParent}>
            <Button text='Agregar' color='#000' textColor='#FFF' />
          </div>

          <div>
            <p>$1,000.00</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualProduct
