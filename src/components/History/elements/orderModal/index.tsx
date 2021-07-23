import styles from './styles.module.scss'
import { createMarkup } from '@utils'
import { useSelector } from 'react-redux'

const OrderModal = ({ show, method, data }) => {

  const { resource: { products } } = useSelector((state: any) => state)

  const findPrice = (id) => {
    const product = products.find(element => element.id == id)
    const price = product ? product?.price : '$0.00'
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
              return (
                <div className={styles._row} key={index}>
                  <div className={styles._columnOne}>
                    <img src={item?.image?.mediaItemUrl} width='75px'></img>
                  </div>

                  <div className={styles._columnTwo}>
                    <p>{item?.name}</p>
                    <div dangerouslySetInnerHTML={createMarkup(item?.description)}></div>

                  </div>

                  <div className={styles._columnThree}>
                    <p>{findPrice(item?.id)}</p>
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
