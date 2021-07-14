import React, { useState } from 'react'
import styles from './styles.module.scss'

const Counter = ({
  stock = 0,
  changeNumber = null,
  active = false
}) => {
  const [productNumber, setProductNumber] = useState(1)

  const aumented = () => {
    if (!active) return

    if (productNumber < stock) {
      setProductNumber((quantity) => quantity + 1)
      if (changeNumber) changeNumber('add')
    }
  }

  const decrement = () => {
    if (!active) return

    if (productNumber >= 2) {
      setProductNumber((quantity) => quantity - 1)
      if (changeNumber) changeNumber('remove')
    }
  }

  return (
    <>
      <div className={styles._numberParent}>
        <div style={{ cursor: active ? 'pointer' : 'not-allowed' }} className={styles._circle} onClick={decrement}>
          <p>-</p>
        </div>
        <input type='text' value={productNumber} readOnly className={styles._input}></input>
        <div style={{ cursor: active ? 'pointer' : 'not-allowed' }} className={styles._circle} onClick={aumented}>
          <p>+</p>
        </div>
      </div>
    </>
  )
}

export default Counter
