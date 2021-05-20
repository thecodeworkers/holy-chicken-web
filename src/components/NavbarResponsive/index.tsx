import styles from './styles.module.scss'
import { Menu, Cart, Profile } from '@images/icons'
import { ChickenLogo } from '@images/resources'

const NavbarResponsive = () => {
  return (
    <nav className={styles._nav}>
      <div className={styles._child}>
        <div className={styles._leftSection}>
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
  )
}

export default NavbarResponsive;
