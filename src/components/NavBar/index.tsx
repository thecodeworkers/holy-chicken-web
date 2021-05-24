
import { useState } from 'react'
import styles from './styles.module.scss'
import { Logo } from '@images/resources'
import { Cart, Profile, Search } from '@images/icons'
import { useRouter } from 'next/router'
import Button from '../Button'
import { NavbarResponsive } from '@components'

const NavBar = ({ data }) => {

  const router = useRouter()
  const [show, setShow] = useState(false)

  const navigation = (route: string) => {
    if (route != router.pathname) router.push(route)
  }

  const activeLink = (route: string) => {
    if (route == router.pathname) return styles._activeLink
    return styles._link
  }

  const showDropDown = () => setShow(show => !show)

  return (
    <>
      <nav className={styles._main}>
        <div className={styles._menu}>
          <div className={styles._leftSide}>

            {
              data?.mainNavigation.map((item, index) => {
                return (
                  <div className={styles._linksList} key={index}>
                    <p onClick={() => navigation(item.link)} className={activeLink(item.link)}>{item.title}</p>
                  </div>
                )
              }
              )
            }
          </div>

          <div className={styles._logoContainer}>
            <div className={styles._logoParent}>
              <Logo color='#000' />
            </div>
          </div>

          <div className={styles._rightSide}>
            <div className={styles._iconsList}>
              <Button color='#FD8C2E' text='Pedir ahora' textColor='#fff'></Button>
              <div className={styles._iconParent} onClick={() => navigation('/cart')}>
                <Cart color='#000' />

              </div>
              <div className={styles._iconParent} >
                <div onClick={showDropDown}>
                  <Profile color='#000' />
                </div>

                {show &&
                  <div className={styles._dropDown}>
                    <div className={styles._dropDownContent}>
                      <div className={styles._buttonBlueParent}>
                        <Button color='#118AC6' text='Iniciar sesión' textColor='#fff'></Button>
                      </div>
                      <p>¿Nuevo cliente? <a className={styles._link}> Crear Cuenta </a></p>
                      <p>Mis órdenes</p >
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
