import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setVariableProduct } from '@store/actions'

const ClothSection = ({ size = true, attributes }) => {

  const dispatch = useDispatch()

  const [ currentSize, setCurrentSize ] = useState('l')
  const [ currentColor, setCurrentColor ] = useState('black')

  const { cart: { currentProduct } } = useSelector((state: any) => state)

  const variations = currentProduct?.variations?.nodes ?? []


  const compareValues = () => {

    let selectedProduct

    variations.forEach(product => {
      const valueOne = product?.attributes?.nodes[0].value
      const valueTwo = product?.attributes?.nodes[1] ? product?.attributes?.nodes[1].value : null
      if(valueOne == currentSize.toUpperCase() && valueTwo == currentColor) selectedProduct = product
    })

    return selectedProduct
  }

  useEffect(() =>{
    const value = compareValues()
    if(value) dispatch(setVariableProduct({ currentVariableProduct: value }))

    return () =>  { dispatch(setVariableProduct({ currentVariableProduct: null })) }
  },  [currentSize, currentSize])

  return (
    <div>
      <p className={styles._littleTitle}>DISEÑOS</p>

      <div className={styles._circlesParent} >
        {
          attributes?.nodes[1]?.options.length &&
          attributes?.nodes[1].options.map((res, index) => {
            return (
              <div className={res == currentColor ? styles._circleSelected : styles._circleThree}
                  style={{
                    backgroundColor: res,
                    border: res == 'white' ? '1px solid #808080' : 'none'
                  }}
                  key={index}
                  onClick={() => setCurrentColor(res)}>
              </div>
              )
          })
        }
      </div>

      {
        size && (
          <div className={styles._sizesParent}>
            {
              attributes?.nodes[0]?.options.length &&
              attributes?.nodes[0]?.options.map((res, index) => {
                return (
                  <div className={styles._row} key={index} onClick={() => setCurrentSize(res)} >
                    <div className={styles._checkParent}>
                      <input
                        type='radio'
                        className={styles._radioBtn}
                        readOnly
                        checked={currentSize == res ? true : false}></input>
                      <p>{res.toUpperCase()}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )

}

export default ClothSection
