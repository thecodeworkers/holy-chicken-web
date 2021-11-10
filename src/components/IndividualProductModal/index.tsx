import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { Button } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal, setCartProducts, setSelection } from '@store/actions'
import { ClothSection, VerticalList, CardSection } from './elements'
import { createMarkup, formatWooCommerceAmount, getVariation } from '@utils'

const IndividualProduct = () => {
  const dispatch = useDispatch()
  const { intermitence: { individualProductModal }, cart: { currentProduct }, product, variableProduct } = useSelector((state: any) => state)

  const hot = currentProduct?.spicy?.isSpicy

  const allAddons = [
    ...product.addons,
    ...product.blessingAddons,
    ...product.sauceAddons
  ]

  const totalPrice = () => {

    const { freeFresh, freeSauce, blessing, sauce } = product

    const amount = currentProduct?.attributes?.nodes?.length
    const selectedAttributes = []
    for (let i = 0; i < amount; i++) {
      switch (i) {
        case 0:
          selectedAttributes[i] = amount === 1 ? { value: blessing } : { value: freeFresh }
          break;
        case 1:
          selectedAttributes[i] = amount <= 2 ? { value: blessing } : { value: freeSauce }
          break;
        case 2:
          selectedAttributes[i] = { value: blessing }
          break;
        case 3:
          selectedAttributes[i] = { value: sauce }
          break;
        default:
          break;
      }
    }

    const result = getVariation(currentProduct, selectedAttributes)
    const totalAddons = allAddons.reduce((previous, next) => previous + next.price, 0)

    let totalP = currentProduct?.price?.includes('-') ? formatWooCommerceAmount(currentProduct?.price?.split('-')[0]) : formatWooCommerceAmount(currentProduct?.price)
    totalP = result ? formatWooCommerceAmount(result?.regularPrice) : totalP

    if (totalP) {
      totalP += totalAddons
      return `$${totalP.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
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

    const attributesLength = attributes?.nodes?.length

    switch (type) {
      case 'temptations':
      case 'bebidas':
        return <VerticalList attributes={attributes} category={type} />

      case 'holy-sanduches':
      case 'holy-tenders':
        return <CardSection attributes={attributes} type={type} />

      case 'merch':
        return <ClothSection size={attributesLength == 2 ? true : false} attributes={attributes} />

      default:
        return <div></div>
    }
  }

  const setProductstoCart = () => {

    const productVariable = variableProduct?.currentVariableProduct
    let correctProduct = currentProduct

    if (!!currentProduct?.variations) {
      const { freeFresh, freeSauce, blessing, sauce } = product

      const amount = currentProduct?.attributes?.nodes?.length
      const selectedAttributes = []
      for (let i = 0; i < amount; i++) {
        switch (i) {
          case 0:
            selectedAttributes[i] = { value: freeFresh }
            break;
          case 1:
            selectedAttributes[i] = amount <= 2 ? { value: blessing } : { value: freeSauce }
            break;
          case 2:
            selectedAttributes[i] = { value: blessing }
            break;
          case 3:
            selectedAttributes[i] = { value: sauce }
            break;
          default:
            break;
        }
      }
      const result = getVariation(currentProduct, selectedAttributes)

      if (result) correctProduct = result
    }

    if (productVariable) correctProduct = productVariable
    dispatch(setCartProducts(correctProduct, allAddons))
  }

  useEffect(() => {
    dispatch(setSelection({ sauce: 'N/A', blessing: 'N/A', addons: [], blessingAddons: [], sauceAddons: [] }))
  }, [individualProductModal])

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
            </div>

            <div className={styles._subtitle} dangerouslySetInnerHTML={createMarkup(currentProduct?.description)}></div>

            {
              currentProduct?.productCategories?.nodes[0]?.slug == 'holy-sanduches' ?
                (<div className={styles._imgParent}>
                  {
                    hot && (<div className={styles._icon}>
                      <img src='images/icons/chilipepper.svg' alt='icono de producto picante' width='100%'></img>
                    </div>)
                  }

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
            <Button text='Agregar' color='#000' textColor='#FFF' method={setProductstoCart} flag />
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
