import styles from './styles.module.scss'
import { Logo } from '@images/resources'
import { Cart, Profile, Search } from '@images/icons'
import { useRouter } from 'next/router'

const NavBar = () => {

  const router = useRouter()

  const navigation = (route: string) => {
    if (route != router.pathname) router.push(route)
  }

  const activeLink = (route: string) => {
    if (route == router.pathname) return styles._activeLink
    return styles._link
  }

  return (
    <nav className={styles._main}>
      <div className={styles._menu}>
        <div className={styles._leftSide}>
          <ul className={styles._linksList}>
            <li onClick={() => navigation('/')} className={activeLink('/')}>Home</li>
            <li onClick={() => navigation('/about-us')}>About us</li>
            <li onClick={() => navigation('/contact')}>Contacto</li>
            <li onClick={() => navigation('/shop')}>Shop</li>
          </ul>
        </div>

        <div className={styles._logoContainer}>
          <div className={styles._logoParent}>
            <Logo color='#000' />
          </div>
        </div>

        <div className={styles._rightSide}>
          <div className={styles._iconsList}>
            <button className={styles._button}>
              Pedir ahora
            </button>
            <div className={styles._iconParent}>
              <Cart color='#000' />
            </div>
            <div className={styles._iconParent}>
              <Profile color='#000' />
            </div>
            <div className={styles._iconParent}>
              <Search color='#000' />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
