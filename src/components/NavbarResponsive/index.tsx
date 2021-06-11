import { useState } from 'react'
import styles from './styles.module.scss'
import { Menu, Cart, Profile } from '@images/icons'
import { ChickenLogo } from '@images/resources'
import { ResponsiveMenu } from '@components'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { setShowModal } from '@store/actions'

const NavbarResponsive = () => {

  const [ show, setShow ] = useState(0)

  const dispatch = useDispatch()
  const router = useRouter()

  const deployMenu = () => {
    if(show === 0) return setShow(1)
    if(show === 1) return setShow(2)
    if(show === 2) return setShow(1)
   }

   const resetShow = () => setShow(0)

   const navigation = (route: string) => {
    if (route != router.pathname) router.push(route)
  }

   const openLoginModal = () => dispatch(setShowModal({ loginModal: true }))

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
          <div onClick={ () => navigation('/shop')}>
            <Cart color='#000' />
          </div>
          <div onClick={openLoginModal}>
            <Profile color='#000' />
          </div>
        </div>
      </div>
    </nav>

    <ResponsiveMenu show={show} method={resetShow}/>
    </>
  )
}

export default NavbarResponsive;
