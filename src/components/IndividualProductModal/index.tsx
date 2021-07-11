import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Button, CountProduct } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal, setProductsNumber, setCartProducts } from '@store/actions'
import { ClothSection, VerticalList, VerticalListWithImage, CardSection } from './elements'
import { createMarkup } from '@utils'

const IndividualProduct = ({ type = 'list' }) => {
  const dispatch = useDispatch()
  const { intermitence: { individualProductModal }, cart: { currentProduct, cartProducts }, product } = useSelector((state: any) => state)

  const allAddons = [
    ...product.addons,
    ...product.blessingAddons,
    ...product.sauceAddons
  ]

  const totalPrice = () => {
    const totalAddons = allAddons.reduce((previous, next) => previous + next.price, 0)
    let totalPrice = currentProduct?.price.includes('-') ? `${currentProduct?.price.split('-')[0]}` : currentProduct?.price

    if (totalPrice) {
      totalPrice = totalPrice.split('$')
      totalPrice = parseFloat(totalPrice[1])
      totalPrice += totalAddons

      const { blessing, sauce } = product

      totalPrice += blessing != 'N/A' ? 0.5 : 0
      totalPrice += sauce != 'N/A' ? 0.5 : 0

      return `$${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
    }

    return ''
  }

  const closeModal = (event, flag = false) => {
    const { target } = event
    if (target.id == 'individual-product' || flag) {
      dispatch(setShowModal({ individualProductModal: false }))
    }
  }

  const featuresType = (type, attributes) => {
    switch (type) {
      case 'temptations':
        return <VerticalList />

      case 'holy-sanduches':
        return <CardSection attributes={attributes} />

      case 'bebidas':
        return <VerticalListWithImage attributes={attributes}  />

      case 'merch':
        return <ClothSection size={true} attributes={attributes} />

      default:
        return <div></div>
    }
  }

  const setProductstoCart = () => {
    let correctProduct = currentProduct

    if (!!currentProduct?.variations) {
      const { freeFresh, freeSauce, blessing, sauce } = product

      const attributes = [
        { value: freeFresh },
        { value: freeSauce },
        { value: blessing },
        { value: sauce }
      ]

      const filterCriteria = (product) => {
        return JSON.stringify(product.attributes.nodes) === JSON.stringify(attributes)
      }

      const result = currentProduct.variations.nodes.find(filterCriteria)
      if (result) correctProduct = result
    }

    dispatch(setCartProducts(correctProduct, allAddons))
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
                <p className={styles._title}>{currentProduct?.name}</p>
              </div>
              {/* <CountProduct key={null}/> */}
            </div>

            <div className={styles._subtitle} dangerouslySetInnerHTML={createMarkup(currentProduct?.description) }></div>

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
            <Button text='Agregar' color='#000' textColor='#FFF' method={setProductstoCart} flag/>
          </div>

          <div>
            <p>{totalPrice()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualProduct
