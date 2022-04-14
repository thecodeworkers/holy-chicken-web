import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { Button, TimeActiveMiddleware } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal, setCartProducts, setSelection, setSpecials } from '@store/actions'
import { ClothSection, VerticalList, CardSection } from './elements'
import { createMarkup, formatWooCommerceAmount, getVariation } from '@utils'

const IndividualProduct = () => {
  const dispatch = useDispatch()
  const { intermitence: { individualProductModal }, cart: { currentProduct }, product: { addons, attributes }, variableProduct, auth, guest } = useSelector((state: any) => state)

  const hot = currentProduct?.spicy?.isSpicy

  const allAddons = Object.keys(addons).reduce((prev, next) => {
    prev = [...prev, ...addons[next]]
    return prev
  }, [])



  const totalPrice = () => {


    const selectedAttributes = []
    const productAttributes = currentProduct?.attributes?.nodes || []

    for (const attr of productAttributes) {
      selectedAttributes.push({ value: attributes[attr.slug] })
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
    if (type) {
      const separateType = type.split('-')
      separateType.splice(separateType.length - 1, 1)
      const newType = separateType.join('-')

      switch (newType) {
        case 'temptations':
        case 'bebidas':
          return <VerticalList attributes={attributes} category={type} />

        case 'holy-sanduches':
        case 'holy-tenders':
          return <CardSection attributes={attributes} />

        case 'merch':
          return <ClothSection size={attributesLength == 2 ? true : false} attributes={attributes} />

        default:
          return <div></div>
      }
    }

    return <div></div>
  }

  const setProductstoCart = () => {

    const productVariable = variableProduct.currentVariableProduct
    let correctProduct = currentProduct
    const attrs = currentProduct?.attributes?.nodes

    if (!!currentProduct?.variations) {
      const selectedAttributes = []

      for (const attr of attrs) {
        selectedAttributes.push({ value: attributes[attr?.slug] })
      }

      const result = getVariation(currentProduct, selectedAttributes)

      if (result) correctProduct = result
    }

    if (productVariable) correctProduct = productVariable
    dispatch(setCartProducts(correctProduct, allAddons))
  }



  useEffect(() => {
    const attrs = {}
    const nodes = currentProduct?.attributes?.nodes || []
    const extras = nodes.filter((top) => top?.name?.toLowerCase().includes('extra'))
    const toopings = nodes.filter((top) => !top?.name?.toLowerCase().includes('extra'))

    for (const topping of toopings) attrs[topping.slug] = topping.terms?.nodes[topping.terms?.nodes?.length - 1].name
    for (const attr of extras) attrs[attr.slug] = 'N/A'

    dispatch(setSelection(attrs))
    dispatch(setSpecials({ addons: {} }))
  }, [individualProductModal])

  return (
    <div className={individualProductModal ? styles._background : styles._hidden} onClick={closeModal} id='individual-product'>
      <div className={`_generalCard ${styles._modal}`}>
        <div className={styles._comebackParent} onClick={(event) => closeModal(event, true)}>
          <img src='images/icons/circle-arrow.svg' width='25px' height='25px'></img>
        </div>
        <TimeActiveMiddleware>
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
        </TimeActiveMiddleware>

      </div>
    </div>
  )
}

export default IndividualProduct
