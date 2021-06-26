import React, { useState } from 'react'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux'
import { setProductsNumber, updateQuantity } from '@store/actions'

const CountProduct = ({ productKey = '', stock = 0, quantity = 1 }) => {
  const dispatch = useDispatch()
  const [productNumber, setProductNumber] = useState(quantity)

  const aumented = () => {
    if(productNumber < stock) setProductNumber(quantity + 1)
    if (productKey) dispatch(updateQuantity(productKey, 'add'))
  }

  const decrement = () => {
    if (quantity >= 2) {
      setProductNumber(quantity - 1)
      if (productKey) dispatch(updateQuantity(productKey, 'rest'))
    }
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
