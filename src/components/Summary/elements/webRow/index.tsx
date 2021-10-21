import styles from './styles.module.scss'
import { createMarkup, getProductPrice } from '@utils'
import { useDispatch } from 'react-redux'
import { removeCartItem } from '@store/actions'
import { CountProduct } from '@components'
import { removeandCountDuplicates } from '@utils/common'

const WebRow = ({ items, fees }) => {

  const dispatch = useDispatch()

  const deleteItem = (dataItem: any) => {
    const { key } = dataItem
    dispatch(removeCartItem(key))
  }

  return (
    <div>
      {
        items.length ?
          items.map((item: any) => {
            const element = item?.product?.node
            return (
              <div className={styles._row} key={item.key}>
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
                      <div className={styles._rowText} dangerouslySetInnerHTML={createMarkup(element?.description)}>

                      </div>
                      {

                        item?.variation &&
                        item?.variation?.attributes.map((attributes, attIndex) => {
                          return <p className={styles._rowText} key={attributes.label + attributes?.value + attIndex}>{`${attributes.label}: ${attributes?.value}`}</p>
                        })
                      }
                      {
                        (fees && fees[item?.key].length) ? removeandCountDuplicates(items, fees).map((dataFee, feeIndex) => {
                          return <p className={styles._rowText} key={dataFee[0] + feeIndex}>{`Extra: ${dataFee}`}</p>
                        }) : null
                      }

                    </div>
                  </div>
                </div>
                <div className={styles._columnTwo}>
                  <div>
                    <CountProduct productKey={item?.key} stock={element?.stockQuantity} quantity={item?.quantity} />
                  </div>
                </div>
                <div className={styles._columnThree}>
                  <p className={styles._price}>{getProductPrice(fees, item?.total, item?.key)}</p>
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
