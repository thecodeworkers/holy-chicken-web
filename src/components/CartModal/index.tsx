import styles from './styles.module.scss'
import { Button, CountProduct, TimeActiveMiddleware } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal, removeCartItem, setToast, resetModals } from '@store/actions'
import { createMarkup, formatFee, getProductPrice } from '@utils'
import { useRouter } from 'next/router'
import { LeftArrow } from '@images/icons'

const CartModal = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { intermitence: { cartModal }, cart, resource: { general = {} } } = useSelector((state: any) => state)
  const { cart: contentCart = {} } = general?.general || {}

  const closeModal = (event, flag = false) => {
    const { target } = event
    if (target.id == 'modal') {
      dispatch(setShowModal({ cartModal: false }))
    }
  }

  const nodes = cart?.cartProducts?.contents?.nodes ?? []
  const total = cart?.cartProducts?.total ?? "$0.00"
  const fees = (cart.cartProducts?.fees) ? formatFee(cart.cartProducts?.fees[0].name) : []

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

  const showedCart = (showCart) => {
    dispatch(resetModals())
    if (cartModal) return dispatch(setShowModal({ cartModal: false }))
    if (!cartModal) return dispatch(setShowModal({ cartModal: true }))
  }

  return (
    <div className={cartModal ? styles._background : styles._hidden} onClick={closeModal} id={'modal'}>
      <div className={styles._modal} >
        <div className={styles._header}>
          <div className={styles._titleHeader}>
            <p className={styles._title}>{contentCart.myask}</p>
            <div className={styles._arrowExit} onClick={showedCart}>
              <LeftArrow color={'black'} id="left" />
            </div>
          </div>

          <p className={styles._subtitle}>{contentCart.promotion}</p>
        </div>
        <TimeActiveMiddleware>
          <div className={styles._body}>

          {
            !nodes.length ?
              <p className={styles._description}>{contentCart.emptyCart}</p> :
              nodes.map((item, index) => {
                const dataItem = item?.product?.node
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
                        <p className={styles._number}>{getProductPrice(fees, item?.total, item?.key)}</p>
                      </div>
                    </div>
                  </div>
                )
              })
          }
        </div>

        <div className={styles._totalParent}>
          <div className={styles._parentContainer}>
            <p className={styles._parentTitle}>{contentCart.estimateTotal}</p>
            <p className={styles._parentTotal}>{total} <span className={styles._bs}>~ {cart?.cartProducts?.totalBs || "Bs.0,00"}</span></p>
          </div>
          <div className={styles._btnParent}>
            <Button text={contentCart.confirm} color='#000' textColor='#FFF' method={() => navigate('summary')} />
          </div>
        </div>
        </TimeActiveMiddleware>

      </div>
    </div>
  )
}

export default CartModal
