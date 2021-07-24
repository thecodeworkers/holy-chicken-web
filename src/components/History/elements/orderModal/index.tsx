import styles from './styles.module.scss'
import { createMarkup } from '@utils'
import { useSelector } from 'react-redux'

const OrderModal = ({ show, method, data }) => {

  const { resource: { products } } = useSelector((state: any) => state)

  const findPrice = (id) => {
    const product = products.find(element => element.id == id)
    let price = product? product?.price : '$0.00'

    if(price.includes('-')) {
      const splitPrice = price.split('-')
      price = splitPrice[0].trim()
    }

    return price
  }

  return (
    <div className={show ? styles._background : styles._hidden}>
      <div className={`_generalCard ${styles._card}`}>
        <div className={styles._imgParent} onClick={method}>
          <img src='images/icons/circle-arrow.svg' width='25px' height='25px'></img>
        </div>

        <p className={styles._title}>Pedidos</p>

        <div className={styles._products}>
          {
            data?.nodes?.length &&
            data.nodes.map((item, index) => {

              const { product } = item
              return (
                <div className={styles._row} key={index}>
                  <div className={styles._columnOne}>
                    <img src={product?.image?.mediaItemUrl} width='75px'></img>
                  </div>

                  <div className={styles._columnTwo}>
                    <p>{product?.name}</p>
                    <div dangerouslySetInnerHTML={createMarkup(product?.description)}></div>
                  </div>

                  <div className={styles._columnThree}>
                    <p>{findPrice(product?.id)}</p>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className={styles._footer}>
          <div className={styles._footerParent}>
            <p>Total estimado</p>
            <p>{data?.total}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderModal
