import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Button } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal, setProductsNumber, setCartProducts } from '@store/actions'
import { ClothSection, VerticalList, VerticalListWithImage, CardSection } from './elements'
import { createMarkup } from '@utils'

const IndividualProduct = ({ type = 'list' }) => {

  const dispatch = useDispatch()
  const [productNumber, setProductNumber] = useState(0)

  const { intermitence: { individualProductModal }, cart: { currentProduct, cartProducts } } = useSelector((state: any) => state)

  const closeModal = (event, flag = false) => {
    const { target } = event
    if (target.id == 'individual-product' || flag) {
      dispatch(setShowModal({ individualProductModal: false }))
    }
  }



  const aumented = () => setProductNumber(number => ++number)

  const decrement = () => {
    if (productNumber >= 1) setProductNumber(number => --number)
  }

  const updateNumber = () => {
    dispatch(setProductsNumber({ number: productNumber }))
  }

  const featuresType = (type, attributes) => {
    switch (type) {
      case 'temptations':
        return <VerticalList />

      case 'holy-sanduches':
        return <CardSection />

      case 'bebidas':
        return <VerticalListWithImage attributes={attributes}  />

      case 'merch':
        return <ClothSection size={true} attributes={attributes} />

      default:
        return <div></div>
    }
  }

  const setProductstoCart = () => {
    dispatch(setProductsNumber({ number: productNumber }))
    dispatch(setCartProducts(currentProduct))
  }

  useEffect(() => {
    console.log(cartProducts)
  }, [cartProducts])

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
                <p className={styles._title}>{currentProduct?.name}</p>
              </div>
              <div className={styles._numberParent}>
                <div className={styles._circle} onClick={decrement}>
                  <p>-</p>
                </div>
                <input type='text' value={productNumber} readOnly className={styles._input}></input>
                <div className={styles._circle} onClick={aumented}>
                  <p >+</p>
                </div>
              </div>
            </div>

            <div className={styles._subtitle} dangerouslySetInnerHTML={createMarkup(currentProduct?.description) }>

            </div>

            {
              currentProduct?.productCategories?.nodes[0]?.slug == 'holy-sanduches' ?
                (<div className={styles._imgParent}>
                  <img src={currentProduct?.image?.mediaItemUrl ?? 'images/resources/burguer.png'} className={styles._img}></img>
                </div>) : (<div className={styles._bigImgParent}>
                  <img src={currentProduct?.image?.mediaItemUrl ?? 'images/resources/shirt.png'} className={styles._bigImg}></img>
                </div>)
            }

            {
              currentProduct?.productCategories?.nodes[0]?.slug == 'holy-sanduches' && (<div className={styles._inputParent}>
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
            {featuresType(currentProduct?.productCategories?.nodes[0]?.slug, currentProduct?.attributes)}
          </div>
        </div>

        <div className={styles._totalParent}>
          <div className={styles._btnParent}>
            <Button text='Agregar' color='#000' textColor='#FFF' method={setProductstoCart}/>
          </div>

          <div>
            <p>{currentProduct?.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualProduct
