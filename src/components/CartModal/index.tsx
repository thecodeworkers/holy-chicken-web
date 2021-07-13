import styles from './styles.module.scss'
import { Button, CountProduct } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal, removeCartItem, setToast } from '@store/actions'
import { createMarkup } from '@utils'
import { useRouter } from 'next/router'

const CartModal = () => {

  const router = useRouter()
  const dispatch = useDispatch()

  const { intermitence: { cartModal }, cart } = useSelector((state: any) => state)

  const closeModal = (event, flag = false) => {
    const { target } = event
    if (target.id == 'modal') {

      dispatch(setShowModal({ cartModal: false }))
    }
  }

  const nodes = cart?.cartProducts?.contents?.nodes ?? []
  const total = cart?.cartProducts?.subtotal ?? "$0.00"

  const deleteItem = (dataItem: any) => {
    const { key } = dataItem
    dispatch(removeCartItem(key))
  }

  const navigate = (route) => {
    if ((route != router.pathname) && nodes.length) {
      router.push('/summary')
      return
    }

    dispatch(setToast('warning', 'Su carrito esta vacio', 1))
  }

  return (
    <div className={cartModal ? styles._background : styles._hidden} onClick={closeModal} id={'modal'}>
      <div className={styles._modal} >
        <div className={styles._header}>
          <p className={styles._title}>Mi Pedido</p>
          <p className={styles._subtitle}>¡Free delivery en Chacao y Las Mercedes!</p>
        </div>
        <div className={styles._body}>

          {
            !nodes.length ?
              <p className={styles._description}>Tu carrito está vacío</p> :
              nodes.map((item, index) => {
                const dataItem = item?.product?.node
                console.log(dataItem);

                return (
                  <div key={index} className={styles._productContainer}>
                    <div className={styles._close} onClick={() => deleteItem(item)}>
                      <img src='images/icons/close.svg' width='12px'></img>
                    </div>
                    <div className={styles._producItemContainer}>
                      <p className={styles._productItemTitle}>{dataItem?.name}</p>
                      {dataItem.description &&
                        <div className={styles._productItemSubtitle}
                          dangerouslySetInnerHTML={createMarkup(dataItem?.description)}>
                        </div>
                      }

                      <div className={styles._quantityContainer}>
                        <CountProduct productKey={item?.key} stock={dataItem?.stockQuantity} quantity={item?.quantity} />
                        <p className={styles._number}>{dataItem?.price}</p>
                      </div>
                    </div>
                  </div>
                )
              })
          }
        </div>

        <div className={styles._totalParent}>
          <div className={styles._parentContainer}>
            <p className={styles._parentTitle}>Total estimado</p>
            <p className={styles._parentTotal}>{total}</p>
          </div>
          <div className={styles._btnParent}>
            <Button text='Confirmar' color='#000' textColor='#FFF' method={() => navigate('summary')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartModal
