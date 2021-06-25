import React, { useState } from 'react'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux'
import { setProductsNumber, updateQuantity } from '@store/actions'

const CountProduct = ({ product, stock = 0 }) => {
  const dispatch = useDispatch()
  const [productNumber, setProductNumber] = useState(stock)

  const aumented = () => {
    console.log(product, 'add')
    setProductNumber(productNumber + 1)
    if (product) dispatch(updateQuantity(product, 'add'))
  }

  const decrement = () => {
    if (productNumber >= 1) {
      setProductNumber(productNumber - 1)
      if (product) dispatch(updateQuantity(product, 'rest'))
    }
  }

  const updateNumber = () => {
    dispatch(setProductsNumber({ number: productNumber }))
  }


  return (
    <div className={styles._numberParent}>
      <div className={styles._circle} onClick={decrement}>
        <p>-</p>
      </div>
      <input type='text' value={productNumber} readOnly className={styles._input}></input>
      <div className={styles._circle} onClick={aumented}>
        <p>+</p>
      </div>
    </div>
  )
}

export default CountProduct
