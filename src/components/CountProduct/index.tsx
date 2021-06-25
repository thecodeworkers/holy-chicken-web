import { useState } from 'react'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux'
import { setProductsNumber, updateQuantity } from '@store/actions'

const CountProduct = ({ key, stock = 0 }) => {
  const dispatch = useDispatch()
  const [productNumber, setProductNumber] = useState(stock)

  const aumented = () => {
    console.log(key, 'add')
    setProductNumber(productNumber + 1)
    if (key) dispatch(updateQuantity(key, 'add'))
  }

  const decrement = () => {
    if (productNumber >= 1) {
      setProductNumber(productNumber - 1)
      if (key) dispatch(updateQuantity(key, 'rest'))
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
