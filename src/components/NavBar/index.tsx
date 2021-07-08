
import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Logo } from '@images/resources'
import { Cart, Profile, Search } from '@images/icons'
import { useRouter } from 'next/router'
import Button from '../Button'
import { NavbarResponsive } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal, logoutUser, resetModals, setToast, setLoader } from '@store/actions'

const NavBar = ({ data }) => {

  const dispatch = useDispatch()

  const router = useRouter()
  const [show, setShow] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const { auth, cart } = useSelector((state: any) => state)
  const { isAuth } = auth

  const navigation = (route: string, loader = true) => {
    if (route == '/contact') {
      dispatch(resetModals())
      dispatch(setShowModal({ contactModal: true }))
      return
    }
    if (route != router.pathname) {
      router.push(route)
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
    setShowCart(showCart => !showCart)

    if(showCart) return  dispatch(setShowModal({ cartModal: false }))

    if(!showCart) return  dispatch(setShowModal({ cartModal: true }))
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
                <Button color='#FD8C2E' text='Pedir ahora' textColor='#fff'></Button>
              </div>

              <div className={styles._iconParent} onClick={() => showedCart(showCart)}>
                <Cart color='#000' />
                {
                  cart?.number > 0 && (<div className={styles._numberParent}>
                    <p>{cart?.number}</p>
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
                        <Button color='#118AC6' text={!isAuth ? 'Iniciar sesión' : 'Cerrar sesión'} textColor='#fff' ></Button>
                      </div>
                      {!isAuth && <p>¿Nuevo cliente? <a className={styles._link} onClick={() => openModal('registerModal')}> Crear Cuenta </a></p>}
                      <p onClick={() => navigation('/history')} className={styles._myOrders}>Mis órdenes</p >
                    </div>
                  </div>
                }

              </div>
              <div className={styles._iconParent} onClick={() => navigation('/shop')}>
                <Search color='#000' />
              </div>
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
