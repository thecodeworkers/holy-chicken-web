import { useState } from 'react'
import styles from './styles.module.scss'
import { Menu, Cart, Profile } from '@images/icons'
import { ChickenLogo } from '@images/resources'
import { ResponsiveMenu, Button } from '@components'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { setShowModal, logoutUser, setToast, resetModals } from '@store/actions'
import { useSelector } from 'react-redux'


const NavbarResponsive = () => {

  const [show, setShow] = useState(0)
  const [showCart, setShowCart] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  const { auth, cart, resource: { general = {} } } = useSelector((state: any) => state)
  const { navigation: contentNavigation = {} } = general?.general || {}
  const { isAuth } = auth

  const dispatch = useDispatch()
  const router = useRouter()

  const deployMenu = () => {
    if (show === 0) return setShow(1)
    if (show === 1) return setShow(2)
    if (show === 2) return setShow(1)
  }

  const resetShow = () => setShow(0)

  const navigation = (route: string) => {
    if (route != router.pathname) {
      router.push(route)
      dispatch(resetModals())
    }
  }

  const openLoginModal = () => {
    setShowPanel(showPanel => !showPanel)
  }


  const openModal = (name) => {
    setShowPanel(showPanel => !showPanel)
    dispatch(resetModals())
    dispatch(setShowModal({ [name]: true }))
  }

  const logout = () => {

    if (isAuth) {
      dispatch(logoutUser())
      setShowPanel(false)
      dispatch(setToast('', `¡Hasta luego, ${auth?.login?.login?.user?.firstName}!`, 1))
      return
    }

    dispatch(setShowModal({ loginModal: true }))
    setShowPanel(false)
  }

  const showedCart = (showCart) => {

    setShowCart(showCart => !showCart)

    if (showCart) return dispatch(setShowModal({ cartModal: false }))

    if (!showCart) return dispatch(setShowModal({ cartModal: true }))
  }

  return (
    <>
      <nav className={styles._nav}>
        <div className={styles._child}>
          <div className={styles._leftSection} onClick={deployMenu}>
            <Menu color='#000' />
          </div>
          <div className={styles._chickenParent}>
            <div className={styles._chickenChild} onClick={() => navigation('/')} >
              <ChickenLogo color='#000' />
            </div>
          </div>
          <div className={styles._rightSection}>
            <div className={styles._iconsList}>
              <div className={styles._iconParent} onClick={() => showedCart(showCart)}>
                <Cart color='#000' />
                {
                  cart?.number > 0 && (<div className={styles._numberParent}>
                    <p>{cart?.number}</p>
                  </div>)
                }

              </div>
              <div onClick={openLoginModal}>
                <Profile color='#000' />
              </div>
            </div>

          </div>
        </div>
      </nav>

      <div className={showPanel ? styles._panel : styles._hidden}>
        <div className={styles._buttonBlueParent} onClick={logout} >
          <Button color='#118AC6' text={isAuth ? contentNavigation?.logout : contentNavigation?.login} textColor='#fff'></Button>
        </div>
        <p className={styles._myOrders}>{contentNavigation?.newClient} <a onClick={() => openModal('registerModal')}>{contentNavigation?.createAccount}</a></p>
        <p className={styles._myOrders} onClick={() => navigation('/history')} >{contentNavigation?.myOrders}</p >
      </div>

      <ResponsiveMenu show={show} method={resetShow} />
    </>
  )
}

export default NavbarResponsive;
