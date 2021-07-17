import React, { useState } from 'react'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux'
import { updateQuantity } from '@store/actions'
import { useEffect } from 'react'

const CountProduct = ({
  productKey = '',
  stock = 0,
  quantity = 1,
  fixed = false,
  changeNumber = null,
}) => {
  const dispatch = useDispatch()
  const [productNumber, setProductNumber] = useState(quantity)

  const aumented = () => {
    if (!fixed) {
      if (productNumber < stock) setProductNumber(quantity + 1)
      if (productKey) dispatch(updateQuantity(productKey, 'add'))
    } else {
      if (productNumber < stock) {
        setProductNumber((quantity) => quantity + 1)
        if (changeNumber) changeNumber('add')
      }
    }
  }

  const decrement = () => {
    if (!fixed) {
      if (quantity >= 2) {
        setProductNumber(quantity - 1)
        if (productKey) dispatch(updateQuantity(productKey, 'rest'))
      }
    } else {
      if (productNumber >= 2) {
        setProductNumber((quantity) => quantity - 1)
        if (changeNumber) changeNumber('remove')
      }
    }
  }

  useEffect(()=>{
    setProductNumber(quantity)
  },[quantity])

  return (
    <>
      <div className={styles._numberParent}>
        <div className={styles._circle} onClick={decrement}>
          <p>-</p>
        </div>
        <input type='text' value={productNumber} readOnly className={styles._input}></input>
        <div className={styles._circle} onClick={aumented}>
          <p>+</p>
        </div>
      </div>
    </>
  )
}

export default CountProduct
