
import { useState } from 'react'
import styles from './styles.module.scss'
import { Logo } from '@images/resources'
import { Cart, Profile, Search } from '@images/icons'
import { useRouter } from 'next/router'
import Button from '../Button'
import { NavbarResponsive } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal, logoutUser, resetModals, setToast } from '@store/actions'

const NavBar = ({ data }) => {

  const dispatch = useDispatch()

  const router = useRouter()
  const [show, setShow] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const { auth, cart, resource: { general = {} } } = useSelector((state: any) => state)
  const { navigation: contentNavigation = {} } = general?.general || {}

  const { isAuth } = auth
  const number = cart?.cartProducts?.contents?.itemCount

  const navigation = (route: string, loader = true) => {
    if (route == '/contact') {
      dispatch(resetModals())
      dispatch(setShowModal({ contactModal: true }))
      return
    }
    if (route != router.pathname) {
      router.push(route)
      dispatch(resetModals())
    }
  }

  const activeLink = (route: string) => {
    if (route == router.pathname) return styles._activeLink
    return styles._link
  }

  const openModal = (name) => {
    setShow(false)
    dispatch(resetModals())
    dispatch(setShowModal({ [name]: true }))
  }

  const showDropDown = () => setShow(show => !show)

  const logout = () => {
    dispatch(logoutUser())
    setShow(false)
    dispatch(setToast('', `¡Hasta luego, ${auth?.login?.login?.user?.firstName}!`, 1))
  }

  const showedCart = (showCart) => {
    dispatch(resetModals())
    setShowCart(showCart => !showCart)

    if (showCart) return dispatch(setShowModal({ cartModal: false }))

    if (!showCart) return dispatch(setShowModal({ cartModal: true }))
  }

  return (
    <>
      <nav className={styles._main}>
        <div className={styles._menu}>
          <div className={styles._leftSide}>

            <ul className={styles._linksList}>
              {
                data?.mainNavigation.map((item, index) => {
                  return (
                    <li className={activeLink(item?.link)} key={index} onClick={() => navigation(item?.link)}>{item?.title}</li>
                  )
                }
                )
              }
            </ul>
          </div>

          <div className={styles._logoContainer}>
            <div className={styles._logoParent} onClick={() => navigation('/')}>
              <Logo color='#000' />
            </div>
          </div>

          <div className={styles._rightSide}>
            <div className={styles._iconsList}>
              <div onClick={() => navigation('/shop')}>
                <Button color='#FD8C2E' text={contentNavigation?.askNow} textColor='#fff'></Button>
              </div>

              <div className={styles._iconParent} onClick={() => showedCart(showCart)}>
                <Cart color='#000' />
                {
                  number > 0 && (<div className={styles._numberParent}>
                    <p>{number || 0}</p>
                  </div>)
                }

              </div>

              <div className={styles._iconParent} >
                <div onClick={showDropDown} className={styles._profileParent}>
                  <Profile color='#000' />
                  {isAuth && <p>Hi, {auth?.login?.login?.user?.firstName}</p>}
                </div>

                {show &&
                  <div className={styles._dropDown}>
                    <div className={styles._dropDownContent}>
                      <div
                        className={styles._buttonBlueParent}
                        onClick={!isAuth ? () => openModal('loginModal') : logout}>
                        <Button color='#118AC6' text={!isAuth ? contentNavigation?.login : contentNavigation?.logout} textColor='#fff' ></Button>
                      </div>
                      {!isAuth && <p>{contentNavigation.newClient} <a className={styles._link} onClick={() => openModal('registerModal')}> {contentNavigation?.createAccount} </a></p>}
                      <p onClick={() => navigation('/history')} className={styles._myOrders}>{contentNavigation?.myOrders}</p >
                    </div>
                  </div>
                }

              </div>
              {/* <div className={styles._iconParent} onClick={() => navigation('/shop')}>
                <Search color='#000' />
              </div> */}
            </div>
          </div>
        </div>
      </nav>

      <div className={styles._responsive}>
        <NavbarResponsive />
      </div>
    </>
  )
}

export default NavBar
