import styles from './styles.module.scss'
import { createMarkup } from '@utils'
import { useDispatch } from 'react-redux'
import { removeCartItem } from '@store/actions'
import { CountProduct } from '@components'

const WebRow = ({ items }) => {

  const dispatch = useDispatch()

  const deleteItem = (dataItem: any) => {
    const { key } = dataItem
    dispatch(removeCartItem(key))
  }

  const getVariableTotalPrice = (quantity, total) => {
    let price = total.split('$')[1]
    price = parseFloat(price) / quantity

    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
  }

  return (
    <div>
      {
        items.length ?
          items.map((item, index) => {
            const element = item?.product?.node
            const totalPrice = element?.price ? element?.price : getVariableTotalPrice(item.quantity, item.total)

            return (
              <div className={styles._row} key={index}>
                <div className={styles._closeParent} onClick={() => deleteItem(item)}>
                  <img src='images/icons/close.svg' width='12px'></img>
                </div>
                <div className={styles._columnOne}>
                  <div className={styles._imgParent}>
                    <div className={styles._img}>
                      <img src={element?.image?.mediaItemUrl ?? 'images/resources/burguer.png'} width='80px'></img>
                    </div>
                    <div>
                      <p className={styles._rowTitle}>{element?.name}</p>
                      <div className={styles._rowText} dangerouslySetInnerHTML={createMarkup(element?.description)}></div>
                    </div>
                  </div>
                </div>
                <div className={styles._columnTwo}>
                  <div>
                    <CountProduct productKey={item?.key} stock={element?.stockQuantity} quantity={item?.quantity} />
                  </div>
                </div>
                <div className={styles._columnThree}>
                  <p className={styles._price}>{totalPrice}</p>
                </div>
              </div>
            )
          }) : (<div className={styles._emptyCart}>
            <p>Tu carrito está vacío</p>
          </div>)
      }
    </div>
  )
}

export default WebRow
