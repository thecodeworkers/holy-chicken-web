import { useState } from 'react'
import styles from './styles.module.scss'
import { Menu, Cart, Profile } from '@images/icons'
import { ChickenLogo } from '@images/resources'
import { ResponsiveMenu } from '@components'

const NavbarResponsive = () => {

  const [ show, setShow ] = useState(0)

  const deployMenu = () => {
    if(show === 0) return setShow(1)
    if(show === 1) return setShow(2)
    if(show === 2) return setShow(1)
   }

  return (
    <>
    <nav className={styles._nav}>
      <div className={styles._child}>
        <div className={styles._leftSection} onClick={deployMenu}>
          <Menu color='#000' />
        </div>
        <div className={styles._chickenParent}>
          <div className={styles._chickenChild}>
            <ChickenLogo color='#000' />
          </div>
        </div>
        <div className={styles._rightSection}>
          <div>
            <Cart color='#000' />
          </div>
          <div>
            <Profile color='#000' />
          </div>
        </div>
      </div>
    </nav>

    <ResponsiveMenu show={show} />
    </>
  )
}

export default NavbarResponsive;
