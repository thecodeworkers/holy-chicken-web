import styles from './styles.module.scss'
import { createMarkup } from '@utils'
import { CountProduct } from '@components'
import { removeCartItem } from '@store/actions'
import { useDispatch } from 'react-redux'

const ResponsiveRow = ({ items }) => {

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
    <>
      {
        items.length ?
          items.map((item: any, index: number) => {
            const element = item?.product?.node
            const totalPrice = element?.price ? element?.price : getVariableTotalPrice(item?.quantity, item?.total)

            return (
              <div key={index}>
                <div className={styles._row}>
                  <div className={styles._closeParent} onClick={() => deleteItem(item)}>
                    <img src='images/icons/close.svg' width='12px'></img>
                  </div>
                  <p className={styles._rowTitle}>{element?.name}</p>
                  <div className={styles._rowText} dangerouslySetInnerHTML={createMarkup(element?.description)}></div>

                    {
                        item?.variation &&
                        item?.variation?.attributes.map((attributes, index) => {
                          return <p className={styles._rowText} key={index}>{`${attributes.label}: ${attributes?.value}`}</p>
                        })
                      }

                  <div className={styles._priceParent}>
                    <div className={styles._countParent}>
                      <CountProduct productKey={item?.key} stock={element?.stockQuantity} quantity={item?.quantity} />
                    </div>
                    <p className={styles._price}>{totalPrice}</p>
                  </div>
                </div>
              </div>
            )
          }) : (<div className={styles._emptyCart}>
            <p> Tu carrito está vacío </p>
          </div>)
      }
    </>
  )
}

export default ResponsiveRow
