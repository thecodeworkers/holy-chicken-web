import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setProductsNumber } from '@store/actions'

const CountProduct = () => {

  const dispatch = useDispatch()
  const [productNumber, setProductNumber] = useState(0)

  const { cart: { cartProducts } } = useSelector((state: any) => state)

  const aumented = () => setProductNumber(number => ++number)

  const decrement = () => {
    if (productNumber >= 1) setProductNumber(number => --number)
  }

  const updateNumber = () => {
    dispatch(setProductsNumber({ number: productNumber }))
  }

  useEffect(() => {
    console.log(cartProducts)
  }, [cartProducts])

  return (
    <div className={styles._numberParent}>
      <div className={styles._circle} onClick={decrement}>
        <p>-</p>
      </div>
      <input type='text' value={productNumber} readOnly className={styles._input}></input>
      <div className={styles._circle} onClick={aumented}>
        <p >+</p>
      </div>
    </div>
  )
}

export default CountProduct
